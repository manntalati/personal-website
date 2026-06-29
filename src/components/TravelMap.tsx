import { useEffect, useRef, useState, memo } from 'react';
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
const MAX_ZOOM = 8;
const FOCUS_ZOOM = 4.5; // how far the map flies in when a city is selected
const FLY_MS = 800;

// Country fills/strokes use CSS variables so the map follows the light/dark theme automatically.
const COUNTRY_STYLE = {
    default: { fill: 'var(--color-surface-secondary)', stroke: 'var(--color-border)', strokeWidth: 0.4, outline: 'none' },
    hover: { fill: 'var(--color-surface-secondary)', stroke: 'var(--color-border)', strokeWidth: 0.4, outline: 'none' },
    pressed: { fill: 'var(--color-surface-secondary)', stroke: 'var(--color-border)', strokeWidth: 0.4, outline: 'none' },
} as const;

const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

type Position = { coordinates: [number, number]; zoom: number };

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

    // Keep a live ref to the rendered position so a fly-to can start from wherever we currently are
    // (even mid-flight, or after a manual drag/zoom).
    const posRef = useRef(position);
    posRef.current = position;
    const rafRef = useRef<number | null>(null);

    // Fly toward the active city whenever the selection changes — and back out to the world on close.
    useEffect(() => {
        const active = activeCityId ? cities.find((c) => c.id === activeCityId) : null;
        const coords = active ? cityCoords(active) : null;
        const target: Position = coords ? { coordinates: coords, zoom: FOCUS_ZOOM } : INITIAL;
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
    }, [activeCityId, cities]);

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
                                    <g transform={`scale(${inv})`} style={{ transition: 'transform 250ms ease' }}>
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
