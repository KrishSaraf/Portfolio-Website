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
    <section className="min-h-screen flex flex-col items-center pt-16 sm:pt-20 pb-10 overflow-hidden relative">
      {/* Background decorative elements */}
      <div className="absolute -top-32 -left-32 w-64 sm:w-96 h-64 sm:h-96 bg-darkPink/10 rounded-full filter blur-3xl z-0" />
      <div className="absolute top-1/2 left-0 w-56 sm:w-72 h-56 sm:h-72 bg-darkPink/20 rounded-full filter blur-2xl z-0" />
      <div className="absolute bottom-0 right-0 w-80 sm:w-[500px] h-64 sm:h-[400px] bg-darkPink/10 rounded-full filter blur-3xl z-0" />
      <div className="absolute top-0 right-1/3 w-40 sm:w-60 h-40 sm:h-60 bg-darkPink/10 rounded-full filter blur-2xl z-0" />

      <div className="responsive-container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative flex justify-center md:justify-start order-1 md:order-1"
          >
            {/* Profile image container */}
            <div className="relative w-64 h-64 xs:w-80 xs:h-80 sm:w-96 sm:h-96 md:absolute md:left-[-50px] lg:left-[+50px] md:top-[-100px] lg:top-[-200px] md:w-[320px] md:h-[500px] lg:w-[400px] lg:h-[600px] rounded-full overflow-hidden border-4 border-darkPink shadow-xl">
              <img
                src={profileImage}
                alt="Krish Saraf"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center md:text-center order-2 md:order-2 flex flex-col items-center md:items-center"
          >
            <h1 className="mt-4 md:mt-8 mb-4 text-center">
              Hi, I'm <strong>Krish Saraf</strong>
            </h1>
            
            <p className="text-darkPink/70 mb-6 max-w-xl lg:max-w-2xl">
              Currently pursuing Economics & Data Science at NTU, I've engineered tools, deployed scalable backend systems, and built investment algorithms that outperform benchmarks.
              <br className="hidden xs:block" />
              <br className="hidden xs:block" />
              From winning 5 Hackathons to being a Dean's Lister- I combine deep technical skill with sharp product sense
              <br className="hidden xs:block" />
              <br className="hidden xs:block" />
              Explore my work below — I build fast, think deep, and execute smarter.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-6 w-full">
              <Link to="/projects" className="no-underline w-full sm:w-1/2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-darkPink text-white px-4 sm:px-6 py-3 rounded-md font-medium hover:bg-darkPink/90 transition-colors duration-300 w-full text-center"
                >
                  Check out my work!
                </motion.button>
              </Link>
              
              <Link to="/contact" className="no-underline w-full sm:w-1/2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-darkPink text-white px-4 sm:px-6 py-3 rounded-md font-medium hover:bg-darkPink/90 transition-colors duration-300 w-full text-center"
                >
                  Get in touch
                </motion.button>
              </Link>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="w-full mt-6"
            >
              <h3 className="text-darkPink mb-6 text-center">
                Companies I have worked with
              </h3>
              
              {/* First row of logos */}
              <div className="flex flex-wrap justify-center items-center gap-4 xs:gap-6 sm:gap-8 mb-1">
                {firstRowLogos.map((logo, index) => (
                  <motion.div
                    key={logo.alt}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                    className="w-24 h-14 xs:w-28 xs:h-16 sm:w-32 sm:h-20 flex items-center justify-center"
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
              <div className="flex flex-wrap justify-center items-center gap-4 xs:gap-6 sm:gap-8">
                {secondRowLogos.map((logo, index) => (
                  <motion.div
                    key={logo.alt}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                    className="w-28 h-16 xs:w-36 xs:h-20 sm:w-40 sm:h-24 flex items-center justify-center"
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