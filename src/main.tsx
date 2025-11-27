import { createRoot } from 'react-dom/client'
import { useState } from 'react';
import About from './About.tsx'
import Hero from './Hero.tsx'
import Navbar from './Navbar.tsx'
import Experience from './Experience.tsx'
import Projects from './Projects.tsx'
import Tech from './Tech.tsx'
import Contact from './Contact.tsx'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from './ThemeContext';

import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { MdOutlineEmail } from "react-icons/md";

function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-socials">
                    <a href="https://github.com/manntalati" target="_blank" rel="noreferrer"><FaGithub /></a>
                    <a href="https://www.linkedin.com/in/mann-talati-017gvffgh" target="_blank" rel="noreferrer"><FaLinkedin /></a>
                    <a href="mailto:mann.talati@gmail.com"><MdOutlineEmail /></a>
                </div>

                <div className="footer-bottom">
                    <p>&copy; {currentYear} Mann Talati. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

function FloatingActionButton() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <button
            onClick={scrollToTop}
            className="fab"
            aria-label="Scroll to top"
        >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m18 15-6-6-6 6" />
            </svg>
        </button>
    );
}

function App() {
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <div className="app">
            <Navbar onSearch={setSearchQuery} />
            <main>
                <Hero />
                <div className="container">
                    <About />
                    <Experience searchQuery={searchQuery} />
                    <Projects searchQuery={searchQuery} />
                    <Tech searchQuery={searchQuery} />
                    <Contact />
                </div>
            </main>
            <Footer />
            <FloatingActionButton />
        </div>
    );
}

createRoot(document.getElementById('root')!).render(
    <Router>
        <ThemeProvider>
            <App />
        </ThemeProvider>
    </Router>
)
