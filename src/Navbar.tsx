import './Navbar.css'
import { useState, useEffect } from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { MdOutlineEmail } from "react-icons/md";
import { HashLink } from 'react-router-hash-link';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="navbar-container">
                <div className="navbar-left">
                    <HashLink smooth to="/#top" className="navbar-logo">
                        MANN
                    </HashLink>

                    <div className="navbar-links">
                        <HashLink smooth to="/#top" className="nav-item">Home</HashLink>
                        <HashLink smooth to="/#About" className="nav-item">About</HashLink>
                        <HashLink smooth to="/#Experience" className="nav-item">Experience</HashLink>
                        <HashLink smooth to="/#Projects" className="nav-item">Projects</HashLink>
                        <HashLink smooth to="/#Technologies" className="nav-item">Tech</HashLink>
                        <HashLink smooth to="/#Contact" className="nav-item">Contact</HashLink>
                    </div>
                </div>

                <div className="navbar-right">
                    <div className="social-icons">
                        <a href="https://github.com/manntalati" target="_blank" rel="noreferrer" className="icon">
                            <FaGithub />
                        </a>
                        <a href="https://www.linkedin.com/in/mann-talati-017gvffgh" target="_blank" rel="noreferrer" className="icon">
                            <FaLinkedin />
                        </a>
                        <a href="mailto:mann.talati@gmail.com" className="icon">
                            <MdOutlineEmail />
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
}