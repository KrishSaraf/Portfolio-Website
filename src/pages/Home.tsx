import { motion } from 'framer-motion';
import profileImage from '../assets/Titopic.jpeg';
import { Link } from 'react-router-dom';

const Home = () => {
  const companyLogos = [
    { src: "/logos/uob-logo.png", alt: "United Overseas Bank" },
    { src: "/logos/keppel-logo.png", alt: "Keppel Limited" },
    { src: "/logos/basf-logo.png", alt: "BASF Singapore" },
    { src: "/logos/fab-logo.png", alt: "First Abu Dhabi Bank" },
    { src: "/logos/techexactly-logo.png", alt: "Tech Exactly" },
    { src: "/logos/tdm-logo.png", alt: "Think Design Make" },
    { src: "/logos/sgh-logo.png", alt: "SGH" },
  ];

  // Split logos into two rows for better display
  const firstRowLogos = companyLogos.slice(0, 4);
  const secondRowLogos = companyLogos.slice(4);

  return (
    <section className="min-h-screen flex flex-col items-center py-6 sm:py-10 md:py-16 lg:py-20 px-4 sm:px-6 md:px-8 overflow-hidden relative">
      {/* Background gradients */}
      <div className="absolute -top-32 -left-32 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-darkPink/10 rounded-full filter blur-3xl z-0" />
      <div className="absolute top-1/2 left-0 w-56 sm:w-64 md:w-72 h-56 sm:h-64 md:h-72 bg-darkPink/20 rounded-full filter blur-2xl z-0" />
      <div className="absolute bottom-0 right-0 w-72 sm:w-96 md:w-[400px] lg:w-[500px] h-64 sm:h-80 md:h-[400px] bg-darkPink/10 rounded-full filter blur-3xl z-0" />
      <div className="absolute top-0 right-1/3 w-48 sm:w-56 md:w-60 h-48 sm:h-56 md:h-60 bg-darkPink/10 rounded-full filter blur-2xl z-0" />

      <div className="container mx-auto relative z-10 w-full max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10 md:gap-16 items-center">
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative flex justify-center order-1 mx-auto lg:mx-0 w-full"
          >
            <div className="w-[min(100%,320px)] h-[min(100vw,320px)] sm:w-[min(100%,380px)] sm:h-[min(100vw,380px)] md:w-[min(100%,400px)] md:h-[min(100vw,400px)] lg:w-[min(100%,450px)] lg:h-[min(40vw,550px)] rounded-full overflow-hidden border-4 border-darkPink shadow-xl">
              <img
                src={profileImage}
                alt="Krish Saraf"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
          
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center lg:text-center order-2 flex flex-col items-center w-full"
          >
            <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-darkPink mb-4 mt-4 md:mt-6 lg:mt-0 leading-tight text-center">
              Hi, I'm <strong>Krish Saraf</strong>
            </h1>
            <p className="text-darkPink/70 text-[clamp(0.9rem,1.5vw,1.1rem)] mb-6 max-w-xl lg:max-w-2xl leading-relaxed">
              Currently pursuing Economics & Data Science at NTU, I've engineered tools, deployed scalable backend systems, and built investment algorithms that outperform benchmarks. 
              <br /><br />
              From winning 5 Hackathons to being a Dean's Lister- I combine deep technical skill with sharp product sense
              <br /><br />
              Explore my work below — I build fast, think deep, and execute smarter.
            </p>
            
            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6 w-full max-w-xl mx-auto">
              <Link to="/projects" className="no-underline w-full sm:w-1/2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-darkPink text-white px-6 py-3 rounded-md font-medium hover:bg-darkPink/90 transition-colors duration-300 w-full text-center"
                >
                  Check out my work!
                </motion.button>
              </Link>
              
              <Link to="/contact" className="no-underline w-full sm:w-1/2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-darkPink text-white px-6 py-3 rounded-md font-medium hover:bg-darkPink/90 transition-colors duration-300 w-full text-center"
                >
                  Get in touch
                </motion.button>
              </Link>
            </div>
            
            {/* Company Logos */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="w-full mt-6"
            >
              <h3 className="text-[clamp(1.1rem,2vw,1.5rem)] font-bold text-darkPink mb-4 text-center">
                Companies I have worked with
              </h3>
              
              {/* First row of logos */}
              <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 mb-1">
                {firstRowLogos.map((logo, index) => (
                  <motion.div
                    key={logo.alt}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                    className="w-24 h-12 sm:w-28 md:w-32 sm:h-16 md:h-20 flex items-center justify-center"
                  >
                    <img 
                      src={logo.src} 
                      alt={logo.alt} 
                      className="max-w-full max-h-full object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
                    />
                  </motion.div>
                ))}
              </div>
              
              {/* Second row of logos */}
              <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6">
                {secondRowLogos.map((logo, index) => (
                  <motion.div
                    key={logo.alt}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                    className="w-32 h-16 sm:w-36 md:w-40 sm:h-20 md:h-24 flex items-center justify-center"
                  >
                    <img 
                      src={logo.src} 
                      alt={logo.alt} 
                      className="max-w-full max-h-full object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Home; 