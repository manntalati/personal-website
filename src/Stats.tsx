import './Stats.css';
import { useInView, useCountUp } from './hooks';
import { experiences, papers } from './content';

type Stat = {
    /** The number that animates. */
    value: number;
    label: string;
    prefix?: string;
    suffix?: string;
    decimals?: number;
};

// Counts are derived from content.ts so they can't drift when a role or paper is added.
const stats: Stat[] = [
    { value: experiences.length, label: 'Roles & Internships', suffix: '+' },
    { value: 50, label: 'Projected Savings', prefix: '$', suffix: 'K+' },
    { value: 4, label: 'Forecast MAPE', prefix: '≤ ', suffix: '%' },
    { value: papers.length, label: papers.length === 1 ? 'Publication' : 'Publications' },
];

function StatItem({ stat, active }: { stat: Stat; active: boolean }) {
    const animated = useCountUp(stat.value, active);
    return (
        <div className="stat-item">
            <span className="stat-value">
                {stat.prefix}
                {animated.toFixed(stat.decimals ?? 0)}
                {stat.suffix}
            </span>
            <span className="stat-label">{stat.label}</span>
        </div>
    );
}

export default function Stats() {
    const { ref, inView } = useInView<HTMLDivElement>(0.4);

    return (
        <section className="stats-band" aria-label="Career highlights">
            <div className="stats-container" ref={ref}>
                {stats.map((s) => (
                    <StatItem key={s.label} stat={s} active={inView} />
                ))}
            </div>
        </section>
    );
}
