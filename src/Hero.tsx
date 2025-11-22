import { useState, useEffect } from 'react';
import { FaPlay, FaInfoCircle } from 'react-icons/fa';
import './Hero.css';

export default function Hero() {
    const [showBackground, setShowBackground] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setShowBackground(true), 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <section className="hero" id="top">
            <div className={`hero-background ${showBackground ? 'visible' : ''}`}>
                <div className="hero-overlay"></div>
                { }
                <div className="hero-image-placeholder"></div>
            </div>

            <div className="hero-overlay">
                <div className="hero-content">
                    <div className="hero-text-container">


                        <h1 className="hero-title">MANN TALATI</h1>

                        <div className="hero-meta">
                            <span className="match-score">98% Match</span>
                            <span className="year">2025</span>
                            <span className="rating">U/A 13+</span>
                            <span className="seasons">4 Seasons</span>
                        </div>

                        <p className="hero-synopsis">
                            A computer science student's journey through the world of machine learning,
                            artificial intelligence, and software engineering. Watch as I build innovative solutions
                            and tackle complex problems in this gripping tech saga.
                        </p>

                        <div className="hero-actions">
                            <a href="#Projects" className="hero-button primary">
                                <FaPlay className="button-icon" />
                                <span>Projects</span>
                            </a>
                            <a href="#About" className="hero-button secondary">
                                <FaInfoCircle className="button-icon" />
                                <span>More Info</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}