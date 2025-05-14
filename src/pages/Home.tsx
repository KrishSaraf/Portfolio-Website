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
    <section className="min-h-screen flex flex-col items-center py-[max(10vh,6rem)] px-[5%] overflow-hidden relative">
      {/* Background blobs using relative positioning and viewport units */}
      <div className="absolute top-[-10vh] left-[-5vw] w-[40vw] max-w-[30rem] aspect-square bg-darkPink/10 rounded-full filter blur-3xl z-0" />
      <div className="absolute top-1/2 left-0 w-[30vw] max-w-[25rem] aspect-square bg-darkPink/20 rounded-full filter blur-2xl z-0" />
      <div className="absolute bottom-0 right-0 w-[35vw] max-w-[35rem] aspect-square bg-darkPink/10 rounded-full filter blur-3xl z-0" />
      <div className="absolute top-0 right-1/3 w-[25vw] max-w-[20rem] aspect-square bg-darkPink/10 rounded-full filter blur-2xl z-0" />

      <div className="w-full max-w-[90rem] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[5vw] items-center">
          {/* Profile Image Container with fluid dimensions */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative flex justify-center lg:justify-start order-1"
          >
            <div className="w-[min(80vw,25rem)] aspect-square lg:w-[min(40vw,30rem)] lg:aspect-[3/4] rounded-full overflow-hidden border-[min(0.5vw,0.25rem)] border-darkPink shadow-xl">
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
            className="text-center lg:text-center order-2 flex flex-col items-center lg:items-center"
          >
            <h1 className="text-[clamp(1.75rem,5vw,3.5rem)] font-extrabold text-darkPink mb-[min(4vh,2rem)] mt-[min(4vh,2rem)] leading-tight text-center">
              Hi, I'm <strong>Krish Saraf</strong>
            </h1>
            <p className="text-darkPink/70 text-[clamp(1rem,2vw,1.125rem)] mb-[min(6vh,3rem)] w-full max-w-[50ch] leading-relaxed">
              Currently pursuing Economics & Data Science at NTU, I've engineered tools, deployed scalable backend systems, and built investment algorithms that outperform benchmarks. 
              <br />
              <br />
              From winning 5 Hackathons to being a Dean's Lister- I combine deep technical skill with sharp product sense
              <br />
              <br />
              Explore my work below — I build fast, think deep, and execute smarter.
            </p>

            {/* Button Container with fluid spacing */}
            <div className="flex flex-col sm:flex-row gap-[min(3vw,1rem)] mb-[min(6vh,3rem)] w-full">
              <Link to="/projects" className="no-underline w-full sm:w-1/2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-darkPink text-white px-[min(4vw,1.5rem)] py-[min(2vh,0.75rem)] rounded-md font-medium hover:bg-darkPink/90 transition-colors duration-300 w-full text-center text-[clamp(0.875rem,1.5vw,1rem)]"
                >
                  Check out my work!
                </motion.button>
              </Link>
              
              <Link to="/contact" className="no-underline w-full sm:w-1/2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-darkPink text-white px-[min(4vw,1.5rem)] py-[min(2vh,0.75rem)] rounded-md font-medium hover:bg-darkPink/90 transition-colors duration-300 w-full text-center text-[clamp(0.875rem,1.5vw,1rem)]"
                >
                  Get in touch
                </motion.button>
              </Link>
            </div>
            
            {/* Company Logos Section with fluid layout */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="w-full mt-[min(3vh,1.5rem)]"
            >
              <h3 className="text-[clamp(1.125rem,3vw,1.5rem)] font-bold text-darkPink mb-[min(4vh,2rem)] text-center">
                Companies I have worked with
              </h3>
              
              {/* Single responsive logo grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-8 gap-y-10">
                {companyLogos.map((logo, index) => (
                  <motion.div
                    key={logo.alt}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                    className="flex items-center justify-center"
                  >
                    <img 
                      src={logo.src} 
                      alt={logo.alt} 
                      className="max-h-full w-auto object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
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