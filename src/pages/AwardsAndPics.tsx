import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const AwardsAndPics = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const location = useLocation();
  
  // Parse URL parameters to check for event (only for scrolling)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const event = params.get('event');
    
    // Scroll to appropriate section if specified in URL
    if (event) {
      setTimeout(() => {
        const sectionId = event === 'synapse' ? 'synapse-section' : 
                         event === 'cleantech' ? 'cleantech-section' :
                         event === 'intuition' ? 'intuition-section' : null;
        if (sectionId) {
          const section = document.getElementById(sectionId);
          if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }, 500);
    }
  }, [location]);

  // Synapse hackathon images
  const synapseImages = [
    {
      image: "/gallery/1.jpeg", 
      caption: "Presenting our AI solution at IEEE NTU & NUS Synapse Hackathon",
      aspectRatio: "aspect-w-16 aspect-h-9",
    },
    {
      image: "/gallery/2.jpeg", 
      caption: "Team photo at Synapse Hackathon auditorium",
      aspectRatio: "aspect-w-4 aspect-h-3",
    },
    {
      image: "/gallery/3.jpeg", 
      caption: "Receiving award at Synapse Hackathon 2024",
      aspectRatio: "aspect-w-4 aspect-h-3",
    },
    {
      image: "/gallery/4.jpeg", 
      caption: "Final presentation at Synapse Hackathon",
      aspectRatio: "aspect-w-16 aspect-h-9",
    },
  ];

  // Clean Tech Challenge images
  const cleanTechImages = [
    {
      image: "/gallery/c1.jpeg", 
      caption: "Clean Tech Challenge 2024 - First Prize presentation",
      aspectRatio: "aspect-w-16 aspect-h-9",
    },
    {
      image: "/gallery/c2.jpeg", 
      caption: "Team photo at Clean Tech Challenge awards ceremony",
      aspectRatio: "aspect-w-4 aspect-h-3",
    },
    {
      image: "/gallery/c3.jpeg", 
      caption: "Explaining our sustainability model to judges",
      aspectRatio: "aspect-w-4 aspect-h-3",
    },
    {
      image: "/gallery/c4.jpeg", 
      caption: "Clean Tech Challenge 2023 - GreenCompass SG Demo",
      aspectRatio: "aspect-w-16 aspect-h-9",
    },
  ];

  // NTU IEEE Intuition Hackathon images
  const intuitionImages = [
    {
      image: "/gallery/t1.jpeg", 
      caption: "Our team at NTU IEEE Intuition Hackathon",
      aspectRatio: "aspect-w-16 aspect-h-9",
    },
    {
      image: "/gallery/t2.jpeg", 
      caption: "Demonstrating our project at NTU IEEE Intuition Hackathon",
      aspectRatio: "aspect-w-4 aspect-h-3",
    }
  ];

  const awards = [
    {
      title: "Outstanding Project Award",
      organization: "Tech Innovation Summit",
      year: "2023",
      description: "Recognized for exceptional work on AI-driven automation solutions.",
      image: "/awards/award1.jpg",
    },
    {
      title: "Data Science Excellence",
      organization: "Data Analytics Association",
      year: "2022",
      description: "Awarded for innovative time-series forecasting model implementation.",
      image: "/awards/award2.jpg",
    },
    {
      title: "Hackathon Winner",
      organization: "Global CodeFest",
      year: "2021",
      description: "First place in the annual 48-hour coding competition.",
      image: "/awards/award3.jpg",
    },
  ];

  // Extended gallery with more images and varied aspect ratios for masonry effect
  const gallery = [
    {
      image: "/gallery/image1.jpg",
      caption: "Speaking at Tech Conference 2023",
      aspectRatio: "aspect-w-3 aspect-h-4",
    },
    {
      image: "/gallery/image2.jpg",
      caption: "Team collaboration session",
      aspectRatio: "aspect-w-1 aspect-h-1",
    },
    {
      image: "/gallery/image3.jpg",
      caption: "Receiving Outstanding Project Award",
      aspectRatio: "aspect-w-4 aspect-h-3",
    },
    {
      image: "/gallery/image4.jpg",
      caption: "Data Science workshop",
      aspectRatio: "aspect-w-1 aspect-h-1",
    },
    {
      image: "/gallery/image1.jpg", // Placeholder - replace with actual image
      caption: "Company retreat 2023",
      aspectRatio: "aspect-w-3 aspect-h-2",
    },
    {
      image: "/gallery/image2.jpg", // Placeholder - replace with actual image
      caption: "Presenting at industry panel",
      aspectRatio: "aspect-w-1 aspect-h-1",
    },
    {
      image: "/gallery/image3.jpg", // Placeholder - replace with actual image
      caption: "Networking event",
      aspectRatio: "aspect-w-4 aspect-h-5",
    },
    {
      image: "/gallery/image4.jpg", // Placeholder - replace with actual image
      caption: "Project demonstration",
      aspectRatio: "aspect-w-16 aspect-h-9",
    },
    {
      image: "/gallery/image1.jpg", // Placeholder - replace with actual image
      caption: "Team building activity",
      aspectRatio: "aspect-w-1 aspect-h-1",
    },
    {
      image: "/gallery/image2.jpg", // Placeholder - replace with actual image
      caption: "Office celebration",
      aspectRatio: "aspect-w-3 aspect-h-2",
    },
  ];

  const ImageModal = ({ src, alt, onClose }: { src: string, alt: string, onClose: () => void }) => {
    if (!src) return null;
    
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative max-w-7xl max-h-[90vh] overflow-hidden rounded-xl"
          onClick={(e) => e.stopPropagation()}
        >
          <img 
            src={src} 
            alt={alt} 
            className="max-h-[90vh] max-w-full object-contain"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-darkPink/80 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-darkPink transition-colors duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <section className="w-full min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-darkPink/5 relative">
      {/* Blurred background shapes */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-darkPink/10 rounded-full filter blur-3xl z-0" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[400px] bg-darkPink/10 rounded-full filter blur-3xl z-0" />
      
      {/* Content container */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-5xl font-extrabold text-darkPink mb-16 text-center tracking-tight">
            Awards & Pics
          </h2>

          {/* Event Sections - Always displayed */}
          <div className="space-y-24 mb-32">
            {/* Synapse Hackathon Section - Always displayed */}
            <div id="synapse-section" className="border-2 border-darkPink/20 p-8 rounded-2xl bg-white/50 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <h3 className="text-3xl font-bold text-darkPink mb-4 text-center">
                  IEEE NTU & NUS Synapse Hackathon 2024
                </h3>
                <p className="text-darkPink/70 text-center max-w-3xl mx-auto mb-10">
                  Images from our 1st Prize winning project at the Synapse Hackathon, where we built an AI-powered platform for content creation.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {synapseImages.map((item, index) => (
                    <motion.div
                      key={`synapse-${index}`}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="relative group rounded-xl overflow-hidden shadow-md hover:shadow-xl cursor-pointer"
                      onClick={() => setSelectedImage(item.image)}
                    >
                      <div className="overflow-hidden aspect-video">
                        <img 
                          src={item.image} 
                          alt={item.caption} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Clean Tech Challenge Section - Always displayed */}
            <div id="cleantech-section" className="border-2 border-darkPink/20 p-8 rounded-2xl bg-white/50 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <h3 className="text-3xl font-bold text-darkPink mb-4 text-center">
                  Clean Tech Challenge (2023-2024)
                </h3>
                <p className="text-darkPink/70 text-center max-w-3xl mx-auto mb-10">
                  Images from our 1st Prize winning projects two years in a row, featuring sustainability solutions and shipment prediction models.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {cleanTechImages.map((item, index) => (
                    <motion.div
                      key={`cleantech-${index}`}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="relative group rounded-xl overflow-hidden shadow-md hover:shadow-xl cursor-pointer"
                      onClick={() => setSelectedImage(item.image)}
                    >
                      <div className="overflow-hidden aspect-video">
                        <img 
                          src={item.image} 
                          alt={item.caption} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* NTU IEEE Intuition Hackathon Section - Always displayed */}
            <div id="intuition-section" className="border-2 border-darkPink/20 p-8 rounded-2xl bg-white/50 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <h3 className="text-3xl font-bold text-darkPink mb-4 text-center">
                  NTU IEEE Intuition Hackathon
                </h3>
                <p className="text-darkPink/70 text-center max-w-3xl mx-auto mb-10">
                  1st Runner-Up at the NTU IEEE Intuition Hackathon, where we developed an AI system that transforms prompts into fully-functional websites.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {intuitionImages.map((item, index) => (
                    <motion.div
                      key={`intuition-${index}`}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="relative group rounded-xl overflow-hidden shadow-md hover:shadow-xl cursor-pointer"
                      onClick={() => setSelectedImage(item.image)}
                    >
                      <div className="overflow-hidden aspect-video">
                        <img 
                          src={item.image} 
                          alt={item.caption} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Awards Section */}
          <div className="mb-32">
            <h3 className="text-3xl font-bold text-darkPink mb-12 text-center md:text-left">
              Awards & Recognition
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
              {awards.map((award, index) => (
                <motion.div
                  key={award.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white/80 backdrop-blur-md shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group"
                >
                  <div className="h-64 overflow-hidden">
                    <img 
                      src={award.image} 
                      alt={award.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      onClick={() => setSelectedImage(award.image)}
                    />
                  </div>
                  <div className="p-8">
                    <h4 className="text-xl font-bold text-darkPink mb-2">{award.title}</h4>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-darkPink/80 font-medium">{award.organization}</span>
                      <span className="text-darkPink/60 text-sm bg-darkPink/5 px-3 py-1 rounded-full">{award.year}</span>
                    </div>
                    <p className="text-darkPink/70">{award.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Photo Gallery Section - Masonry Layout */}
          <div className="mb-20">
            <h3 className="text-3xl font-bold text-darkPink mb-12 text-center md:text-left">
              Photo Gallery
            </h3>
            
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
              {gallery.map((item, index) => (
                <motion.div
                  key={`${item.caption}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
                  className="relative group break-inside-avoid rounded-xl overflow-hidden shadow-md hover:shadow-xl mb-6 cursor-pointer"
                  onClick={() => setSelectedImage(item.image)}
                >
                  <div className="overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.caption} 
                      className="w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Call to action */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mt-16"
          >
            <p className="text-lg text-darkPink/70 mb-8">More photos coming soon!</p>
            <div className="inline-flex items-center gap-2 text-white bg-darkPink px-6 py-3 rounded-full font-medium shadow-lg hover:shadow-xl hover:bg-darkPink/90 transition-all duration-300 hover:-translate-y-1">
              <span>Follow me for updates</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Full-screen image modal */}
      {selectedImage && (
        <ImageModal 
          src={selectedImage} 
          alt="Gallery image" 
          onClose={() => setSelectedImage(null)} 
        />
      )}
    </section>
  );
};

export default AwardsAndPics; 