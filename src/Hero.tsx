import { useState, useEffect } from 'react';
import './Hero.css';

export default function Hero() {
    const statements = [
        'is a student @ UIUC',
        'enjoys weightlifting',
        'loves building new tech projects',
        'is drumming to a new rock song',
        'is watching new TV shows',
        'is learning new technologies',
        'is collecting new US state quarters'
    ];

    const [loopNum, setLoopNum] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [text, setText] = useState('');

    useEffect(() => {
        const i = loopNum % statements.length;
        const fullText = statements[i];
        let ticker: ReturnType<typeof setTimeout>;

        if (!isDeleting && text === fullText) {
            ticker = setTimeout(() => setIsDeleting(true), 1500);
        } else if (isDeleting && text === '') {
            setIsDeleting(false);
            setLoopNum(loopNum + 1);
        } else {
            const nextText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);
            ticker = setTimeout(
                () => setText(nextText),
                isDeleting ? 100 : 150
            );
        }

        return () => clearTimeout(ticker);
    }, [text, isDeleting, loopNum, statements]);

    return (
        <section className="hero">
            {/* Subtle particle background */}
            <div className="hero-particles">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="particle"
                        style={{
                            '--delay': `${i * 0.1}s`,
                            '--x': `${Math.random() * 100}%`,
                            '--y': `${Math.random() * 100}%`,
                        } as React.CSSProperties}
                    />
                ))}
            </div>
            
            <div className="hero-content">
                <h1 className="hero-name">Mann Talati</h1>
                <div className="rotating-text">
                    {text}
                    <span className="cursor"></span>
                </div>
                
                {/* Quick action buttons */}
                <div className="hero-actions">
                    <a href="#Projects" className="hero-button primary">
                        View My Work
                    </a>
                    <a href="#About" className="hero-button secondary">
                        Learn More
                    </a>
                </div>
            </div>
        </section>
    );
}