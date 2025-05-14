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
    <section className="min-h-screen flex flex-col items-center pt-20 pb-10 px-4 md:px-8 overflow-hidden relative">
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-darkPink/10 rounded-full filter blur-3xl z-0" />
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-darkPink/20 rounded-full filter blur-2xl z-0" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[400px] bg-darkPink/10 rounded-full filter blur-3xl z-0" />
      <div className="absolute top-0 right-1/3 w-60 h-60 bg-darkPink/10 rounded-full filter blur-2xl z-0" />

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative flex justify-center md:justify-start order-1 md:order-1"
          >
            <div className="md:absolute md:left-[-50px] lg:left-[+50px] md:top-[-230px] w-100 h-100 md:w-[400px] md:h-[600px] rounded-full overflow-hidden border-4 border-darkPink shadow-xl">
              <img
                src={profileImage}
                alt="Krish Saraf"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Companies I have worked with - next to image */}
            <div className="absolute bottom-[-60px] left-[50px] right-0 md:bottom-[30px] md:left-[120px]">
              <h2 className="text-xl md:text-2xl font-bold text-darkPink whitespace-nowrap">
                Companies I have worked with
              </h2>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center md:text-left order-2 md:order-2 flex flex-col items-center md:items-start"
          >
            <h1 className="text-3xl md:text-5xl font-extrabold text-darkPink mb-4 leading-tight md:leading-tight">
              Hi, I'm Krish Saraf
            </h1>
            <p className="text-darkPink/70 text-base md:text-lg mb-6 max-w-xl md:max-w-2xl leading-relaxed">
              A technologist and strategist obsessed with building intelligent AI systems that solve real-world problems. Currently pursuing Economics & Data Science at NTU, I've engineered tools, deployed scalable backend systems, and built investment algorithms that outperform benchmarks. 
              <br />
              <br />
              From winning 5 Hackathons to being a Dean's Lister- having worked across seven organisations, I combine deep technical skill with sharp product sense — always shipping, always iterating.
              <br />
              <br />
              Explore my work below — I build fast, think deep, and execute smarter.
            </p>
            <Link to="/projects" className="no-underline mb-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-darkPink text-white px-8 py-3 rounded-md font-medium hover:bg-darkPink/90 transition-colors duration-300 mt-2 w-full"
              >
                Check out my work!
              </motion.button>
            </Link>
          </motion.div>
        </div>

        {/* Company logos only (no heading) */}
        <div className="flex flex-col md:flex-row mt-12 md:mt-8">
          <div className="w-full">
            {/* First row of logos */}
            <div className="flex justify-center md:justify-start items-center gap-4 md:gap-8 mb-4">
              {firstRowLogos.map((logo, index) => (
                <motion.div
                  key={logo.alt}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                  className="w-20 h-12 md:w-24 md:h-16 flex items-center justify-center"
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
            <div className="flex justify-center md:justify-start items-center gap-4 md:gap-8">
              {secondRowLogos.map((logo, index) => (
                <motion.div
                  key={logo.alt}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                  className="w-20 h-12 md:w-24 md:h-16 flex items-center justify-center"
                >
                  <img 
                    src={logo.src} 
                    alt={logo.alt} 
                    className="max-w-full max-h-full object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home; 