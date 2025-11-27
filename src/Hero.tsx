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
                {/* Placeholder for video/image background */}
                <img
                    src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                    alt="Hero Background"
                    className="hero-image"
                />
            </div>

            <div className="hero-content-wrapper">
                <div className="hero-content">
                    <div className="hero-text-container">
                        <div className="title-logo">
                            MANN TALATI
                        </div>

                        <div className="hero-meta">
                            <span className="match-score">98% Match</span>
                            <span className="year">2025</span>
                        </div>

                        <p className="hero-synopsis">
                            A computer science student's journey through the world of machine learning,
                            artificial intelligence, and software engineering. Watch as I build innovative solutions
                            and tackle complex problems in this gripping tech saga.
                        </p>

                        <div className="hero-actions">
                            <a href="#Projects" className="hero-button primary">
                                <FaPlay className="button-icon" />
                                <span>Play</span>
                            </a>
                            <a href="#About" className="hero-button secondary">
                                <FaInfoCircle className="button-icon" />
                                <span>More Info</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="hero-bottom-gradient"></div>
        </section>
    );
}