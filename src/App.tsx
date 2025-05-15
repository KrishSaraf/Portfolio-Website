import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import WorkExperience from './pages/WorkExperience';
import Skills from './pages/Skills';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import AwardsAndPics from './pages/AwardsAndPics';
import ScrollToTop from './components/ScrollToTop';

// Single page application layout component for the home page
function SinglePageApp() {
  return (
    <>
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
    </>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop>
        <div className="min-h-screen bg-white">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<SinglePageApp />} />
              <Route path="/experience" element={<WorkExperience />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/awards" element={<AwardsAndPics />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
        </div>
      </ScrollToTop>
    </Router>
  );
}

export default App;
