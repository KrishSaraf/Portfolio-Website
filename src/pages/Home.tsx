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

  return (
    <section className="min-h-screen flex flex-col justify-start md:justify-center pt-6 md:pt-12 lg:pt-16 pb-8 px-4 sm:px-6 md:px-[5%] overflow-hidden relative">
      {/* Background blobs using relative positioning and viewport units */}
      <div className="absolute top-[-10vh] left-[-5vw] w-[40vw] max-w-[30rem] aspect-square bg-darkPink/10 rounded-full filter blur-3xl z-0" />
      <div className="absolute top-1/2 left-0 w-[30vw] max-w-[25rem] aspect-square bg-darkPink/20 rounded-full filter blur-2xl z-0" />
      <div className="absolute bottom-0 right-0 w-[35vw] max-w-[35rem] aspect-square bg-darkPink/10 rounded-full filter blur-3xl z-0" />
      <div className="absolute top-0 right-1/3 w-[25vw] max-w-[20rem] aspect-square bg-darkPink/10 rounded-full filter blur-2xl z-0" />

      <div className="w-full max-w-[90rem] mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center">
          {/* Profile Image Container - Always centered */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative flex justify-center order-1 lg:order-1 mx-auto"
          >
            <div className="w-[min(65vw,20rem)] aspect-square sm:w-[min(60vw,21rem)] md:w-[min(30vw,22rem)] lg:w-[min(35vw,26rem)] rounded-full overflow-hidden border-[min(0.4vw,0.2rem)] border-darkPink shadow-xl">
              <img
                src={profileImage}
                alt="Krish Saraf"
                className="w-full h-full object-cover object-[center_top]"
              />
            </div>
          </motion.div>

          {/* Content Container with fluid typography */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center md:text-left order-2 lg:order-2 flex flex-col items-center md:items-start mt-6 md:mt-0"
          >
            <h1 className="text-[clamp(1.75rem,4.5vw,3rem)] font-extrabold text-darkPink mb-3 leading-tight text-center md:text-left">
              Hi, I'm <strong>Krish Saraf</strong>
            </h1>
            <p className="text-darkPink/70 text-[clamp(0.95rem,1.7vw,1.1rem)] mb-3 sm:mb-4 w-full max-w-[50ch] leading-relaxed">
              Currently pursuing Economics & Data Science at NTU, in a nutshell, I'm versatile
            </p>
            <p className="text-darkPink/70 text-[clamp(0.95rem,1.7vw,1.1rem)] mb-3 sm:mb-4 w-full max-w-[50ch] leading-relaxed">
              From coming 1st to playing tennis at the Nationals - I do it all
            <p className="text-darkPink/70 text-[clamp(0.95rem,1.7vw,1.1rem)] mb-4 sm:mb-5 w-full max-w-[50ch] leading-relaxed">
              Explore my work below — I build fast, think deep, and execute smarter.
            </p>

            {/* Button Container with fluid spacing */}
            <div className="flex flex-col sm:flex-row gap-3 mb-5 w-full max-w-md">
              <Link to="/projects" className="no-underline w-full sm:w-1/2">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-darkPink text-white px-4 py-2 rounded-md font-medium hover:bg-darkPink/90 transition-colors duration-300 w-full text-center text-[clamp(0.875rem,1.4vw,1rem)]"
                >
                  Check out my work!
                </motion.button>
              </Link>
              
              <Link to="/contact" className="no-underline w-full sm:w-1/2">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-darkPink text-white px-4 py-2 rounded-md font-medium hover:bg-darkPink/90 transition-colors duration-300 w-full text-center text-[clamp(0.875rem,1.4vw,1rem)]"
                >
                  Get in touch
                </motion.button>
              </Link>
            </div>
            
            {/* Company Logos Section with consistent sizing */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="w-full mt-2 md:mt-4"
            >
              <h3 className="text-[clamp(1.125rem,2.5vw,1.4rem)] font-bold text-darkPink mb-3 md:mb-4 text-center md:text-left">
                Companies I have worked with
              </h3>
              
              {/* Uniform logo container grid */}
              <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 items-center justify-items-center">
                {companyLogos.map((logo, index) => (
                  <motion.div
                    key={logo.alt}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                    className="flex items-center justify-center w-full aspect-[3/2]"
                  >
                    <div className="w-full h-full flex items-center justify-center px-1 sm:px-2">
                      <img 
                        src={logo.src} 
                        alt={logo.alt} 
                        className={`${index >= 4 ? 'scale-110 max-w-[85%] sm:scale-125 sm:max-w-[80%] md:scale-110 md:max-w-[90%]' : 'max-w-full'} max-h-full object-contain opacity-90 hover:opacity-100 transition-opacity duration-300`}
                      />
                    </div>
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