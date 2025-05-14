import { motion } from 'framer-motion';
import profileImg from '../assets/Titopic.jpeg';
import { Link } from 'react-router-dom';
import { FiSend, FiArrowRight, FiCode, FiExternalLink } from 'react-icons/fi';
import { FaGithub, FaLinkedin, FaEnvelope, FaReact, FaNodeJs, FaPython } from 'react-icons/fa';
import { SiTypescript, SiTailwindcss, SiMongodb, SiPostgresql } from 'react-icons/si';

// Project images
import project1Image from '../assets/Projects/Synapse.png';
import project2Image from '../assets/Projects/Planify.png';

// Company Logos Data - Using real images from assets
import logo1 from '../assets/html5.png';
import logo2 from '../assets/css3.png';
import logo3 from '../assets/js.png';
import logo4 from '../assets/React.png';
import logo5 from '../assets/python.png';

// Company Logos Data
const companyLogos = [logo1, logo2, logo3, logo4, logo5];

// Skills Data
const skills = [
  { name: 'React', icon: <FaReact size={32} /> },
  { name: 'TypeScript', icon: <SiTypescript size={30} /> },
  { name: 'Node.js', icon: <FaNodeJs size={32} /> },
  { name: 'Python', icon: <FaPython size={32} /> },
  { name: 'TailwindCSS', icon: <SiTailwindcss size={32} /> },
  { name: 'MongoDB', icon: <SiMongodb size={32} /> },
  { name: 'PostgreSQL', icon: <SiPostgresql size={32} /> },
];

// Featured Projects Data
interface Project {
  title: string;
  slug: string;
  description: string;
  image: string;
  technologies: string[];
  github?: string;
  live?: string;
}

const featuredProjects: Project[] = [
  {
    title: 'Portfolio Website',
    slug: 'portfolio-website',
    description: 'A modern, responsive portfolio website built with React and TailwindCSS.',
    image: project1Image,
    technologies: ['React', 'TypeScript', 'TailwindCSS'],
    github: 'https://github.com/KrishSaraf/Portfolio-Website',
    live: 'https://krishsaraf.github.io/'
  },
  {
    title: 'E-commerce Platform',
    slug: 'ecommerce-platform',
    description: 'A full-stack e-commerce platform with user authentication and payment processing.',
    image: project2Image,
    technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
    github: 'https://github.com/KrishSaraf/ecommerce-platform'
  }
];

