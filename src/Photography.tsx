import './Photography.css';
import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiChevronLeft, FiChevronRight, FiX } from 'react-icons/fi';
import { cities, type Photo } from './content';
import TravelMap from './components/TravelMap';

// Newest day first; within a day keep listed order so freshly inserted photos surface at the top of their day.
function sortPhotos(photos: Photo[]): Photo[] {
    return [...photos].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

type DayGroup = { date: string; items: Photo[] };

function groupByDate(sorted: Photo[]): DayGroup[] {
    const groups: DayGroup[] = [];
    for (const p of sorted) {
        const last = groups[groups.length - 1];
        if (last && last.date === p.date) last.items.push(p);
        else groups.push({ date: p.date, items: [p] });
    }
    return groups;
}

function formatDate(iso: string): string {
    const d = new Date(`${iso}T00:00:00`);
    if (Number.isNaN(d.getTime())) return iso;
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

// The optimizer (scripts/optimize-photos.mjs) writes a small ".thumb.webp" beside each photo;
// the grid loads that, the lightbox loads the full image (with a fallback to the original src).
function thumbSrc(src: string): string {
    return /^\/photography\/.+\.webp$/.test(src) ? src.replace(/\.webp$/, '.thumb.webp') : src;
}

// Match the panel's close transition so its contents stay mounted while it slides shut.
const PANEL_EXIT_MS = 450;

export default function Photography() {
    // Nothing is shown until the user picks a pin — then the map flies to that city and its
    // gallery slides in beside it.
    const [openCityId, setOpenCityId] = useState<string | null>(null);
    // `displayCityId` trails `openCityId` so the panel keeps its content while it animates closed.
    const [displayCityId, setDisplayCityId] = useState<string | null>(null);
    const [lightbox, setLightbox] = useState<{ cityId: string; index: number } | null>(null);

    const totalPhotos = useMemo(() => cities.reduce((n, c) => n + c.photos.length, 0), []);

    // Pre-sort each city's photos once so the gallery and lightbox share the same indices.
    const sortedByCity = useMemo(() => {
        const map: Record<string, Photo[]> = {};
        for (const c of cities) map[c.id] = sortPhotos(c.photos);
        return map;
    }, []);

    useEffect(() => {
        const prev = document.title;
        document.title = 'Photography — Mann Talati';
        return () => { document.title = prev; };
    }, []);

    // Keep the panel mounted through its slide-out so the close animation has content to show.
    useEffect(() => {
        if (openCityId) {
            setDisplayCityId(openCityId);
            return;
        }
        const t = setTimeout(() => setDisplayCityId(null), PANEL_EXIT_MS);
        return () => clearTimeout(t);
    }, [openCityId]);

    // Clicking a pin toggles its city; clicking the active pin again closes the panel.
    const selectCity = (id: string) => setOpenCityId((prev) => (prev === id ? null : id));
    const closeCity = () => setOpenCityId(null);

    // Keyboard control: Escape closes the lightbox first (if open), otherwise the gallery;
    // arrows page the lightbox. Only the fullscreen lightbox locks body scroll — the side
    // panel is part of the page layout, so the page keeps scrolling normally.
    useEffect(() => {
        if (!openCityId && !lightbox) return;
        const count = lightbox ? (sortedByCity[lightbox.cityId] ?? []).length : 0;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                if (lightbox) setLightbox(null);
                else setOpenCityId(null);
            } else if (lightbox && count > 0) {
                if (e.key === 'ArrowRight') setLightbox((lb) => (lb ? { ...lb, index: (lb.index + 1) % count } : lb));
                else if (e.key === 'ArrowLeft') setLightbox((lb) => (lb ? { ...lb, index: (lb.index - 1 + count) % count } : lb));
            }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [openCityId, lightbox, sortedByCity]);

    useEffect(() => {
        if (!lightbox) return;
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = prevOverflow; };
    }, [lightbox]);

    const panelCity = displayCityId ? cities.find((c) => c.id === displayCityId) ?? null : null;
    const panelPhotos = useMemo(
        () => (displayCityId ? sortedByCity[displayCityId] ?? [] : []),
        [displayCityId, sortedByCity],
    );
    const panelGroups = useMemo(() => groupByDate(panelPhotos), [panelPhotos]);

    const lbCity = lightbox ? cities.find((c) => c.id === lightbox.cityId) ?? null : null;
    const lbPhotos = lightbox ? sortedByCity[lightbox.cityId] ?? [] : [];
    const lbPhoto = lightbox ? lbPhotos[lightbox.index] ?? null : null;

    const step = (dir: 1 | -1) =>
        setLightbox((lb) => (lb ? { ...lb, index: (lb.index + dir + lbPhotos.length) % lbPhotos.length } : lb));

    return (
        <div className="photography">
            <header className="photo-hero">
                <Link to="/" className="photo-back"><FiArrowLeft /> Back home</Link>
                <span className="section-label">Travelogue</span>
                <h1 className="photo-title">Photography</h1>
                <p className="photo-intro">
                    A running map of the places I've wandered with a camera.
                </p>
                <div className="photo-stats">
                    <span><strong>{cities.length}</strong> {cities.length === 1 ? 'city' : 'cities'}</span>
                    <span className="photo-stats-divider" />
                    <span><strong>{totalPhotos}</strong> {totalPhotos === 1 ? 'photo' : 'photos'}</span>
                </div>
            </header>

            {/* The map stays on screen; selecting a pin flies to it and the gallery slides in beside it. */}
            <div className={`photo-stage ${openCityId ? 'has-panel' : ''}`}>
                <div className="photo-stage-map">
                    <TravelMap cities={cities} activeCityId={openCityId} onSelectCity={selectCity} />
                </div>

                <aside className="city-panel" aria-hidden={!openCityId}>
                    {panelCity && (
                        <div className="city-panel-inner" key={panelCity.id}>
                            <div className="city-panel-head">
                                <div className="city-panel-headings">
                                    {panelCity.country && <span className="section-label">{panelCity.country}</span>}
                                    <h2 className="city-panel-title">{panelCity.name}</h2>
                                    <span className="city-panel-count">
                                        {panelPhotos.length} {panelPhotos.length === 1 ? 'photo' : 'photos'}
                                    </span>
                                </div>
                                <button className="city-panel-close" onClick={closeCity} aria-label="Close gallery">
                                    <FiX />
                                </button>
                            </div>

                            <div className="city-panel-body">
                                {panelPhotos.length === 0 && (
                                    <p className="city-empty">No photos here yet — check back soon.</p>
                                )}
                                {panelGroups.map((g) => (
                                    <div className="photo-day" key={g.date}>
                                        <div className="photo-day-label">{formatDate(g.date)}</div>
                                        <div className="photo-grid">
                                            {g.items.map((photo) => {
                                                const index = panelPhotos.indexOf(photo);
                                                return (
                                                    <button
                                                        type="button"
                                                        key={photo.id}
                                                        className="photo-thumb"
                                                        onClick={() => setLightbox({ cityId: panelCity.id, index })}
                                                        aria-label={`Open photo${photo.caption ? `: ${photo.caption}` : ''}`}
                                                    >
                                                        <img
                                                            src={thumbSrc(photo.src)}
                                                            alt={photo.alt || photo.caption || `${panelCity.name} photo`}
                                                            loading="lazy"
                                                            decoding="async"
                                                            onError={(e) => {
                                                                const img = e.currentTarget;
                                                                if (!img.dataset.fallback) {
                                                                    img.dataset.fallback = '1';
                                                                    img.src = photo.src;
                                                                }
                                                            }}
                                                        />
                                                        {photo.caption && (
                                                            <span className="photo-caption">{photo.caption}</span>
                                                        )}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </aside>
            </div>

            {/* Single-photo fullscreen viewer (opens over the gallery) */}
            {lightbox && lbPhoto && lbCity && (
                <div
                    className="lightbox"
                    onClick={() => setLightbox(null)}
                    role="dialog"
                    aria-modal="true"
                    aria-label={`${lbCity.name} photo viewer`}
                >
                    <button className="lightbox-close" onClick={() => setLightbox(null)} aria-label="Close photo viewer">
                        <FiX />
                    </button>

                    {lbPhotos.length > 1 && (
                        <button
                            className="lightbox-nav prev"
                            onClick={(e) => { e.stopPropagation(); step(-1); }}
                            aria-label="Previous photo"
                        >
                            <FiChevronLeft />
                        </button>
                    )}

                    <figure className="lightbox-figure" onClick={(e) => e.stopPropagation()}>
                        <img
                            className="lightbox-image"
                            src={lbPhoto.src}
                            alt={lbPhoto.alt || lbPhoto.caption || `${lbCity.name} photo`}
                        />
                        <figcaption className="lightbox-caption">
                            <div className="lightbox-caption-main">
                                <span className="lightbox-city">
                                    {lbCity.name}{lbCity.country ? `, ${lbCity.country}` : ''}
                                </span>
                                {lbPhoto.caption && <span className="lightbox-text">{lbPhoto.caption}</span>}
                            </div>
                            <div className="lightbox-meta">
                                <span>{formatDate(lbPhoto.date)}</span>
                                <span className="lightbox-counter">{lightbox.index + 1} / {lbPhotos.length}</span>
                            </div>
                        </figcaption>
                    </figure>

                    {lbPhotos.length > 1 && (
                        <button
                            className="lightbox-nav next"
                            onClick={(e) => { e.stopPropagation(); step(1); }}
                            aria-label="Next photo"
                        >
                            <FiChevronRight />
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}
