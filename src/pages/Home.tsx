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
    <section className="min-h-screen flex flex-col items-center py-[max(10vh,6rem)] px-[5%] laptop:py-[max(12vh,8rem)] laptop:px-[8%] overflow-hidden relative">
      {/* Background blobs using relative positioning and viewport units */}
      <div className="absolute top-[-10vh] left-[-5vw] w-[40vw] max-w-[30rem] aspect-square bg-darkPink/10 rounded-full filter blur-3xl z-0 laptop:w-[35vw] laptop:max-w-[35rem] laptop:blur-[80px]" />
      <div className="absolute top-1/2 left-0 w-[30vw] max-w-[25rem] aspect-square bg-darkPink/20 rounded-full filter blur-2xl z-0 laptop:w-[25vw] laptop:max-w-[30rem] laptop:blur-[60px]" />
      <div className="absolute bottom-0 right-0 w-[35vw] max-w-[35rem] aspect-square bg-darkPink/10 rounded-full filter blur-3xl z-0 laptop:w-[30vw] laptop:max-w-[40rem] laptop:blur-[80px]" />
      <div className="absolute top-0 right-1/3 w-[25vw] max-w-[20rem] aspect-square bg-darkPink/10 rounded-full filter blur-2xl z-0 laptop:w-[20vw] laptop:max-w-[25rem] laptop:blur-[60px]" />

      <div className="w-full max-w-[90rem] mx-auto relative z-10 laptop:max-w-[120rem] xl:max-w-[140rem] 2xl:max-w-[160rem]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[5vw] items-center laptop:gap-[3vw] xl:gap-[4vw]">
          {/* Profile Image Container with fluid dimensions */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative flex justify-center lg:justify-start order-1"
          >
            <div className="w-[min(80vw,25rem)] aspect-square lg:w-[min(40vw,30rem)] lg:aspect-[3/4] rounded-full overflow-hidden border-[min(0.5vw,0.25rem)] border-darkPink shadow-xl laptop:w-[min(35vw,35rem)] laptop:aspect-[3/4] laptop:border-[min(0.4vw,0.3rem)] xl:w-[min(30vw,40rem)] 2xl:w-[min(28vw,45rem)]">
              <img
                src={profileImage}
                alt="Krish Saraf"
                className="w-full h-full object-cover object-[center_top]"
                srcSet={`${profileImage} 1x, ${profileImage} 2x`}
                sizes="(min-width: 1536px) 45rem, (min-width: 1280px) 40rem, (min-width: 1024px) 35rem, (min-width: 992px) 30rem, 25rem"
              />
            </div>
          </motion.div>

          {/* Content Container with fluid typography */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center lg:text-center order-2 flex flex-col items-center lg:items-center laptop:items-start laptop:text-left"
          >
            <h1 className="text-[clamp(1.75rem,5vw,3.5rem)] font-extrabold text-darkPink mb-[min(4vh,2rem)] mt-[min(4vh,2rem)] leading-tight text-center laptop:text-[clamp(2.5rem,4vw,4.5rem)] laptop:text-left laptop:mb-[min(5vh,3rem)] laptop:mt-[min(3vh,1.5rem)] xl:text-[clamp(3rem,4vw,5rem)]">
              Hi, I'm <strong>Krish Saraf</strong>
            </h1>
            <p className="text-darkPink/70 text-[clamp(1rem,2vw,1.125rem)] mb-[min(6vh,3rem)] w-full max-w-[50ch] leading-relaxed laptop:text-[clamp(1.1rem,1.5vw,1.3rem)] laptop:mb-[min(7vh,3.5rem)] laptop:max-w-[60ch] xl:text-[clamp(1.2rem,1.5vw,1.4rem)]">
              Currently pursuing Economics & Data Science at NTU, I've engineered tools, deployed scalable backend systems, and built investment algorithms that outperform benchmarks. 
              <br />
              <br />
              From winning 5 Hackathons to being a Dean's Lister- I combine deep technical skill with sharp product sense
              <br />
              <br />
              Explore my work below — I build fast, think deep, and execute smarter.
            </p>

            {/* Button Container with fluid spacing */}
            <div className="flex flex-col sm:flex-row gap-[min(3vw,1rem)] mb-[min(6vh,3rem)] w-full laptop:gap-[min(2vw,1.5rem)] laptop:mb-[min(8vh,4rem)]">
              <Link to="/projects" className="no-underline w-full sm:w-1/2 laptop:max-w-[280px] xl:max-w-[320px]">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-darkPink text-white px-[min(4vw,1.5rem)] py-[min(2vh,0.75rem)] rounded-md font-medium hover:bg-darkPink/90 transition-colors duration-300 w-full text-center text-[clamp(0.875rem,1.5vw,1rem)] laptop:px-[min(3vw,2rem)] laptop:py-[min(1.5vh,1rem)] laptop:text-[clamp(1rem,1vw,1.25rem)] laptop:rounded-lg"
                >
                  Check out my work!
                </motion.button>
              </Link>
              
              <Link to="/contact" className="no-underline w-full sm:w-1/2 laptop:max-w-[280px] xl:max-w-[320px]">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-darkPink text-white px-[min(4vw,1.5rem)] py-[min(2vh,0.75rem)] rounded-md font-medium hover:bg-darkPink/90 transition-colors duration-300 w-full text-center text-[clamp(0.875rem,1.5vw,1rem)] laptop:px-[min(3vw,2rem)] laptop:py-[min(1.5vh,1rem)] laptop:text-[clamp(1rem,1vw,1.25rem)] laptop:rounded-lg"
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
              className="w-full mt-[min(3vh,1.5rem)] laptop:mt-[min(4vh,2rem)]"
            >
              <h3 className="text-[clamp(1.125rem,3vw,1.5rem)] font-bold text-darkPink mb-[min(4vh,2rem)] text-center laptop:text-[clamp(1.25rem,2vw,1.75rem)] laptop:text-left laptop:mb-[min(5vh,2.5rem)]">
                Companies I have worked with
              </h3>
              
              {/* Single responsive logo grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-8 gap-y-10 laptop:grid-cols-4 laptop:gap-x-12 laptop:gap-y-12 xl:grid-cols-7">
                {companyLogos.map((logo, index) => (
                  <motion.div
                    key={logo.alt}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                    className="flex items-center justify-center h-[60px] laptop:h-[70px] xl:h-[80px]"
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