import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import trendz from '../assets/Projects/Synapse.png';
import EXE from '../assets/Projects/EXE.png';
import mautImg from '../assets/Projects/maut.png';
import cleantech1 from '../assets/Projects/cleantech1.png';
import cleantech2 from '../assets/Projects/cleantech2.png';
import finagent from '../assets/Projects/finagent.png';
import getmyleadz from '../assets/Projects/getmyleadz.png';
import montecarlo from '../assets/Projects/montecarlo.png';
import ntupeak from '../assets/Projects/ntupeak.png';
import tiger from '../assets/Projects/tiger.png';
import { Link, useLocation } from 'react-router-dom';

// Image Carousel Component for rotating between images
type ImageCarouselProps = {
  images: string[];
  alt: string;
  interval?: number;
};

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images, alt, interval = 2000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);
    
    return () => clearInterval(timer);
  }, [images.length, interval]);
  
  return (
    <div className="relative w-full h-full min-h-[200px]">
      {images.map((image, index) => (
        <AnimatePresence initial={false} mode="wait" key={`carousel-${index}`}>
          {index === currentIndex && (
            <motion.img
              key={`image-${index}`}
              src={image}
              alt={`${alt} ${index + 1}`}
              className="absolute inset-0 w-full h-full object-contain"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
          )}
        </AnimatePresence>
      ))}
    </div>
  );
};

// Project type definition
type Project = {
  title: string;
  subtitle: string;
  github: string;
  live: string;
  image?: string;
  imageCarousel?: string[];
  liveSee: string;
  description: string[];
  technologies: string[];
};

