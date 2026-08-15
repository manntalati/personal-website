import { FiArrowUpRight } from 'react-icons/fi'
import './About.css'

type Interest = { name: string; handle?: string; href?: string };

export default function About() {
    const interests: Interest[] = [
        { name: "Weightlifting" },
        { name: "Drumming" },
        { name: "Food", handle: "@manntalati on Beli", href: "https://beliapp.co/account/manntalati" },
    ];

    const nowItems = [
        { role: "Data/Platform Engineer Intern", org: "Dow" },
        { role: "AI Research Assistant", org: "ASTRAL Lab · UIUC" },
        { role: "Chief Technology Officer", org: "CUBE Consulting" },
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
                            <span className="signature-text">Based in Champaign, IL · Statistics + CS @ UIUC</span>
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
                                    <li key={interest.name} className="outside-item">
                                        <span className="outside-index">{String(i + 1).padStart(2, '0')}</span>
                                        {interest.href ? (
                                            <a
                                                href={interest.href}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="outside-link"
                                                aria-label={`${interest.name} — ${interest.handle}`}
                                            >
                                                <span className="outside-name">{interest.name}</span>
                                                <span className="outside-handle">{interest.handle}</span>
                                                <FiArrowUpRight className="outside-arrow" aria-hidden="true" />
                                            </a>
                                        ) : (
                                            <span className="outside-name">{interest.name}</span>
                                        )}
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
