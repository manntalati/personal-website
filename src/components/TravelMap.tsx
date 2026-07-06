import { useEffect, useMemo, useRef, useState, memo } from 'react';
import {
    ComposableMap,
    Geographies,
    Geography,
    Marker,
    ZoomableGroup,
} from 'react-simple-maps';
import { FiPlus, FiMinus, FiMaximize2 } from 'react-icons/fi';
import { cityCoords, type City } from '../content';
import './TravelMap.css';

// Vendored worldwide topojson (public/geo/countries-110m.json) — loaded async, kept out of the JS bundle.
const GEO_URL = '/geo/countries-110m.json';
const INITIAL = { coordinates: [0, 8] as [number, number], zoom: 1 };
const MIN_ZOOM = 1;
const MAX_ZOOM = 16;
const FLY_MS = 800;

// How far the map flies in when a city is selected: an isolated city gets a comfortable overview,
// while a city inside a tight cluster (e.g. the Monterey peninsula) flies in deeper for context.
const FOCUS_SOLO = 4.5;
const FOCUS_CLUSTER = 8;

// Cluster + fan tuning. Cities within CLUSTER_DEG of one another are drawn as a fanned rosette so
// no pin hides beneath another; FAN_RADIUS is that rosette's radius in the 900×420 viewBox.
// PX_PER_DEG calibrates viewBox px per degree of longitude at zoom 1 (≈ 900px across 360°).
const CLUSTER_DEG = 0.75;
const FAN_RADIUS = 20;
const PX_PER_DEG = 2.56;

// Country fills/strokes use CSS variables so the map follows the light/dark theme automatically.
const COUNTRY_STYLE = {
    default: { fill: 'var(--color-surface-secondary)', stroke: 'var(--color-border)', strokeWidth: 0.4, outline: 'none' },
    hover: { fill: 'var(--color-surface-secondary)', stroke: 'var(--color-border)', strokeWidth: 0.4, outline: 'none' },
    pressed: { fill: 'var(--color-surface-secondary)', stroke: 'var(--color-border)', strokeWidth: 0.4, outline: 'none' },
} as const;

const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

// Rough gap in degrees between two [lng, lat] points, compressing longitude by latitude so the
// clustering threshold behaves consistently north–south and east–west.
function angDist(a: [number, number], b: [number, number]) {
    const latMean = (((a[1] + b[1]) / 2) * Math.PI) / 180;
    return Math.hypot((a[0] - b[0]) * Math.cos(latMean), a[1] - b[1]);
}

type Position = { coordinates: [number, number]; zoom: number };

// Per-city layout derived from how close its neighbours are: the screen-space fan offset that keeps
// clustered pins apart, the cluster's tightest pairwise gap (which relaxes the fan as you zoom in),
// and the zoom the map flies to on select.
type CityLayout = { fanX: number; fanY: number; minSepDeg: number; focusZoom: number };

// The world outlines never change, so render them once and skip re-rendering on every fly-to frame.
const Countries = memo(function Countries() {
    return (
        <Geographies geography={GEO_URL}>
            {({ geographies }) =>
                geographies.map((geo) => (
                    <Geography key={geo.rsmKey} geography={geo} style={COUNTRY_STYLE} tabIndex={-1} />
                ))
            }
        </Geographies>
    );
});

interface TravelMapProps {
    cities: City[];
    activeCityId: string | null;
    onSelectCity: (id: string) => void;
}

