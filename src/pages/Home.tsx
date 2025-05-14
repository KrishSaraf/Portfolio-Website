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
    <section className="min-h-screen flex flex-col items-center py-[5vh] px-[5%] overflow-hidden relative">
      {/* Background gradients using relative units */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] aspect-square bg-darkPink/10 rounded-full filter blur-3xl z-0" />
      <div className="absolute top-1/2 left-0 w-[30%] aspect-square bg-darkPink/20 rounded-full filter blur-2xl z-0" />
      <div className="absolute bottom-0 right-0 w-[40%] aspect-square bg-darkPink/10 rounded-full filter blur-3xl z-0" />
      <div className="absolute top-0 right-1/3 w-[25%] aspect-square bg-darkPink/10 rounded-full filter blur-2xl z-0" />

      <div className="w-full max-w-[90rem] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr,1.2fr] gap-[5%] items-center">
          {/* Image container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative flex justify-center lg:justify-start order-1"
          >
            <div className="w-[min(80vw,25rem)] aspect-square lg:w-[min(40vw,28rem)] lg:aspect-[2/3] rounded-full overflow-hidden border-[0.25rem] border-darkPink shadow-xl mx-auto lg:mx-0">
              <img
                src={profileImage}
                alt="Krish Saraf"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
          
          {/* Content container */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center lg:text-center order-2 flex flex-col items-center lg:items-center"
          >
            <h1 className="font-extrabold text-darkPink mb-[0.5em] mt-[0.75em] leading-tight text-center" 
                style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
              Hi, I'm <strong>Krish Saraf</strong>
            </h1>
            <p className="text-darkPink/70 mb-[1.5em] max-w-[90%] leading-relaxed"
               style={{ fontSize: "clamp(1rem, 2vw, 1.125rem)" }}>
              Currently pursuing Economics & Data Science at NTU, I've engineered tools, deployed scalable backend systems, and built investment algorithms that outperform benchmarks. 
              <br />
              <br />
              From winning 5 Hackathons to being a Dean's Lister- I combine deep technical skill with sharp product sense
              <br />
              <br />
              Explore my work below — I build fast, think deep, and execute smarter.
            </p>
            
            {/* Buttons container */}
            <div className="flex flex-col sm:flex-row gap-[clamp(0.5rem,2vw,1rem)] mb-[clamp(1.5rem,4vh,2.5rem)] w-full">
              <Link to="/projects" className="no-underline w-full sm:w-1/2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-darkPink text-white px-[clamp(1rem,3vw,1.5rem)] py-[clamp(0.5rem,1.5vh,0.75rem)] rounded-md font-medium hover:bg-darkPink/90 transition-colors duration-300 w-full text-center"
                  style={{ fontSize: "clamp(0.9rem, 1.5vw, 1rem)" }}
                >
                  Check out my work!
                </motion.button>
              </Link>
              
              <Link to="/contact" className="no-underline w-full sm:w-1/2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-darkPink text-white px-[clamp(1rem,3vw,1.5rem)] py-[clamp(0.5rem,1.5vh,0.75rem)] rounded-md font-medium hover:bg-darkPink/90 transition-colors duration-300 w-full text-center"
                  style={{ fontSize: "clamp(0.9rem, 1.5vw, 1rem)" }}
                >
                  Get in touch
                </motion.button>
              </Link>
            </div>
            
            {/* Company logos section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="w-full mt-[clamp(1rem,3vh,2rem)]"
            >
              <h3 className="font-bold text-darkPink mb-[clamp(1rem,3vh,1.5rem)] text-center"
                  style={{ fontSize: "clamp(1.125rem, 2.5vw, 1.25rem)" }}>
                Companies I have worked with
              </h3>
              
              {/* Responsive logo grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-[clamp(0.5rem,3vw,1.5rem)] gap-y-[clamp(0.5rem,2vh,1rem)]">
                {companyLogos.map((logo, index) => (
                  <motion.div
                    key={logo.alt}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                    className="aspect-[3/2] flex items-center justify-center p-[5%]"
                  >
                    <img 
                      src={logo.src} 
                      alt={logo.alt}
                      className="max-w-full max-h-full w-auto h-auto object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
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