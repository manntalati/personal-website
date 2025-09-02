import { createRoot } from 'react-dom/client'
import About from './About.tsx'
import Hero from './Hero.tsx'
import Navbar from './Navbar.tsx'
import Experience from './Experience.tsx'
import Projects from './Projects.tsx'
import Tech from './Tech.tsx'
import Contact from './Contact.tsx'
import './index.css'
import { BrowserRouter as Router} from 'react-router-dom';
import { ThemeProvider } from './ThemeContext';

function Footer() {
    const currentYear = new Date().getFullYear();
    
    return (
        <footer className="footer">
            <div className="container">
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
                <path d="m18 15-6-6-6 6"/>
            </svg>
        </button>
    );
}

function App() {
    return (
        <div className="app">
            <Navbar />
            <main>
                <Hero />
                <div className="container">
                    <About/>
                    <Experience />
                    <Projects />
                    <Tech />
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
