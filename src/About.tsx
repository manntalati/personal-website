import './About.css'

export default function About() {
    return (
        <section id="About" className="about-section">
            <div className="about-content">
                <div className="about-text-column">
                    <h2 className="about-title">About the Lead</h2>

                    <div className="about-meta">
                        <span className="match-score">98% Match</span>
                        <span className="year">2003</span>
                        <span className="rating">U/A 13+</span>
                        <span className="duration">4 Seasons</span>
                        <span className="hd-badge">HD</span>
                    </div>

                    <p className="about-description">
                        Hey! I am a student at the University of Illinois Urbana-Champaign
                        studying statistics and computer science, specifically interested in machine learning and
                        artificial intelligence. Growing up I was always fascinated with technology and its
                        application in the real world setting, which has only continued to prosper at UIUC.
                    </p>

                    <p className="about-description">
                        At UIUC, I am involved in the CUBE Consulting organization that aims to bridge technology
                        and business together to solve real-world problems for clients. Beyond my interests in
                        AI & ML & SWE, I love playing volleyball, learning a new song on the drums, strength
                        training, coin-collecting (specifically U.S. state quarters), and building with LEGO.
                    </p>

                    <div className="about-tags">
                        <span className="tag-label">Genres:</span>
                        <span className="tag">Exciting</span>
                        <span className="tag">Technological</span>
                        <span className="tag">Innovative</span>
                        <span className="tag">Creative</span>
                        <span className="tag">Ambitious</span>
                    </div>
                </div>

                <div className="about-image-column">
                    <div className="about-image-wrapper">
                        <img src={'headshot.jpg'} alt="Mann Talati" className="about-image" />
                    </div>
                </div>
            </div>
        </section>
    )
}