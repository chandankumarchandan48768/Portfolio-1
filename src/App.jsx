import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Hero from './components/Sections/Hero';
import About from './components/Sections/About';
import Skills from './components/Sections/Skills';
import Projects from './components/Sections/Projects';
import Services from './components/Sections/Services';
import Contact from './components/Sections/Contact';
import Education from './components/Sections/Education';
import Experience from './components/Sections/Experience';
import { AuthProvider } from './context/AuthContext';

// Pages
import EducationPage from './pages/Education';
import ExperiencePage from './pages/Experience';
import ProjectsPage from './pages/Projects';
import SkillsPage from './pages/Skills';
import Login from './pages/Login';
import Register from './pages/Register';

const Home = () => (
  <>
    <Navbar />
    <Hero />
    <About />
    <Education />
    <Experience />
    <Skills />
    <Projects />
    <Services />
    <Contact />
    <Footer />
  </>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="bg-background min-h-screen text-white font-sans selection:bg-primary selection:text-black">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/education" element={<EducationPage />} />
            <Route path="/experience" element={<ExperiencePage />} />
            <Route path="/projects-manage" element={<ProjectsPage />} />
            <Route path="/skills-manage" element={<SkillsPage />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
