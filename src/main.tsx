import { createRoot } from 'react-dom/client'
import { useEffect } from 'react'
import About from './About.tsx'
import Hero from './Hero.tsx'
import Navbar from './Navbar.tsx'
import Experience from './Experience.tsx'
import Projects from './Projects.tsx'
import Research from './Research.tsx'
import Tech from './Tech.tsx'
import Contact from './Contact.tsx'
import Stats from './Stats.tsx'
import CommandPalette from './CommandPalette.tsx'
import Photography from './Photography.tsx'
import './index.css'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './ThemeContext';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { FiMail, FiArrowUp } from 'react-icons/fi';
import { Analytics } from '@vercel/analytics/react';

function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-socials">
                    <a href="https://github.com/manntalati" target="_blank" rel="noreferrer" aria-label="GitHub">
                        <FaGithub />
                    </a>
                    <a href="https://www.linkedin.com/in/mann-talati" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                        <FaLinkedin />
                    </a>
                    <a href="mailto:mann.talati@gmail.com" aria-label="Email">
                        <FiMail />
                    </a>
                </div>

                <div className="footer-bottom">
                    <p>© {currentYear} Mann Talati. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

function ScrollToTop() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <button
            onClick={scrollToTop}
            className="fab"
            aria-label="Scroll to top"
        >
            <FiArrowUp />
        </button>
    );
}

function Home() {
    return (
        <>
            <Hero />
            <Stats />
            <About />
            <Experience />
            <Research />
            <Projects />
            <Tech />
            <Contact />
        </>
    );
}

// Reset scroll to the top on route changes, but leave hash navigation (HashLink) alone.
function ScrollToTopOnNavigate() {
    const { pathname, hash } = useLocation();
    useEffect(() => {
        if (!hash) window.scrollTo(0, 0);
    }, [pathname, hash]);
    return null;
}

function App() {
    return (
        <div className="app">
            <Navbar />
            <ScrollToTopOnNavigate />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/photography" element={<Photography />} />
                </Routes>
            </main>
            <Footer />
            <ScrollToTop />
            <CommandPalette />
            <Analytics />
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
