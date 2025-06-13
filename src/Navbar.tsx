import './Navbar.css'
import { MdOutlineEmail } from "react-icons/md";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { useState, useEffect } from 'react';


export default function Navbar() {
    const [top, setTop] = useState(false);
    // implement dynamic scrolling with the navbar to disappear and come back when scrolling
    useEffect (() => {
        document.addEventListener("scroll", e => {
            const scrolled = document.scrollingElement ? document.scrollingElement.scrollTop : 0;
            if (scrolled >= 2) {
                setTop(true);
            } else {
                setTop(false);
            }
        })
    }, []);

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
            {!top && (
                <div className="navbar">
                <div className="navbar-left">
                    <ul className="list">
                        <li className="navbar-item">
                            <FaLinkedin className="navbar-image"
                            onClick={linkedinLink}
                            size={30}
                            />
                        </li>
                        <li className="navbar-item">
                            <FaGithub className="navbar-image"
                            onClick={githubLink}
                            size={30}
                            />
                        </li>
                        <li className="navbar-item">
                            <MdOutlineEmail className="navbar-image"
                                onClick={emailLink}
                                size={30}
                                
                            />
                        </li>
                    </ul>
                </div>
                <div className="navbar-right">
                    <ul className="list">
                        <li className="navbar-item">
                            <a className="link" href="#about">About</a>
                        </li>
                        <li className="navbar-item">
                            <a className="link" href="#experience">Experience</a>
                        </li>
                        <li className="navbar-item">
                            <a className="link" href="#projects">Projects</a>
                        </li>
                        
                    </ul>
                </div>
                </div>
            )}
        </>
    )
}