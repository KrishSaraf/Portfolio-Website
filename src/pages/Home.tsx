import { motion } from 'framer-motion';
import profileImage from '../assets/Titopic.jpeg';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Home = () => {
  // State to track viewport dimensions for truly responsive design
  const [viewport, setViewport] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  // Update viewport dimensions on resize
  useEffect(() => {
    const handleResize = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const companyLogos = [
    { src: "/logos/uob-logo.png", alt: "United Overseas Bank" },
    { src: "/logos/keppel-logo.png", alt: "Keppel Limited" },
    { src: "/logos/basf-logo.png", alt: "BASF Singapore" },
    { src: "/logos/fab-logo.png", alt: "First Abu Dhabi Bank" },
    { src: "/logos/techexactly-logo.png", alt: "Tech Exactly" },
    { src: "/logos/tdm-logo.png", alt: "Think Design Make" },
    { src: "/logos/sgh-logo.png", alt: "SGH" },
  ];

  // Dynamically split logos based on viewport width
  const logoSplit = viewport.width < 768 ? 3 : 4;
  const firstRowLogos = companyLogos.slice(0, logoSplit);
  const secondRowLogos = companyLogos.slice(logoSplit);

  // Fluid scale factor based on viewport size
  const scaleFactor = Math.min(1, viewport.width / 1440);
  
  // Responsive styles applied directly
  const styles = {
    // Dynamic CSS variables
    heroHeight: `calc(100vh - ${Math.min(80, viewport.width * 0.05)}px)`,
    bgBlobSize: `${Math.max(30, viewport.width * 0.25)}px`,
    headingSize: `calc(${Math.min(3.5, Math.max(1.75, viewport.width * 0.004))}rem)`,
    paragraphSize: `calc(${Math.min(1.125, Math.max(1, viewport.width * 0.002))}rem)`,
    buttonPadding: `${Math.min(24, Math.max(12, viewport.width * 0.015))}px ${Math.min(32, Math.max(16, viewport.width * 0.02))}px`,
    imageSize: viewport.width < 1024 
      ? `min(70vw, 400px)` 
      : `min(40vw, 500px)`,
    imageAspect: viewport.width < 1024 ? '1/1' : '2/3',
    contentMaxWidth: `min(90%, ${Math.min(600, viewport.width * 0.8)}px)`,
    logoSize: `min(${Math.min(120, viewport.width * 0.08)}px, 20vw)`
  };

  return (
    <section 
      className="relative overflow-hidden flex flex-col items-center justify-center" 
      style={{ minHeight: styles.heroHeight, padding: `${5 * scaleFactor}vh ${5 * scaleFactor}vw` }}
    >
      {/* Fully responsive background blobs */}
      <div className="absolute opacity-10 bg-darkPink rounded-full blur-3xl" 
        style={{ top: '-10vh', left: '-5vw', width: styles.bgBlobSize, height: styles.bgBlobSize }} />
      <div className="absolute opacity-20 bg-darkPink rounded-full blur-2xl" 
        style={{ top: '50%', left: '0', width: styles.bgBlobSize, height: styles.bgBlobSize }} />
      <div className="absolute opacity-10 bg-darkPink rounded-full blur-3xl" 
        style={{ bottom: '0', right: '0', width: styles.bgBlobSize, height: styles.bgBlobSize }} />
      <div className="absolute opacity-10 bg-darkPink rounded-full blur-2xl" 
        style={{ top: '0', right: '33%', width: styles.bgBlobSize, height: styles.bgBlobSize }} />

      <div className="w-full relative z-10" style={{ maxWidth: `min(1800px, 98%)` }}>
        <div 
          className="grid items-center gap-4" 
          style={{ 
            gridTemplateColumns: viewport.width < 1024 ? '1fr' : '1fr 1fr',
            gap: `${Math.min(40, viewport.width * 0.03)}px`
          }}
        >
          {/* Dynamically sized profile image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-center"
            style={{ order: viewport.width < 1024 ? 1 : 1 }}
          >
            <div 
              className="rounded-full overflow-hidden border-darkPink shadow-xl"
              style={{ 
                width: styles.imageSize, 
                height: "auto", 
                aspectRatio: styles.imageAspect,
                borderWidth: `min(0.5vw, 4px)`
              }}
            >
              <img
                src={profileImage}
                alt="Krish Saraf"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Dynamically sized content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center text-center"
            style={{ 
              order: viewport.width < 1024 ? 2 : 2,
              maxWidth: styles.contentMaxWidth,
              margin: viewport.width < 1024 ? '0 auto' : 'inherit'
            }}
          >
            <h1 
              className="font-extrabold text-darkPink text-center"
              style={{ 
                fontSize: styles.headingSize,
                marginBottom: `${Math.min(32, viewport.width * 0.02)}px`,
                marginTop: `${Math.min(32, viewport.width * 0.02)}px`,
                lineHeight: 1.2
              }}
            >
              Hi, I'm <strong>Krish Saraf</strong>
            </h1>
            <p 
              className="text-darkPink/70 leading-relaxed"
              style={{ 
                fontSize: styles.paragraphSize,
                marginBottom: `${Math.min(48, viewport.width * 0.03)}px`,
                maxWidth: '100%',
                lineHeight: 1.6
              }}
            >
              Currently pursuing Economics & Data Science at NTU, I've engineered tools, deployed scalable backend systems, and built investment algorithms that outperform benchmarks. 
              <br />
              <br />
              From winning 5 Hackathons to being a Dean's Lister- I combine deep technical skill with sharp product sense
              <br />
              <br />
              Explore my work below — I build fast, think deep, and execute smarter.
            </p>

            {/* Buttons with dynamic sizing */}
            <div 
              className="flex w-full" 
              style={{ 
                flexDirection: viewport.width < 640 ? 'column' : 'row',
                gap: `${Math.min(16, viewport.width * 0.015)}px`,
                marginBottom: `${Math.min(48, viewport.width * 0.03)}px`
              }}
            >
              <Link 
                to="/projects" 
                className="no-underline" 
                style={{ width: viewport.width < 640 ? '100%' : '50%' }}
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-darkPink text-white rounded-md font-medium hover:bg-darkPink/90 transition-colors duration-300 w-full text-center"
                  style={{ 
                    padding: styles.buttonPadding,
                    fontSize: `calc(${Math.min(1, Math.max(0.875, viewport.width * 0.0008))}rem)`
                  }}
                >
                  Check out my work!
                </motion.button>
              </Link>
              
              <Link 
                to="/contact" 
                className="no-underline" 
                style={{ width: viewport.width < 640 ? '100%' : '50%' }}
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-darkPink text-white rounded-md font-medium hover:bg-darkPink/90 transition-colors duration-300 w-full text-center"
                  style={{ 
                    padding: styles.buttonPadding,
                    fontSize: `calc(${Math.min(1, Math.max(0.875, viewport.width * 0.0008))}rem)`
                  }}
                >
                  Get in touch
                </motion.button>
              </Link>
            </div>
            
            {/* Company logos with dynamic layout */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="w-full"
              style={{ marginTop: `${Math.min(24, viewport.width * 0.02)}px` }}
            >
              <h3 
                className="font-bold text-darkPink text-center"
                style={{ 
                  fontSize: `calc(${Math.min(1.5, Math.max(1.125, viewport.width * 0.0012))}rem)`,
                  marginBottom: `${Math.min(32, viewport.width * 0.02)}px`
                }}
              >
                Companies I have worked with
              </h3>
              
              {/* Logo grid that adapts to screen size */}
              <div 
                className="grid items-center justify-items-center"
                style={{ 
                  gridTemplateColumns: `repeat(${Math.min(4, Math.max(2, Math.floor(viewport.width / 200)))}, 1fr)`,
                  gap: `${Math.min(24, viewport.width * 0.015)}px`,
                  marginBottom: `${Math.min(16, viewport.width * 0.01)}px`
                }}
              >
                {firstRowLogos.map((logo, index) => (
                  <motion.div
                    key={logo.alt}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                    className="flex items-center justify-center"
                    style={{ 
                      width: styles.logoSize,
                      height: 'auto',
                      aspectRatio: '3/2',
                      padding: `${Math.min(12, viewport.width * 0.01)}px`
                    }}
                  >
                    <img 
                      src={logo.src} 
                      alt={logo.alt} 
                      className="max-w-full max-h-full object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
                    />
                  </motion.div>
                ))}
              </div>
              
              {/* Second row with dynamic column count */}
              <div 
                className="grid items-center justify-items-center"
                style={{ 
                  gridTemplateColumns: `repeat(${Math.min(3, Math.max(2, Math.floor(viewport.width / 250)))}, 1fr)`,
                  gap: `${Math.min(24, viewport.width * 0.015)}px`
                }}
              >
                {secondRowLogos.map((logo, index) => (
                  <motion.div
                    key={logo.alt}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                    className="flex items-center justify-center"
                    style={{ 
                      width: styles.logoSize,
                      height: 'auto',
                      aspectRatio: '3/2',
                      padding: `${Math.min(12, viewport.width * 0.01)}px`
                    }}
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