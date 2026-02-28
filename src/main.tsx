import { createRoot } from 'react-dom/client'
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
import { FiMail, FiArrowUp } from 'react-icons/fi';

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

function App() {
    return (
        <div className="app">
            <Navbar />
            <main>
                <Hero />
                <About />
                <Experience />
                <Projects />
                <Tech />
                <Contact />
            </main>
            <Footer />
            <ScrollToTop />
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
