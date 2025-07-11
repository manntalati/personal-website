import './Navbar.css'
import { MdOutlineEmail } from "react-icons/md";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { useState, useEffect } from 'react';
import { HashLink } from 'react-router-hash-link';

export default function Navbar() {
    const [showNav, setShowNav] = useState(false);
    const [scrollY, setScrollY] = useState(0);
    const [scrollProgress, setScrollProgress] = useState(0);

    const handleScrolling = () => {
        const currY = window.scrollY;
        if (currY > scrollY) {
            setShowNav(true);
        } else {
            setShowNav(false);
        }
        setScrollY(currY);
        
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (currY / scrollHeight) * 100;
        setScrollProgress(progress);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScrolling);
        return () => {
            window.removeEventListener("scroll", handleScrolling);
        };
    }, [scrollY]);

    const linkedinLink = () => {
        window.open("https://www.linkedin.com/in/mann-talati-017gvffgh")
    }

    const githubLink = () => {
        window.open("https://github.com/manntalati")
    }

    const emailLink = () => {
        window.open("mailto: mann.talati@gmail.com")
    }

    return (
        <>
            <div 
                className="scroll-progress" 
                style={{ width: `${scrollProgress}%` }}
            />
            
            {!showNav && (
                <div className={`navbar ${scrollY > 100 ? 'scrolled' : ''}`}>
                    <div className="navbar-left">
                        <ul className="list">
                            <li className="navbar-item">
                                <FaLinkedin 
                                    className="navbar-image" 
                                    onClick={linkedinLink} 
                                    title="LinkedIn"
                                />
                            </li>
                            <li className="navbar-item">
                                <FaGithub 
                                    className="navbar-image" 
                                    onClick={githubLink} 
                                    title="GitHub"
                                />
                            </li>
                            <li className="navbar-item">
                                <MdOutlineEmail 
                                    className="navbar-image" 
                                    onClick={emailLink} 
                                    title="Email"
                                />
                            </li>
                        </ul>
                    </div>
                    <div className="navbar-right">
                        <ul className="list">
                            <li className="navbar-item">
                                <HashLink className="link" smooth to="#About">About</HashLink>
                            </li>
                            <li className="navbar-item">
                                <HashLink className="link" smooth to="#Experience">Experience</HashLink>
                            </li>
                            <li className="navbar-item">
                                <HashLink className="link" smooth to="#Projects">Projects</HashLink>
                            </li>
                            <li className="navbar-item">
                                <HashLink className="link" smooth to="#Technologies">Technologies</HashLink>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
        </>
    )
}