const projects: Project[] = [
  {
    title: 'Surgical Gauze Detection using Computer Vision',
    subtitle: 'Undergraduate Research Project',
    github: 'https://github.com/KrishSaraf/AI-for-gauze-detection-in-OT',
    live: '',
    image: mautImg,
    liveSee: 'Deployed a real-time surgical gauze detection system with 98% accuracy for SGH, doubling throughput to 34 FPS with projected savings of SGD $1M.',
    description: [
      'Developed and deployed a real-time gauze detection system with SGH using YOLOv8 (PyTorch), achieving 98% detection accuracy.',
      'Applied Roboflow-based augmentation and OpenCV preprocessing; containerized the GPU-accelerated pipeline with Docker, doubling throughput to 34 FPS.',
      'Integrated the system into clinical workflows based on surgeon feedback, with projected cost savings exceeding SGD $1M.'
    ],
    technologies: ['YOLOv8', 'Computer Vision', 'Docker', 'Healthcare AI', 'PyTorch', 'OpenCV', 'GPU Acceleration'],
  },
  {
    title: 'IEEE NTU & NUS Synapse Hackathon 2024',
    subtitle: '1st Prize',
    github: 'https://github.com/KrishSaraf/Trendz_Website-Synapse-Hackathon',
    live: '',
    image: trendz,
    liveSee: 'One-Stop AI platform for content creation, from ideation to editing, through seamless integration of GPT, CLIP, Stable Diffusion, and Runway ML- powered by our own Algorithms in the backend.',
    description: [
      'Created "Trendz", an AI-powered platform to streamline real-time text and visual content creation workflows by integrating GPT, CLIP, Stable Diffusion, and Runway ML, minimizing creation time by more than 90%.',
      'Built a full-stack prototype, including a responsive website using React, Node.js, and Express.js.',
      'Secured 1st place among 200+ participants for innovation, technical excellence, and addressing creative inefficiencies.'
    ],
    technologies: ['React', 'Node.js', 'Express.js', 'GPT', 'CLIP', 'Stable Diffusion', 'Runway ML', 'Gemini API'],
  },
  {
    title: 'Clean-Tech Challenge',
    subtitle: '1st Prize - Two years in a row',
    github: '',
    live: '',
    imageCarousel: [cleantech1, cleantech2], // Using an array of images for carousel
    liveSee: 'Back-to-back champion project once creating a ETA prediction model for ships and the next time a sustainability platform for Singapore SMEs to get Green Credits.',
    description: [
      '2024: Designed a deep learning model for robust shipment predictions, enhancing our efficiency with a feedback loop & Adjusted Scheduler algorithm for dynamic shipment processing- achieving 91% accuracy & reduced human effort by 30%.',
      '2023: Prototyped "GreenCompass SG", an end-to-end sustainability platform for SMEs in Singapore, integrating a carbon-costing algorithm, a recommendation engine to guide ESG-related decisions and LLM-based document parsing and verification.'
    ],
    technologies: ['Machine Learning', 'Dashboard API', 'Scheduler Algorithm', 'Deep Learning', 'Sustainability', 'Carbon Accounting', 'LLM'],
  },
  {
    title: 'NTU IEEE Intuition Hackathon',
    subtitle: '1st Runner-Up',
    github: 'https://github.com/KrishSaraf/iNTUition.exe-main',
    live: '',
    image: EXE,
    liveSee: 'Revolutionary AI system that transforms prompts into fully-functional websites with 3.5× ROI, cutting development from months to minutes.',
    description: [
      'Led development of an AI-agent system that turns prompt-based inputs into full-stack sites—auto-generating and scoring multiple combinations of front/back-end architectures.',
      'Created a modular stack (Claude AI, Bind AI, Bolt, Manus) with Puppeteer-driven persona simulations to automate quality testing across 20+ UX, performance, and scalability metrics and deploying the best website automatically.',
      'Slashed development cycles from months to minutes, boosting productivity 80% and delivering 3.5× ROI for users.'
    ],
    technologies: ['AI', 'GPT', 'Bind AI', 'Bolt', 'Manus', 'Puppeteer', 'Claude AI'],
  },
  {
    title: '"Code with AI" Hackathon - Get My Leadz',
    subtitle: '3rd Place',
    github: 'https://github.com/KrishSaraf/Get-My-Leadz-Final',
    live: 'https://grand-phoenix-4ffc98.netlify.app/',
    image: getmyleadz,
    liveSee: 'Built an AI-driven lead generation platform that automates prospect discovery, qualification, and scoring, reducing acquisition time from months to weeks with 70% faster lead qualification.',
    description: [
      'Developed "Get My Leadz", an AI-driven solution automating the process of identifying, qualifying, and scoring sales leads, helping companies focus on closing deals rather than manual prospect searches.',
      'Designed a three-step architecture: 1) Contact sourcing using web scraping and ML selection, 2) Automated email sending with sentiment analysis, 3) Lead scoring with Random Forest for probability-based conversion prediction.',
      'Integrated Elastic Net and Random Forest models with sentiment analysis, delivering business impact including 70% faster qualification, 30% cost savings, and 4-6 hours saved per rep weekly.',
      'Led a diverse team of Year 1 and Year 3 students, building and hosting a fully functional application using Bolt framework within the tight hackathon timeframe.'
    ],
    technologies: ['Bolt', 'TypeScript', 'Python', 'Supabase', 'Tailwind CSS', 'Vite', 'EmailJS', 'Machine Learning', 'Elastic Net', 'Random Forest'],
  },
  {
    title: 'NTU PEAK Leadership Program',
    subtitle: '1st Runners Up, Best Ideation Award',
    github: '',
    live: '',
    image: ntupeak,
    liveSee: 'Designed a future-proof MRT system blueprint for 2030 in collaboration with the Land Transport Authority, focusing on user experience and scalability.',
    description: [
      'Conceptualized the blueprint, technical framework, and implementation roadmap for a future-proof MRT system for 2030.',
      'Collaborated with the Land Transport Authority (LTA) to validate user-centric innovations aimed at enhancing stakeholder alignment, commuter experience, and system scalability.'
    ],
    technologies: ['Urban Tech', 'Systems Thinking', 'Stakeholder Alignment', 'Public Infrastructure', 'Design Thinking', 'Sustainability'],
  },
  {
    title: 'Reinforcement Learning-Based Multi-Model Financial AI Agent',
    subtitle: 'Final Year Project',
    github: '',
    live: '',
    image: finagent,
    liveSee: 'Built a multimodal financial AI agent that analyzes stock data, K-line patterns, news sentiment, and financials, achieving 35% ARR over a year of testing.',
    description: [
      'Built a multimodal financial AI agent under the guidance of Prof. Bo An (Head of AI, NTU), integrating structured stock data, K-line visual patterns, FinBERT-based sentiment from 10,000+ news articles, and company-specific financials.',
      'Designed a dual-level reinforcement learning reflection system—analyzing both recent and historical decisions—to dynamically adjust investment strategies.',
      'Achieved an average ARR of 35% over 1 year, tested on 100 Indian equities and bonds.'
    ],
    technologies: ['Reinforcement Learning', 'FinBERT', 'Multimodal AI', 'Financial Modeling', 'Time Series', 'Deep Learning', 'Python', 'PyTorch'],
  },
  {
    title: 'Monte Carlo Simulation for Financial Derivatives Pricing',
    subtitle: 'Course Project',
    github: '',
    live: '',
    image: montecarlo,
    liveSee: 'Developed Monte Carlo simulations for complex derivatives pricing using GBM/Heston/CIR models, reducing error by 73.3% and running 1.8M+ simulations.',
    description: [
      'Simulated pricing of complex derivatives using GBM, Heston, and CIR models, calibrated with real options data.',
      'Applied Control Variates and Martingale Correction techniques, reducing RMSE by 73.3%.',
      'Ran over 1.8M simulations, performed sensitivity analysis via Finite Difference Method, and built a risk-neutral portfolio for an Auto-Callable Barrier Reverse on the SIX exchange.'
    ],
    technologies: ['Monte Carlo', 'GBM / Heston / CIR', 'Quant Finance', 'Options Pricing', 'Risk Management', 'Stochastic Calculus', 'Python'],
  },
  {
    title: 'NUS-Tiger Brokers Case Competition 2025',
    subtitle: 'Top 10',
    github: '',
    live: '',
    image: tiger,
    liveSee: 'Developed a comprehensive strategy to create an economic moat for Tiger Brokers Singapore, focusing on engaging young adults through gamification and community building.',
    description: [
      'Created "Tiger Den" - institution-specific investment clubs across universities, polytechnics, and JCs to build brand loyalty and drive user acquisition with a projected 75% conversion rate.',
      'Designed "Tiger Arena" - a digital extension of Tiger Den featuring portfolio sharing, community features, and school-based competitions to boost user retention and engagement.',
      'Developed "Tiger Quest" - a gamified investment learning journey with personalized "Tiger DNA" investor archetypes and AI-driven educational pathways to improve financial literacy.',
      'Projected annual increase of 6000 users with $14.4 Million in AUM, resulting in $86,400 additional revenue per year with program rollout across 48 tertiary institutions.'
    ],
    technologies: ['Financial Strategy', 'Gamification', 'Community Building', 'Investor Education', 'Behavioral Economics', 'Customer Retention', 'Business Development'],
  }
];