export default function TravelMap({ cities, activeCityId, onSelectCity }: TravelMapProps) {
    const [position, setPosition] = useState<Position>(INITIAL);
    const [hoveredId, setHoveredId] = useState<string | null>(null);

    // Markers live inside the zoom group, so counter-scale them to keep a constant on-screen size.
    const inv = 1 / position.zoom;

    // Group cities that sit within CLUSTER_DEG of each other and fan them out around the cluster
    // centre so none hides beneath another (they can be only a few km apart in the real world).
    const layout = useMemo(() => {
        const pts = cities
            .map((c) => ({ id: c.id, coords: cityCoords(c) }))
            .filter((p): p is { id: string; coords: [number, number] } => p.coords !== null);

        // Union-find: join every pair closer than CLUSTER_DEG into a single cluster.
        const parent = new Map(pts.map((p) => [p.id, p.id] as const));
        const find = (x: string): string => {
            let root = x;
            while (parent.get(root) !== root) root = parent.get(root)!;
            while (parent.get(x) !== root) { const next = parent.get(x)!; parent.set(x, root); x = next; }
            return root;
        };
        for (let i = 0; i < pts.length; i++)
            for (let j = i + 1; j < pts.length; j++)
                if (angDist(pts[i].coords, pts[j].coords) < CLUSTER_DEG)
                    parent.set(find(pts[i].id), find(pts[j].id));

        const clusters = new Map<string, typeof pts>();
        for (const p of pts) {
            const root = find(p.id);
            const group = clusters.get(root);
            if (group) group.push(p);
            else clusters.set(root, [p]);
        }

        const info = new Map<string, CityLayout>();
        for (const members of clusters.values()) {
            if (members.length < 2) {
                info.set(members[0].id, { fanX: 0, fanY: 0, minSepDeg: Infinity, focusZoom: FOCUS_SOLO });
                continue;
            }
            // Cluster centre + each member's on-screen bearing from it (SVG y points down → negate lat).
            const cx = members.reduce((s, m) => s + m.coords[0], 0) / members.length;
            const cy = members.reduce((s, m) => s + m.coords[1], 0) / members.length;
            const cosLat = Math.cos((cy * Math.PI) / 180);
            const ordered = members
                .map((m) => ({ id: m.id, bearing: Math.atan2(-(m.coords[1] - cy), (m.coords[0] - cx) * cosLat) }))
                .sort((a, b) => a.bearing - b.bearing);

            // Tightest pair in the cluster: the fan stays open until even this pair would separate on its own.
            let minSep = Infinity;
            for (let i = 0; i < members.length; i++)
                for (let j = i + 1; j < members.length; j++)
                    minSep = Math.min(minSep, angDist(members[i].coords, members[j].coords));

            // Space the pins evenly around the ring while keeping their geographic order.
            const n = ordered.length;
            const base = ordered[0].bearing;
            ordered.forEach((m, k) => {
                const angle = base + (k * 2 * Math.PI) / n;
                info.set(m.id, {
                    fanX: Math.cos(angle) * FAN_RADIUS,
                    fanY: Math.sin(angle) * FAN_RADIUS,
                    minSepDeg: minSep,
                    focusZoom: FOCUS_CLUSTER,
                });
            });
        }
        return info;
    }, [cities]);

    // Keep a live ref to the rendered position so a fly-to can start from wherever we currently are
    // (even mid-flight, or after a manual drag/zoom).
    const posRef = useRef(position);
    posRef.current = position;
    const rafRef = useRef<number | null>(null);

    // Fly toward the active city whenever the selection changes — and back out to the world on close.
    useEffect(() => {
        const active = activeCityId ? cities.find((c) => c.id === activeCityId) : null;
        const coords = active ? cityCoords(active) : null;
        const focusZoom = active ? layout.get(active.id)?.focusZoom ?? FOCUS_SOLO : FOCUS_SOLO;
        const target: Position = coords ? { coordinates: coords, zoom: focusZoom } : INITIAL;
        const start = posRef.current;

        const same =
            Math.abs(start.coordinates[0] - target.coordinates[0]) < 1e-6 &&
            Math.abs(start.coordinates[1] - target.coordinates[1]) < 1e-6 &&
            Math.abs(start.zoom - target.zoom) < 1e-6;
        if (same) return;

        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduce) {
            setPosition(target);
            return;
        }

        const t0 = performance.now();
        const tick = (now: number) => {
            const e = easeInOutCubic(Math.min((now - t0) / FLY_MS, 1));
            setPosition({
                coordinates: [
                    start.coordinates[0] + (target.coordinates[0] - start.coordinates[0]) * e,
                    start.coordinates[1] + (target.coordinates[1] - start.coordinates[1]) * e,
                ],
                zoom: start.zoom + (target.zoom - start.zoom) * e,
            });
            if (e < 1) rafRef.current = requestAnimationFrame(tick);
        };
        rafRef.current = requestAnimationFrame(tick);
        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [activeCityId, cities, layout]);

    const zoomBy = (factor: number) =>
        setPosition((p) => ({ ...p, zoom: Math.min(Math.max(p.zoom * factor, MIN_ZOOM), MAX_ZOOM) }));

    return (
        <div className="travel-map">
            <div className="travel-map-frame">
                <ComposableMap
                    projection="geoEqualEarth"
                    projectionConfig={{ scale: 170 }}
                    width={900}
                    height={420}
                    className="travel-map-svg"
                    aria-label="World map of visited cities"
                >
                    <ZoomableGroup
                        center={position.coordinates}
                        zoom={position.zoom}
                        minZoom={MIN_ZOOM}
                        maxZoom={MAX_ZOOM}
                        onMoveEnd={(pos) => setPosition(pos)}
                        // Let the mouse wheel scroll the page instead of zooming the map; drag-pan & pinch still work.
                        filterZoomEvent={(event) => (event as { type?: string }).type !== 'wheel'}
                    >
                        <Countries />

                        {cities.map((city) => {
                            const coords = cityCoords(city);
                            if (!coords) {
                                if (import.meta.env.DEV) {
                                    console.warn(`[TravelMap] No coordinates for "${city.name}". Add it to src/cityCoordinates.ts or set coordinates inline in content.ts.`);
                                }
                                return null;
                            }
                            const isActive = city.id === activeCityId;
                            const dimmed = activeCityId !== null && !isActive;
                            const showLabel = isActive || hoveredId === city.id;
                            const count = city.photos.length;

                            // Fan clustered pins apart in constant screen space; ease the offset back to
                            // zero once the tightest pair would separate on its own at this zoom.
                            const f = layout.get(city.id);
                            const spread = f && f.minSepDeg !== Infinity
                                ? Math.max(0, Math.min(1, 1 - (PX_PER_DEG * f.minSepDeg * position.zoom) / (2 * FAN_RADIUS)))
                                : 0;
                            const ox = f ? f.fanX * spread : 0;
                            const oy = f ? f.fanY * spread : 0;
                            return (
                                <Marker
                                    key={city.id}
                                    coordinates={coords}
                                    className={`travel-marker ${isActive ? 'active' : ''} ${dimmed ? 'dimmed' : ''}`}
                                    onClick={() => onSelectCity(city.id)}
                                    onMouseEnter={() => setHoveredId(city.id)}
                                    onMouseLeave={() => setHoveredId((h) => (h === city.id ? null : h))}
                                    onFocus={() => setHoveredId(city.id)}
                                    onBlur={() => setHoveredId((h) => (h === city.id ? null : h))}
                                    tabIndex={0}
                                    role="button"
                                    aria-label={`${city.name}${city.country ? ', ' + city.country : ''} — ${count} photo${count === 1 ? '' : 's'}`}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                            e.preventDefault();
                                            onSelectCity(city.id);
                                        }
                                    }}
                                >
                                    <g transform={`scale(${inv}) translate(${ox}, ${oy})`} style={{ transition: 'transform 250ms ease' }}>
                                        {isActive && <circle r={11} className="travel-marker-ring" />}
                                        <circle r={5.5} className="travel-marker-dot" />
                                        {showLabel && (
                                            <text y={-13} textAnchor="middle" className="travel-marker-label">
                                                {city.name}
                                            </text>
                                        )}
                                    </g>
                                </Marker>
                            );
                        })}
                    </ZoomableGroup>
                </ComposableMap>

                <div className="travel-map-controls">
                    <button type="button" aria-label="Zoom in" onClick={() => zoomBy(1.6)}>
                        <FiPlus />
                    </button>
                    <button type="button" aria-label="Zoom out" onClick={() => zoomBy(1 / 1.6)}>
                        <FiMinus />
                    </button>
                    <button type="button" aria-label="Reset map view" onClick={() => setPosition(INITIAL)}>
                        <FiMaximize2 />
                    </button>
                </div>
            </div>
        </div>
    );
}
