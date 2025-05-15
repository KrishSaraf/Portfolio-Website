import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import WorkExperience from './pages/WorkExperience';
import Skills from './pages/Skills';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import AwardsAndPics from './pages/AwardsAndPics';
import ScrollToTop from './components/ScrollToTop';

function App() {
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
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
        </div>
      </ScrollToTop>
    </Router>
  );
}

export default App;