const gridPattern = `url('data:image/svg+xml;utf8,<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="0.5" y="0.5" width="39" height="39" rx="7.5" fill="none" stroke="%23e11d4822"/></svg>')`;

const Projects = () => {
  const [selected, setSelected] = useState<number | null>(null);
  const location = useLocation();

  // Function to scroll to a specific project
  const scrollToProject = (projectIndex: number) => {
    const projectElement = document.getElementById(`project-${projectIndex}`);
    if (projectElement) {
      // Use different offset for mobile vs desktop
      const isMobile = window.innerWidth < 768;
      const offset = isMobile ? 80 : 30;
      
      const elementPosition = projectElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Handle hash navigation when component mounts or URL changes
  useEffect(() => {
    if (location.hash) {
      const hash = location.hash.replace('#', '');
      const projectMatch = hash.match(/project-(\d+)/);
      
      if (projectMatch && projectMatch[1]) {
        const projectIndex = parseInt(projectMatch[1], 10);
        
        // Delay scrolling slightly to ensure page is rendered
        setTimeout(() => {
          scrollToProject(projectIndex);
        }, 300);
      }
    }
  }, [location]);

  return (
    <section className="min-h-screen w-full py-20 px-4 sm:px-8 bg-gradient-to-br from-white via-pink-50 to-darkPink/10 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: gridPattern }} />
      
      <div className="max-w-7xl mx-auto relative">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-extrabold text-darkPink mb-4 tracking-tight">
            Featured Projects
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            A collection of my most impactful work, from hackathon wins to innovative solutions
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-8"
        >
          {projects.map((project, index) => (
            <motion.div
              id={`project-${index}`}
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group relative w-full bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="flex flex-col md:flex-row">
                {/* Image Section */}
                <div className="md:w-2/5 relative min-h-[200px]">
                  {project.imageCarousel ? (
                    <ImageCarousel images={project.imageCarousel} alt={project.title} />
                  ) : project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full min-h-[100px] object-contain"
                    />
                  ) : (
                    <div className="w-full h-full min-h-[200px] bg-gradient-to-br from-pink-50 to-darkPink/10 flex items-center justify-center">
                      <svg className="w-16 h-16 text-darkPink/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                  {project.subtitle && (
                    <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-darkPink font-medium text-sm px-4 py-2 rounded-full shadow-sm">
                      {project.subtitle}
                    </span>
                  )}
                </div>

                {/* Content Section */}
                <div className="md:w-3/5 p-8 flex flex-col">
                  {/* Title and Description */}
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-darkPink group-hover:text-pink-600 transition-colors duration-200 mb-4">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 line-clamp-2 mb-6">
                      {project.liveSee}
                    </p>
                  </div>

                  {/* Technologies and Button */}
                  <div className="space-y-6">
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="text-sm text-darkPink bg-pink-50 px-3 py-1 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-4">
                        <button
                          className="px-6 py-3 text-sm font-semibold text-white bg-darkPink rounded-xl hover:bg-pink-600 transition-colors duration-200 flex items-center gap-2 group-hover:shadow-md"
                          onClick={() => setSelected(index)}
                        >
                          View Details
                        </button>
                        
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-darkPink hover:text-pink-600 transition-colors duration-200"
                            title="View on GitHub"
                          >
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                            </svg>
                          </a>
                        )}
                        {project.live && (
                          <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="View Live Demo"
                            className="px-3 py-1 text-sm font-medium text-darkPink bg-pink-50 rounded-lg hover:bg-pink-100 transition-colors duration-200 flex items-center gap-1"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                            Live Demo
                          </a>
                        )}
                      </div>
                      
                      {/* View Pics buttons aligned with View Details */}
                      {project.title === "IEEE NTU & NUS Synapse Hackathon 2024" && (
                        <Link to="/awards?from=1#synapse-section" className="px-6 py-3 text-sm font-semibold text-white bg-darkPink rounded-xl hover:bg-pink-600 transition-colors duration-200 flex items-center gap-2 group-hover:shadow-md">
                          View Pics
                          <span className="transform group-hover:translate-x-1 transition-transform duration-200">→</span>
                        </Link>
                      )}

                      {project.title === "Clean-Tech Challenge" && (
                        <Link to="/awards?from=2#cleantech-section" className="px-6 py-3 text-sm font-semibold text-white bg-darkPink rounded-xl hover:bg-pink-600 transition-colors duration-200 flex items-center gap-2 group-hover:shadow-md">
                          View Pics
                          <span className="transform group-hover:translate-x-1 transition-transform duration-200">→</span>
                        </Link>
                      )}
                      
                      {project.title === "NTU IEEE Intuition Hackathon" && (
                        <Link to="/awards?from=3#intuition-section" className="px-6 py-3 text-sm font-semibold text-white bg-darkPink rounded-xl hover:bg-pink-600 transition-colors duration-200 flex items-center gap-2 group-hover:shadow-md">
                          View Pics
                          <span className="transform group-hover:translate-x-1 transition-transform duration-200">→</span>
                        </Link>
                      )}
                      
                      {project.title === '"Code with AI" Hackathon - Get My Leadz' && (
                        <Link to="/awards?from=4#codewithai-section" className="px-6 py-3 text-sm font-semibold text-white bg-darkPink rounded-xl hover:bg-pink-600 transition-colors duration-200 flex items-center gap-2 group-hover:shadow-md">
                          View Pics
                          <span className="transform group-hover:translate-x-1 transition-transform duration-200">→</span>
                        </Link>
                      )}

                      {project.title === "NTU PEAK Leadership Program" && (
                        <Link to="/awards?from=5#peak-section" className="px-6 py-3 text-sm font-semibold text-white bg-darkPink rounded-xl hover:bg-pink-600 transition-colors duration-200 flex items-center gap-2 group-hover:shadow-md">
                          View Pics
                          <span className="transform group-hover:translate-x-1 transition-transform duration-200">→</span>
                        </Link>
                      )}
                      
                      {project.title === "Surgical Gauze Detection using Computer Vision" && (
                        <Link to="/awards?from=0#gauze-section" className="px-6 py-3 text-sm font-semibold text-white bg-darkPink rounded-xl hover:bg-pink-600 transition-colors duration-200 flex items-center gap-2 group-hover:shadow-md">
                          View Pics
                          <span className="transform group-hover:translate-x-1 transition-transform duration-200">→</span>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Project Details Modal */}
        <AnimatePresence>
          {selected !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
              onClick={() => setSelected(null)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 relative max-h-[90vh] overflow-y-auto"
                onClick={e => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  className="absolute top-4 right-4 text-gray-400 hover:text-darkPink text-2xl font-bold transition-colors duration-200"
                  onClick={() => setSelected(null)}
                  aria-label="Close"
                >
                  ×
                </button>

                {/* Modal Content */}
                <div className="space-y-6">
                  {/* Header */}
                  <div className="flex items-start gap-6">
                    {projects[selected].imageCarousel ? (
                      <div className="w-30 h-24 rounded-xl shadow-lg overflow-hidden">
                        <ImageCarousel 
                          images={projects[selected].imageCarousel} 
                          alt={projects[selected].title} 
                          interval={3000} 
                        />
                      </div>
                    ) : projects[selected].image && (
                      <img
                        src={projects[selected].image}
                        alt={projects[selected].title}
                        className="w-30 h-24 rounded-xl shadow-lg object-contain"
                      />
                    )}
                    <div>
                      <h3 className="text-2xl font-bold text-darkPink mb-2">
                        {projects[selected].title}
                      </h3>
                      {projects[selected].subtitle && (
                        <span className="inline-block bg-pink-50 text-darkPink font-medium text-sm px-4 py-1 rounded-full">
                          {projects[selected].subtitle}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-gray-800">Overview</h4>
                    <ul className="list-disc pl-6 space-y-3 text-gray-600">
                      {projects[selected].description.map((point, i) => (
                        <li key={i} className="leading-relaxed">{point}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-3">Technologies Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {projects[selected].technologies.map((tech) => (
                        <span
                          key={tech}
                          className="text-sm text-darkPink bg-pink-50 px-3 py-1 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Links */}
                  <div className="flex gap-4 pt-4">
                    {projects[selected].github && (
                      <a
                        href={projects[selected].github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-darkPink rounded-lg hover:bg-pink-600 transition-colors duration-200"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        View on GitHub
                      </a>
                    )}
                    {projects[selected].title === "IEEE NTU & NUS Synapse Hackathon 2024" && (
                      <Link
                        to="/awards?from=1#synapse-section"
                        onClick={() => {
                          setSelected(null);
                          setTimeout(() => {
                            const element = document.getElementById('synapse-section');
                            if (element) {
                              const isMobile = window.innerWidth < 768;
                              const offset = isMobile ? 120 : 40;
                              const scrollTo = element.getBoundingClientRect().top + window.pageYOffset - offset;
                              window.scrollTo({ top: scrollTo, behavior: 'smooth' });
                            }
                          }, 1000);
                        }}
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-darkPink rounded-lg hover:bg-pink-600 transition-colors duration-200"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        View Pics
                      </Link>
                    )}
                    {projects[selected].title === "Clean-Tech Challenge" && (
                      <Link
                        to="/awards?from=2#cleantech-section"
                        onClick={() => {
                          setSelected(null);
                          setTimeout(() => {
                            const element = document.getElementById('cleantech-section');
                            if (element) {
                              const isMobile = window.innerWidth < 768;
                              const offset = isMobile ? 120 : 40;
                              const scrollTo = element.getBoundingClientRect().top + window.pageYOffset - offset;
                              window.scrollTo({ top: scrollTo, behavior: 'smooth' });
                            }
                          }, 1000);
                        }}
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-darkPink rounded-lg hover:bg-pink-600 transition-colors duration-200"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        View Pics
                      </Link>
                    )}
                    {projects[selected].title === "NTU IEEE Intuition Hackathon" && (
                      <Link
                        to="/awards?from=3#intuition-section"
                        onClick={() => {
                          setSelected(null);
                          setTimeout(() => {
                            const element = document.getElementById('intuition-section');
                            if (element) {
                              const isMobile = window.innerWidth < 768;
                              const offset = isMobile ? 120 : 40;
                              const scrollTo = element.getBoundingClientRect().top + window.pageYOffset - offset;
                              window.scrollTo({ top: scrollTo, behavior: 'smooth' });
                            }
                          }, 1000);
                        }}
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-darkPink rounded-lg hover:bg-pink-600 transition-colors duration-200"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        View Pics
                      </Link>
                    )}
                    {projects[selected].title === '"Code with AI" Hackathon - Get My Leadz' && (
                      <Link
                        to="/awards?from=4#codewithai-section"
                        onClick={() => {
                          setSelected(null);
                          setTimeout(() => {
                            const element = document.getElementById('codewithai-section');
                            if (element) {
                              const isMobile = window.innerWidth < 768;
                              const offset = isMobile ? 120 : 40;
                              const scrollTo = element.getBoundingClientRect().top + window.pageYOffset - offset;
                              window.scrollTo({ top: scrollTo, behavior: 'smooth' });
                            }
                          }, 1000);
                        }}
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-darkPink rounded-lg hover:bg-pink-600 transition-colors duration-200"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        View Pics
                      </Link>
                    )}
                    {projects[selected].title === "NTU PEAK Leadership Program" && (
                      <Link
                        to="/awards?from=5#peak-section"
                        onClick={() => {
                          setSelected(null);
                          setTimeout(() => {
                            const element = document.getElementById('peak-section');
                            if (element) {
                              const isMobile = window.innerWidth < 768;
                              const offset = isMobile ? 120 : 40;
                              const scrollTo = element.getBoundingClientRect().top + window.pageYOffset - offset;
                              window.scrollTo({ top: scrollTo, behavior: 'smooth' });
                            }
                          }, 1000);
                        }}
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-darkPink rounded-lg hover:bg-pink-600 transition-colors duration-200"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        View Pics
                      </Link>
                    )}
                    {projects[selected].title === "Surgical Gauze Detection using Computer Vision" && (
                      <Link
                        to="/awards?from=0#gauze-section"
                        onClick={() => {
                          setSelected(null);
                          setTimeout(() => {
                            const element = document.getElementById('gauze-section');
                            if (element) {
                              const isMobile = window.innerWidth < 768;
                              const offset = isMobile ? 120 : 40;
                              const scrollTo = element.getBoundingClientRect().top + window.pageYOffset - offset;
                              window.scrollTo({ top: scrollTo, behavior: 'smooth' });
                            }
                          }, 1000);
                        }}
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-darkPink rounded-lg hover:bg-pink-600 transition-colors duration-200"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        View Pics
                      </Link>
                    )}
                    {projects[selected].live && (
                      <a
                        href={projects[selected].live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-darkPink bg-pink-50 rounded-lg hover:bg-pink-100 transition-colors duration-200"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Projects; 