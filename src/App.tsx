import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import WorkExperience from './pages/WorkExperience';
import Skills from './pages/Skills';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import AwardsAndPics from './pages/AwardsAndPics';
import PhotoCollage from './pages/PhotoCollage';
import ScrollToTop from './components/ScrollToTop';
import { useEffect } from 'react';

// // Single page application layout component for the home page
// function SinglePageApp() {
//   return (
//     <>
//       <div id="home-section">
//         <Home />
//       </div>
//       <div id="projects-section">
//         <Projects />
//       </div>
//       <div id="awards-section">
//         <AwardsAndPics />
//       </div>
//       <div id="experience-section">
//         <WorkExperience />
//       </div>
//       <div id="skills-section">
//         <Skills />
//       </div>
//       <div id="contact-section">
//         <Contact />
//       </div>
//     </>
//   );
// }

function App() {
  // Ensure viewport meta tag is properly set
  useEffect(() => {
    // Check if viewport meta tag exists
    let viewport = document.querySelector('meta[name="viewport"]') as HTMLMetaElement | null;
    
    // If it doesn't exist, create it
    if (!viewport) {
      viewport = document.createElement('meta');
      viewport.name = 'viewport';
      document.head.appendChild(viewport);
    }
    
    // Set the viewport content for optimal responsive behavior
    viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0, viewport-fit=cover');
  }, []);

  return (
    <Router>
      <ScrollToTop>
        <div className="min-h-screen bg-white">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/experience" element={<WorkExperience />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/awards" element={<AwardsAndPics />} />
              <Route path="/photos" element={<PhotoCollage />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
        </div>
      </ScrollToTop>
    </Router>
  );
}

export default App;
