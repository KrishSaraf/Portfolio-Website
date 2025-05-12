import { motion } from 'framer-motion';
import profileImage from '../assets/Titopic.jpeg';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    
    <section className=" min-h-screen flex items-center justify-center section-padding overflow-hidden">
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-darkPink/10 rounded-full filter blur-3xl z-0" />
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-darkPink/20 rounded-full filter blur-2xl z-0" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[400px] bg-darkPink/10 rounded-full filter blur-3xl z-0" />
      <div className="absolute top-0 right-1/3 w-60 h-60 bg-darkPink/10 rounded-full filter blur-2xl z-0" />

      {/* Blurred background shapes */}

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative flex justify-center md:justify-start order-1 md:order-1"
          >
            <div className="md:absolute md:left-[-50px] lg:left-[+50px] md:top-[-250px] w-100 h-100 md:w-[400px] md:h-[600px] rounded-full overflow-hidden border-4 border-darkPink shadow-xl">
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
            className="text-center md:text-left order-2 md:order-2 flex flex-col items-center md:items-start"
          >
            <h1 className="text-3xl md:text-5xl font-extrabold text-darkPink mb-4 leading-tight md:leading-tight">
              Hi, I'm  Krish Saraf
            </h1>
            <p className="text-darkPink/70 text-base md:text-lg mb-8 max-w-xl md:max-w-2xl leading-relaxed">
              {/* A passionate Software Developer with a strong focus on AI, Automation, and Scalable Systems. With a First-Class Honours in Computer Engineering from NTU and proven expertise in building robust solutions at PSA Singapore, I've automated complex workflows, driven innovation, and won multiple hackathons.<br /><br />
              Explore my work below, and let's connect. */}
              A technologist and strategist obsessed with building intelligent AI systems that solve real-world problems. Currently pursuing Economics & Data Science at NTU, I've engineered  tools, deployed scalable backend systems, and built investment algorithms that outperform benchmarks. 
              <br />
              <br />
              From winning 5 Hackathons to being a Dean's Lister- having worked across seven organisations, I combine deep technical skill with sharp product sense — always shipping, always iterating.
              <br />
              <br />
              Explore my work below — I build fast, think deep, and execute smarter.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-darkPink text-white px-8 py-3 rounded-md font-medium hover:bg-darkPink/90 transition-colors duration-300 mt-2"
            >
              <Link to="/projects" className="text-white no-underline">
                Check out my work!
              </Link>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Home; 