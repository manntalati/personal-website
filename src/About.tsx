import './About.css'

export default function About() {
    const interests = ["Weightlifting", "Drumming"];

    const nowItems = [
        { role: "SWE Intern", org: "Oracle Cloud · Model Building" },
        { role: "Research Assistant", org: "ASTRAL Lab · UIUC" },
        { role: "CTO", org: "CUBE Consulting" },
    ];

    return (
        <section id="About" className="about-section">
            <div className="about-container">
                <div className="about-header">
                    <span className="about-label">Background</span>
                    <h2 className="about-title">
                        Building tools at the intersection of the Cloud, Machine Learning, and Software Engineering.
                    </h2>
                </div>

                <div className="about-main">
                    <div className="about-content">
                        <p>
                            I'm a Statistics & Computer Science student at the University of Illinois Urbana-Champaign (UIUC),
                            focusing on machine learning and scalable software engineering.
                        </p>
                        <p>
                            Currently, I'm involved with CUBE Consulting and conducting research at ASTRAL Lab UIUC.
                            A lot of my work is centered around translating complex data into actionable insights through automation and robust backend systems.
                        </p>

                        <div className="about-signature">
                            <span className="signature-dot" aria-hidden="true" />
                            <span className="signature-text">Based in Urbana, IL · Statistics + CS @ UIUC</span>
                        </div>
                    </div>

                    <div className="about-meta">
                        <div className="about-meta-group">
                            <span className="meta-label">Expertise</span>
                            <div className="interests-tags">
                                <span className="interest-tag">Machine Learning</span>
                                <span className="interest-tag">Scalable Systems</span>
                                <span className="interest-tag">Artificial Intelligence</span>
                            </div>
                        </div>

                        <div className="about-meta-group">
                            <span className="meta-label">
                                Now
                                <span className="live-dot" aria-hidden="true" />
                            </span>
                            <ul className="now-list">
                                {nowItems.map((item) => (
                                    <li key={item.role} className="now-item">
                                        <span className="now-role">{item.role}</span>
                                        <span className="now-org">{item.org}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="about-meta-group">
                            <span className="meta-label">Outside of Work</span>
                            <ul className="outside-list">
                                {interests.map((interest, i) => (
                                    <li key={interest} className="outside-item">
                                        <span className="outside-index">{String(i + 1).padStart(2, '0')}</span>
                                        <span className="outside-name">{interest}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
