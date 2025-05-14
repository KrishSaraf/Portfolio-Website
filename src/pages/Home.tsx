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
    <section className="min-h-screen flex flex-col items-center pt-16 sm:pt-20 pb-10 px-4 sm:px-6 lg:px-8 overflow-hidden relative">
      <div className="absolute -top-[10vw] -left-[10vw] w-[30vw] h-[30vw] max-w-[400px] max-h-[400px] bg-darkPink/10 rounded-full filter blur-3xl z-0" />
      <div className="absolute top-1/2 left-0 w-[25vw] h-[25vw] max-w-[300px] max-h-[300px] bg-darkPink/20 rounded-full filter blur-2xl z-0" />
      <div className="absolute bottom-0 right-0 w-[35vw] h-[30vw] max-w-[500px] max-h-[400px] bg-darkPink/10 rounded-full filter blur-3xl z-0" />
      <div className="absolute top-0 right-1/3 w-[20vw] h-[20vw] max-w-[240px] max-h-[240px] bg-darkPink/10 rounded-full filter blur-2xl z-0" />

      <div className="container mx-auto relative z-10 w-full max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative flex justify-center order-1 w-full"
          >
            <div className="w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] md:w-[380px] md:h-[380px] lg:w-[400px] lg:h-[400px] xl:w-[450px] xl:h-[450px] rounded-full overflow-hidden border-4 border-darkPink shadow-xl mx-auto">
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
            className="text-center lg:text-center order-2 flex flex-col items-center lg:items-center w-full px-4 sm:px-6"
          >
            <h1 className="text-[2rem] sm:text-[2.5rem] md:text-[3rem] lg:text-[3.25rem] font-extrabold text-darkPink mb-4 sm:mb-6 leading-tight text-center">
              Hi, I'm <strong>Krish Saraf</strong>
            </h1>
            
            <p className="text-darkPink/70 text-[1rem] sm:text-[1.125rem] md:text-[1.2rem] mb-6 max-w-xl md:max-w-2xl lg:max-w-3xl leading-relaxed">
              Currently pursuing Economics & Data Science at NTU, I've engineered tools, deployed scalable backend systems, and built investment algorithms that outperform benchmarks. 
              <br />
              <br />
              From winning 5 Hackathons to being a Dean's Lister- I combine deep technical skill with sharp product sense
              <br />
              <br />
              Explore my work below — I build fast, think deep, and execute smarter.
            </p>
            
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
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="w-full mt-6"
            >
              <h3 className="text-xl sm:text-2xl font-bold text-darkPink mb-6 text-center">
                Companies I have worked with
              </h3>
              
              <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 mb-1">
                {firstRowLogos.map((logo, index) => (
                  <motion.div
                    key={logo.alt}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                    className="w-[80px] h-[40px] sm:w-[100px] sm:h-[50px] md:w-[120px] md:h-[60px] lg:w-[130px] lg:h-[65px] flex items-center justify-center"
                  >
                    <img 
                      src={logo.src} 
                      alt={logo.alt} 
                      className="max-w-full max-h-full object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
                    />
                  </motion.div>
                ))}
              </div>
              
              <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6">
                {secondRowLogos.map((logo, index) => (
                  <motion.div
                    key={logo.alt}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                    className="w-[90px] h-[45px] sm:w-[110px] sm:h-[55px] md:w-[130px] md:h-[65px] lg:w-[140px] lg:h-[70px] flex items-center justify-center"
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