const Home = () => {
  // Split logos into two rows for better display
  const firstRowLogos = companyLogos.slice(0, 4);
  const secondRowLogos = companyLogos.slice(4);

  return (
    <main className="bg-gradient-to-b from-white to-pink-50">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute w-[40rem] h-[40rem] rounded-full bg-darkPink/5 blur-3xl top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute w-[30rem] h-[30rem] rounded-full bg-darkPink/5 blur-3xl bottom-0 right-0 translate-x-1/4 translate-y-1/4"></div>
        </div>
        
        <div className="max-w-6xl mx-auto px-[var(--mobile-padding)] sm:px-6 pt-[3vh] sm:pt-[5vh] md:pt-[10vh] h-full flex flex-col">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10 h-full">
            {/* Left Side - Text */}
            <motion.div 
              className="md:w-[55%] text-center md:text-left order-2 md:order-1 mt-2 sm:mt-4 md:mt-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mb-4 inline-block"
              >
                <span className="bg-darkPink/10 text-darkPink/90 py-1 px-3 rounded-lg text-sm md:text-base font-medium">Full Stack Developer</span>
              </motion.div>
              
              <motion.h1 
                className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-bold text-slate-800 mb-4 md:mb-6 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                Hi! I'm <span className="text-darkPink relative">
                  Krish
                  <div className="absolute -bottom-1 left-0 w-full h-2 bg-darkPink/20 -z-10 rounded"></div>
                </span>, <br />
                Full Stack Developer
              </motion.h1>
              
              <motion.p 
                className="text-base sm:text-lg text-slate-600 mb-6 md:mb-8 max-w-2xl md:max-w-none"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                I build beautiful, functional, and user-friendly web applications with modern technologies. Let's create something amazing together!
              </motion.p>
              
              <motion.div 
                className="flex flex-wrap gap-4 justify-center md:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <Link to="/contact" className="bg-darkPink hover:bg-darkPink/90 text-white font-medium py-2.5 px-5 md:py-3 md:px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-2">
                  <span>Get in Touch</span>
                  <FiSend />
                </Link>
                <Link to="/projects" className="border border-darkPink/20 hover:border-darkPink bg-white hover:bg-darkPink/5 text-darkPink font-medium py-2.5 px-5 md:py-3 md:px-6 rounded-lg transition-all duration-300 shadow-sm hover:shadow-md flex items-center gap-2">
                  <span>View Projects</span>
                  <FiArrowRight />
                </Link>
              </motion.div>
              
              <motion.div 
                className="flex gap-5 mt-8 md:mt-12 justify-center md:justify-start items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <span className="text-sm md:text-base text-slate-500">Connect with me:</span>
                <motion.a 
                  href="https://github.com/KrishSaraf/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-slate-600 hover:text-darkPink transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -2 }}
                >
                  <FaGithub size={22} className="text-[var(--mobile-icon-size)]" />
                </motion.a>
                <motion.a 
                  href="https://www.linkedin.com/in/krishsaraf/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-slate-600 hover:text-darkPink transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -2 }}
                >
                  <FaLinkedin size={22} className="text-[var(--mobile-icon-size)]" />
                </motion.a>
                <motion.a 
                  href="mailto:krishsaraf05@gmail.com" 
                  className="text-slate-600 hover:text-darkPink transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -2 }}
                >
                  <FaEnvelope size={22} className="text-[var(--mobile-icon-size)]" />
                </motion.a>
              </motion.div>
            </motion.div>
            
            {/* Right Side - Image */}
            <motion.div 
              className="md:w-[45%] order-1 md:order-2 mt-[5vh] md:mt-0"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="relative aspect-[0.8/1] w-full max-w-[350px] mx-auto">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-darkPink/20 to-darkPink/5 animate-pulse"></div>
                <img 
                  src={profileImg} 
                  alt="Krish Saraf" 
                  className="object-cover object-top w-full h-full rounded-full border-4 border-white shadow-xl z-10 relative"
                />
                <div className="absolute -right-4 -bottom-4 bg-white p-3 rounded-full shadow-lg border-2 border-darkPink/30 z-20">
                  <FiCode size={25} className="text-darkPink" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Logos Section */}
      <section className="py-10 md:py-16 overflow-hidden">
        <div className="max-w-6xl mx-auto px-[var(--mobile-padding)] sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="text-center mb-8 md:mb-12"
          >
            <h2 className="text-xl sm:text-2xl font-medium text-slate-500">Trusted by companies worldwide</h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-8 mb-[clamp(1rem,2vh,1.5rem)]"
          >
            {/* Logos in a Grid */}
            {companyLogos.map((logo, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="flex items-center justify-center p-[clamp(0.5rem,1.5vw,1rem)] h-[clamp(3.5rem,6vw,4.5rem)] rounded-lg bg-white border border-slate-100 shadow-sm"
              >
                <img
                  src={logo}
                  alt="Company Logo"
                  className="max-w-[90%] max-h-[90%] object-contain filter grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Featured Projects Section */}
      <section className="py-10 md:py-16 overflow-hidden">
        <div className="max-w-6xl mx-auto px-[var(--mobile-padding)] sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="text-center mb-10 md:mb-14"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800 mb-3 md:mb-4">Featured Projects</h2>
            <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto">Check out some of my recent work that showcases my skills and expertise</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-slate-100 h-full flex flex-col"
              >
                <div className="relative overflow-hidden aspect-video">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-4 w-full">
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, i) => (
                          <span key={i} className="text-xs font-medium py-1 px-2 rounded-md bg-white/20 text-white backdrop-blur-sm">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-5 md:p-6 flex flex-col flex-grow">
                  <h3 className="text-lg sm:text-xl font-semibold text-slate-800 mb-2">{project.title}</h3>
                  <p className="text-slate-600 text-base mb-4 flex-grow">{project.description}</p>
                  
                  <div className="flex items-center justify-between mt-2">
                    <Link 
                      to={`/projects/${project.slug}`} 
                      className="text-darkPink font-medium text-sm sm:text-base flex items-center gap-1 hover:gap-2 transition-all duration-300"
                    >
                      View Details <FiArrowRight />
                    </Link>
                    <div className="flex gap-2 sm:gap-3">
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-darkPink transition-all duration-300" aria-label="GitHub Repository">
                          <FaGithub size={20} className="text-[var(--mobile-icon-size)]" />
                        </a>
                      )}
                      {project.live && (
                        <a href={project.live} target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-darkPink transition-all duration-300" aria-label="Live Demo">
                          <FiExternalLink size={20} className="text-[var(--mobile-icon-size)]" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-center mt-10 md:mt-12"
          >
            <Link 
              to="/projects" 
              className="inline-flex items-center gap-2 bg-white text-darkPink border border-darkPink/20 hover:border-darkPink hover:bg-darkPink/5 font-medium py-2.5 px-5 md:py-3 md:px-6 rounded-lg transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <span>View All Projects</span>
              <FiArrowRight />
            </Link>
          </motion.div>
        </div>
      </section>
      
      {/* Skills Section */}
      <section className="py-10 md:py-16 overflow-hidden">
        <div className="max-w-6xl mx-auto px-[var(--mobile-padding)] sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="text-center mb-10 md:mb-14"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800 mb-3 md:mb-4">My Skills</h2>
            <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto">Technologies and tools I work with to bring ideas to life</p>
          </motion.div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.05 * index }}
                className="bg-white rounded-lg p-4 text-center border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 hover:border-darkPink/30 group flex flex-col items-center justify-center aspect-[4/3]"
              >
                <div className="text-slate-400 group-hover:text-darkPink transition-colors duration-300 mb-3 h-[45px] flex items-center justify-center">
                  {skill.icon}
                </div>
                <h3 className="text-sm sm:text-base font-medium text-slate-700 group-hover:text-darkPink transition-colors duration-300">
                  {skill.name}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-10 md:py-16 overflow-hidden">
        <div className="max-w-5xl mx-auto px-[var(--mobile-padding)] sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="bg-gradient-to-r from-darkPink/10 to-pink-100 rounded-2xl p-6 sm:p-8 md:p-12 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-darkPink/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-darkPink/10 rounded-full blur-3xl"></div>
            
            <div className="relative z-10 text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800 mb-3 md:mb-4">Let's Work Together</h2>
              <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto mb-6 md:mb-8">
                Have a project in mind or looking for a dedicated developer to join your team? I'd love to hear from you!
              </p>
              <Link 
                to="/contact" 
                className="inline-flex items-center gap-2 bg-darkPink text-white hover:bg-darkPink/90 font-medium py-2.5 px-5 md:py-3 md:px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <span>Contact Me</span>
                <FiSend />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Home; 