import './Hero.css';

export default function Hero() {
    return (
        <section className="hero" id="top">
            <div className="hero-container">
                <div className="hero-header">
                    <h1 className="hero-title">
                        Mann Talati
                    </h1>
                    <div className="hero-desc-wrapper">
                        <p className="hero-description">
                            is a computer science and statistics student at UIUC interested in building scalable ML systems and data tools.
                        </p>
                    </div>
                </div>

                <div className="hero-image-wrapper">
                    <img
                        src="/hero.webp"
                        alt="Mann Talati"
                        className="hero-main-image"
                        width={1600}
                        height={2133}
                        fetchPriority="high"
                        decoding="async"
                    />
                    <span className="image-overlay-text">Carpe Diem.</span>
                </div>

                <div className="hero-footer">
                    <div className="hero-actions">
                        <a href="#Projects" className="hero-btn">
                            View Work →
                        </a>
                        <a
                            href="/talati_mann_resume.pdf"
                            target="_blank"
                            rel="noreferrer"
                            className="hero-btn hero-btn-primary"
                        >
                            Resume ↓
                        </a>
                        <a href="#Contact" className="hero-btn">
                            Contact Me →
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}