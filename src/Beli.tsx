import './Beli.css';
import { useEffect, useRef, useState, useCallback } from 'react';
import { useInView, useCountUp } from './hooks';
import { FiChevronLeft, FiChevronRight, FiExternalLink } from 'react-icons/fi';
import { FaUtensils } from 'react-icons/fa';

type BeliRestaurant = {
    rank: number;
    name: string;
    city?: string;
    cuisine?: string;
    score?: number;
    note?: string;
};

type BeliMetrics = {
    ranked?: number;
    wantToTry?: number;
    cities?: number;
    avgScore?: number;
};

type BeliData = {
    handle?: string;
    profileUrl?: string;
    updatedAt?: string;
    sample?: boolean;
    metrics?: BeliMetrics;
    top10: BeliRestaurant[];
};

const FALLBACK_PROFILE = 'https://beliapp.co/account/manntalati';

function Metric({ value, label, decimals = 0, active }: {
    value: number;
    label: string;
    decimals?: number;
    active: boolean;
}) {
    const animated = useCountUp(value, active);
    return (
        <div className="beli-metric">
            <span className="beli-metric-value">{animated.toFixed(decimals)}</span>
            <span className="beli-metric-label">{label}</span>
        </div>
    );
}

function relativeTime(iso?: string): string | null {
    if (!iso) return null;
    const then = new Date(iso).getTime();
    if (Number.isNaN(then)) return null;
    const days = Math.floor((Date.now() - then) / 86_400_000);
    if (days <= 0) return 'today';
    if (days === 1) return 'yesterday';
    if (days < 30) return `${days} days ago`;
    const months = Math.floor(days / 30);
    return months === 1 ? 'a month ago' : `${months} months ago`;
}

export default function Beli() {
    const [data, setData] = useState<BeliData | null>(null);
    const railRef = useRef<HTMLDivElement>(null);
    const [atStart, setAtStart] = useState(true);
    const [atEnd, setAtEnd] = useState(false);
    const { ref: metricsRef, inView } = useInView<HTMLDivElement>();

    useEffect(() => {
        let cancelled = false;
        // no-cache so a freshly synced beli.json shows up without a redeploy.
        fetch('/beli.json', { cache: 'no-cache' })
            .then(res => (res.ok ? res.json() : Promise.reject(new Error(String(res.status)))))
            .then((json: BeliData) => {
                if (!cancelled && Array.isArray(json?.top10)) setData(json);
            })
            .catch(err => console.error('[beli] could not load /beli.json', err));
        return () => { cancelled = true; };
    }, []);

    const syncEdges = useCallback(() => {
        const el = railRef.current;
        if (!el) return;
        setAtStart(el.scrollLeft <= 4);
        setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
    }, []);

    useEffect(() => {
        if (!data) return;
        syncEdges();
        window.addEventListener('resize', syncEdges);
        return () => window.removeEventListener('resize', syncEdges);
    }, [data, syncEdges]);

    const scrollBy = (dir: 'left' | 'right') => {
        const el = railRef.current;
        if (!el) return;
        const delta = Math.max(el.clientWidth * 0.8, 280);
        el.scrollBy({ left: dir === 'left' ? -delta : delta, behavior: 'smooth' });
    };

    // A portfolio should never render a broken panel — if the feed is missing, the section is simply absent.
    if (!data || data.top10.length === 0) return null;

    const { metrics } = data;
    const profileUrl = data.profileUrl || FALLBACK_PROFILE;
    const synced = relativeTime(data.updatedAt);

    return (
        <section className="section beli" id="Beli" aria-labelledby="beli-heading">
            <div className="container">
                <div className="beli-head">
                    <span className="beli-eyebrow">
                        <FaUtensils aria-hidden="true" /> Beli · Eating
                    </span>
                    <h2 className="beli-title" id="beli-heading">Top 10</h2>
                    <p className="beli-sub">
                        Every restaurant I&rsquo;ve been to, ranked head-to-head. These are the ten that survived.
                    </p>
                    {data.sample && (
                        <span className="beli-sample" title="Replace public/beli.json with your real data to remove this badge.">
                            Sample data
                        </span>
                    )}
                </div>

                {metrics && (
                    <div className="beli-metrics" ref={metricsRef}>
                        {metrics.ranked != null && <Metric value={metrics.ranked} label="Ranked" active={inView} />}
                        {metrics.wantToTry != null && <Metric value={metrics.wantToTry} label="Want to try" active={inView} />}
                        {metrics.cities != null && <Metric value={metrics.cities} label="Cities" active={inView} />}
                        {metrics.avgScore != null && <Metric value={metrics.avgScore} label="Avg score" decimals={1} active={inView} />}
                    </div>
                )}

                <div className="beli-rail-wrap">
                    <button
                        type="button"
                        className="beli-arrow left"
                        onClick={() => scrollBy('left')}
                        disabled={atStart}
                        aria-label="Scroll to previous restaurants"
                    >
                        <FiChevronLeft />
                    </button>

                    <div
                        className="beli-rail"
                        ref={railRef}
                        onScroll={syncEdges}
                        tabIndex={0}
                        role="list"
                        aria-label="Top 10 restaurants"
                    >
                        {data.top10.map((r) => (
                            <article className="beli-card" key={`${r.rank}-${r.name}`} role="listitem">
                                <span className="beli-rank" aria-hidden="true">{r.rank}</span>
                                <div className="beli-card-body">
                                    <h3 className="beli-name">
                                        <span className="beli-rank-sr">#{r.rank}</span> {r.name}
                                    </h3>
                                    <p className="beli-meta">
                                        {[r.city, r.cuisine].filter(Boolean).join(' · ')}
                                    </p>
                                    {r.note && <p className="beli-note">{r.note}</p>}
                                    {r.score != null && (
                                        <span className="beli-score">{r.score.toFixed(1)}</span>
                                    )}
                                </div>
                            </article>
                        ))}
                    </div>

                    <button
                        type="button"
                        className="beli-arrow right"
                        onClick={() => scrollBy('right')}
                        disabled={atEnd}
                        aria-label="Scroll to more restaurants"
                    >
                        <FiChevronRight />
                    </button>
                </div>

                <div className="beli-foot">
                    {synced && <span className="beli-synced">Synced {synced}</span>}
                    <a className="beli-link" href={profileUrl} target="_blank" rel="noreferrer">
                        Full list on Beli <FiExternalLink />
                    </a>
                </div>
            </div>
        </section>
    );
}
