import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import WorkExperience from './pages/WorkExperience';
import Skills from './pages/Skills';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import AwardsAndPics from './pages/AwardsAndPics';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navbar />
        <main>
          <div id="home-section">
            <Home />
          </div>
          <div id="projects-section">
            <Projects />
          </div>
          <div id="awards-section">
            <AwardsAndPics />
          </div>
          <div id="experience-section">
            <WorkExperience />
          </div>
          <div id="skills-section">
            <Skills />
          </div>
          <div id="contact-section">
            <Contact />
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;
