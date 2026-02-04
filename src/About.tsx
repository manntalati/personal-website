import './About.css'

export default function About() {
    const interestOne = "Weightlifting";
    const interestTwo = "Drumming";

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
                    </div>

                    <div className="about-meta">
                        <div className="about-interests-group">
                            <span className="meta-label">Expertise</span>
                            <div className="interests-tags">
                                <span className="interest-tag">Machine Learning</span>
                                <span className="interest-tag">Scalable Systems</span>
                                <span className="interest-tag">Artificial Intelligenc</span>
                            </div>
                        </div>

                        <div className="about-interests-group">
                            <span className="meta-label">Current Interests</span>
                            <div className="current-interests">
                                <div className="interest-placeholder">
                                    <span className="placeholder-value">{interestOne || "TBD"}</span>
                                </div>
                                <div className="interest-placeholder">
                                    <span className="placeholder-value">{interestTwo || "TBD"}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}