import './Navbar.css'
import { useState, useEffect } from 'react';
import { HashLink } from 'react-router-hash-link';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="navbar-container">
                <div className="navbar-left">
                    <HashLink smooth to="/#top" className="navbar-logo serif-heading">
                        Mann Talati
                    </HashLink>
                </div>

                <ul className="navbar-links">
                    <li><HashLink smooth to="/#About">About</HashLink></li>
                    <li><HashLink smooth to="/#Experience">Experience</HashLink></li>
                    <li><HashLink smooth to="/#Projects">Projects</HashLink></li>
                    <li><HashLink smooth to="/#Technologies">Skills</HashLink></li>
                    <li><HashLink smooth to="/#Contact">Contact</HashLink></li>
                </ul>

                <div className="navbar-right">
                    <HashLink smooth to="/#Contact" className="navbar-cta">
                        Get in Touch
                    </HashLink>
                </div>
            </div>
        </nav>
    );
}