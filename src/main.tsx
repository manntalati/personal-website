import "bootstrap/dist/css/bootstrap.min.css";
import { createRoot } from 'react-dom/client'
import About from './About.tsx'
import Hero from './Hero.tsx'
import Navbar from './Navbar.tsx'
import Experience from './Experience.tsx'
import Projects from './Projects.tsx'
//import Tech from './Tech.tsx'
import './index.css'
import { BrowserRouter as Router} from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
  <Router>
    <Navbar />
    <Hero />
    <About/>
    <Experience />
    <Projects />
    {/*<Tech />*/}
  </Router>
)
