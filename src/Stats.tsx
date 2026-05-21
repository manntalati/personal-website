import './Stats.css';

type Stat = {
    value: string;
    label: string;
};

const stats: Stat[] = [
    { value: "6+", label: "Roles & Internships" },
    { value: "$50K+", label: "Projected Savings" },
    { value: "≤ 4%", label: "Forecast MAPE" },
    { value: "1", label: "Publication" },
];

export default function Stats() {
    return (
        <section className="stats-band" aria-label="Career highlights">
            <div className="stats-container">
                {stats.map((s) => (
                    <div className="stat-item" key={s.label}>
                        <span className="stat-value">{s.value}</span>
                        <span className="stat-label">{s.label}</span>
                    </div>
                ))}
            </div>
        </section>
    );
}
