import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
      <div className="min-h-screen bg-white laptop:bg-gradient-to-br laptop:from-white laptop:to-pink-50/30">
        <Navbar />
        <main className="laptop:pt-2 xl:pt-4">
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
    </Router>
  );
}

export default App;
