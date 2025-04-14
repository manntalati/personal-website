import { createRoot } from 'react-dom/client'
import About from './About.tsx'
import Navbar from './Navbar.tsx'
import Resume from './Resume.tsx'
import Projects from './Projects.tsx'
import './index.css'
import { BrowserRouter as Router} from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
  <Router>
    <Navbar />
    <About/>
    <Projects />
    <Resume />
  </Router>
)
