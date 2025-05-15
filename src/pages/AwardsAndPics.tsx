import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

const AwardsAndPics = () => {
  const [selectedMedia, setSelectedMedia] = useState<{src: string, type: 'image' | 'video', loop?: boolean} | null>(null);
  const [imagesLoaded, setImagesLoaded] = useState(0);
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
                         event === 'intuition' ? 'intuition-section' :
                         event === 'codewithai' ? 'codewithai-section' :
                         event === 'peak' ? 'peak-section' :
                         event === 'gauze' ? 'gauze-section' :
                         event === 'timeline' ? 'timeline-section' : null;
        if (sectionId) {
          const section = document.getElementById(sectionId);
          if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }, 500);
    }
  }, [location]);

  // Featured gallery items with better metadata
  const featuredGallery = [
    // Highlight images first
    {
      id: 'basf',
      src: "/gallery/timeline/j.jpeg",
      alt: "BASF Team",
      description: "Team photo at BASF's innovation showcase",
      aspectRatio: 25/9,
      highlight: false,
      objectPosition: "center 25%",
    },
    
    // Group landscape orientation images
    {
      id: 'presentation2',
      src: "/gallery/timeline/g.jpeg",
      alt: "Technical Presentation",
      description: "Sharing project insights with the team",
      aspectRatio: 16/9,
      highlight: false,
      objectPosition: "center 30%",
    },
    {
      id: 'workshop2',
      src: "/gallery/timeline/k.jpeg",
      alt: "Innovation Workshop",
      description: "Collaborative workshop session",
      aspectRatio: 16/9,
      highlight: false,
      objectPosition: "center 30%",
    },
    {
      id: 'mountain',
      src: "/gallery/timeline/l.jpeg",
      alt: "Mountain View", 
      description: "Project planning retreat",
      aspectRatio: 4/3,
      highlight: false,
      objectPosition: "center 30%",
    },
    {
      id: 'outdoor',
      src: "/gallery/timeline/o.jpeg",
      alt: "Outdoor Strategy Session",
      description: "Team planning in an outdoor setting",
      aspectRatio: 4/3,
      highlight: false,
      objectPosition: "center 30%",
    },
    {
      id: 'discussion',
      src: "/gallery/timeline/c.jpeg", 
      alt: "Team Discussion",
      description: "Collaborative problem-solving session",
      aspectRatio: 4/3,
      highlight: false,
      objectPosition: "center 15%",
    },
    {
      id: 'project',
      src: "/gallery/timeline/h.jpeg",
      alt: "Project Development",
      description: "Whiteboarding system architecture",
      aspectRatio: 4/3,
      highlight: false,
      objectPosition: "center 30%",
    },
    
    // Group portrait and irregular orientation images
    {
      id: 'development',
      src: "/gallery/timeline/b.jpeg",
      alt: "Development Session",
      description: "Technical discussion during sprint planning",
      aspectRatio: 3/4,
      highlight: false,
      objectPosition: "center 20%",
    },
    {
      id: 'workshop',
      src: "/gallery/timeline/e.jpeg",
      alt: "Workshop Session",
      description: "Leading a workshop on AI applications",
      aspectRatio: 4/3,
      highlight: false,
      objectPosition: "center 35%",
    },
    {
      id: 'innovation',
      src: "/gallery/timeline/f.jpeg",
      alt: "Innovation Work",
      description: "Creative brainstorming for new solutions",
      aspectRatio: 7/5,
      highlight: false,
      objectPosition: "center 40%",
    },
    {
      id: 'technology',
      src: "/gallery/timeline/i.jpeg",
      alt: "Technology Demo",
      description: "Demonstrating the latest tech solutions",
      aspectRatio: 1/2,
      highlight: false,
      objectPosition: "center 10%",
    },
    {
      id: 'stakeholders',
      src: "/gallery/timeline/m.jpeg",
      alt: "Stakeholder Meeting",
      description: "Engaging with project stakeholders",
      aspectRatio: 2/3,
      highlight: false,
    }
  ];

  // Increment loaded images counter
  const handleImageLoaded = () => {
    setImagesLoaded(prev => prev + 1);
  };

  // Synapse hackathon images
  const synapseImages = [
    {
      image: "/gallery/t1.jpeg", 
      caption: "Presenting our AI solution at IEEE NTU & NUS Synapse Hackathon",
      aspectRatio: "aspect-w-16 aspect-h-9",
    },
    {
      image: "/gallery/t2.jpeg", 
      caption: "Team photo at Synapse Hackathon auditorium",
      aspectRatio: "aspect-w-4 aspect-h-3",
    }
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
      image: "/gallery/1.jpeg", 
      caption: "Our team at NTU IEEE Intuition Hackathon",
      aspectRatio: "aspect-w-16 aspect-h-9",
    },
    {
      image: "/gallery/2.jpeg", 
      caption: "Demonstrating our project at NTU IEEE Intuition Hackathon",
      aspectRatio: "aspect-w-4 aspect-h-3",
    },
    {
      image: "/gallery/3.jpeg", 
      caption: "Receiving award at NTU IEEE Intuition Hackathon",
      aspectRatio: "aspect-w-4 aspect-h-3",
    },
    {
      image: "/gallery/4.jpeg", 
      caption: "Final presentation at NTU IEEE Intuition Hackathon",
      aspectRatio: "aspect-w-16 aspect-h-9",
    }
  ];

  // Code with AI Hackathon images
  const codeWithAIImages = [
    {
      image: "/gallery/l1.jpeg", 
      caption: "Team presentation at Code with AI Hackathon",
      aspectRatio: "aspect-w-16 aspect-h-9",
    },
    {
      image: "/gallery/l2.jpeg", 
      caption: "Demo of Get My Leadz platform at the hackathon",
      aspectRatio: "aspect-w-4 aspect-h-3",
    },
    {
      image: "/gallery/l3.jpeg", 
      caption: "Receiving 3rd place award at Code with AI Hackathon",
      aspectRatio: "aspect-w-4 aspect-h-3",
    },
    {
      image: "/gallery/l4.jpeg", 
      caption: "Team working session during the hackathon",
      aspectRatio: "aspect-w-16 aspect-h-9",
    }
  ];

  // NTU PEAK Leadership Program images
  const peakImages = [
    {
      image: "/gallery/p1.jpeg", 
      caption: "Presenting MRT system blueprint at NTU PEAK Leadership Program",
      aspectRatio: "aspect-w-16 aspect-h-9",
    },
    {
      image: "/gallery/p2.jpeg", 
      caption: "Team collaboration with Land Transport Authority",
      aspectRatio: "aspect-w-4 aspect-h-3",
    },
    {
      image: "/gallery/p3.jpeg", 
      caption: "Receiving Best Ideation Award at PEAK Leadership Program",
      aspectRatio: "aspect-w-4 aspect-h-3",
    },
    {
      image: "/gallery/p4.jpeg", 
      caption: "Final presentation of our project at PEAK",
      aspectRatio: "aspect-w-16 aspect-h-9",
    }
  ];

  // Surgical Gauze Detection images and video
  const gauzeMedia = [
    {
      type: 'video',
      src: "/gallery/videos/video-counting.mp4", 
      caption: "Gauze counting system demonstration",
      loop: true,
      aspectRatio: "aspect-w-16 aspect-h-9",
    },
    {
      type: 'image',
      src: "/gallery/gauze.jpeg", 
      caption: "Gauze detection system in action",
      aspectRatio: "aspect-w-16 aspect-h-9",
      // transform: "scaleX(-1)", // Flip horizontally
    },
    {
      type: 'image',
      src: "/gallery/krish-hospital.jpeg", 
      caption: "Clinical implementation at hospital",
      aspectRatio: "aspect-w-4 aspect-h-3",
    },
    {
      type: 'image',
      src: "/gallery/steps.png", 
      caption: "System architecture and workflow",
      aspectRatio: "aspect-w-4 aspect-h-3",
    }
  ];

  // Updated Modal to handle both images and videos with improved animations
  const MediaModal = ({ media, onClose }: { media: {src: string, type: 'image' | 'video', loop?: boolean} | null, onClose: () => void }) => {
    if (!media) return null;
    
    return (
      <AnimatePresence>
        {media && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-[max(2vw,1rem)] backdrop-blur-sm"
            onClick={onClose}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-[min(95vw,1400px)] h-auto max-h-[90vh] overflow-hidden rounded-xl"
              onClick={(e) => e.stopPropagation()}
            >
              {media.type === 'image' ? (
                <img 
                  src={media.src} 
                  alt="Gallery image" 
                  className="w-full h-auto max-h-[90vh] object-contain"
                />
              ) : (
                <div className="relative w-full h-auto">
                  <video 
                    src={media.src} 
                    controls 
                    autoPlay 
                    loop={media.loop}
                    className="w-full h-auto max-h-[90vh]"
                  />
                </div>
              )}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="absolute top-[min(4vw,1rem)] right-[min(4vw,1rem)] bg-darkPink/80 text-white w-[clamp(2.5rem,5vw,3rem)] h-[clamp(2.5rem,5vw,3rem)] rounded-full flex items-center justify-center hover:bg-darkPink transition-colors duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-[clamp(1.25rem,2.5vw,1.5rem)] w-[clamp(1.25rem,2.5vw,1.5rem)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  return (
    <section className="w-full min-h-screen py-[max(15vh,7rem)] px-[max(4vw,1rem)] overflow-hidden bg-darkPink/5 relative">
      {/* Blurred background shapes - using relative positioning with viewport units */}
      <div className="absolute top-[-10vh] left-[-8vw] w-[40vw] aspect-square bg-darkPink/10 rounded-full filter blur-3xl z-0" />
      <div className="absolute bottom-0 right-0 w-[45vw] aspect-square bg-darkPink/10 rounded-full filter blur-3xl z-0" />
      
      {/* Content container */}
      <div className="relative z-10 w-[min(100%,1400px)] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-extrabold text-darkPink mb-[clamp(1.5rem,4vh,3rem)] text-center tracking-tight">
            Awards & Pics
          </h2>
          <p className="text-[clamp(1rem,2vw,1.25rem)] text-darkPink/70 text-center max-w-[min(90vw,50rem)] mx-auto mb-[clamp(2rem,6vh,3rem)]">
            Showcasing memorable moments from my professional journey and achievements
          </p>

          {/* Responsive Masonry Gallery with fluid gutters */}
          <div className="mb-[clamp(3rem,8vh,6rem)]">
            <ResponsiveMasonry
              columnsCountBreakPoints={{ 350: 1, 650: 2, 900: 3, 1200: 4 }}
            >
              <Masonry gutter="clamp(0.5rem, 1.5vw, 1rem)">
                {featuredGallery.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: imagesLoaded > index / 2 ? 1 : 0,
                      y: imagesLoaded > index / 2 ? 0 : 20
                    }}
                    transition={{ 
                      duration: 0.5, 
                      delay: Math.min(index * 0.1, 0.8),
                      ease: "easeOut"
                    }}
                    className={`relative group rounded-xl overflow-hidden shadow-sm hover:shadow-xl cursor-pointer transition-all duration-300 ${
                      item.highlight ? 'border-2 border-darkPink/20' : ''
                    }`}
                    onClick={() => setSelectedMedia({src: item.src, type: 'image'})}
                  >
                    <div className={`overflow-hidden ${item.highlight ? 'aspect-[4/3]' : 'aspect-auto'}`}
                         style={{ aspectRatio: item.aspectRatio }}>
                      <motion.img 
                        src={item.src}
                        alt={item.alt}
                        onLoad={handleImageLoaded}
                        className="w-full h-full object-cover"
                        style={{ objectPosition: item.objectPosition || "center" }}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.5 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                        <div className="p-[clamp(0.5rem,2vw,1rem)] text-white w-full">
                          <h4 className="font-medium text-[clamp(0.875rem,1.5vw,1rem)]">{item.alt}</h4>
                          <p className="text-[clamp(0.75rem,1.25vw,0.875rem)] text-white/80">{item.description}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </Masonry>
            </ResponsiveMasonry>
          </div>

          {/* Visual separator with fluid dimensions */}
          <div className="w-full flex items-center justify-center mb-[clamp(2rem,5vh,4rem)] mt-[clamp(1rem,2vh,2rem)]">
            <div className="h-px w-[clamp(2rem,5vw,4rem)] bg-darkPink/20"></div>
            <div className="mx-[clamp(0.5rem,1.5vw,1rem)] text-darkPink/40">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-[clamp(1rem,1.5vw,1.5rem)] w-[clamp(1rem,1.5vw,1.5rem)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
              </svg>
            </div>
            <div className="h-px w-[clamp(2rem,5vw,4rem)] bg-darkPink/20"></div>
          </div>

          {/* Event Sections with fluid spacing */}
          <div className="space-y-[clamp(3rem,8vh,6rem)] mb-[clamp(4rem,10vh,8rem)]">
            {/* Surgical Gauze Detection Section */}
            <div id="gauze-section" className="border-2 border-darkPink/20 p-[clamp(1rem,3vw,2rem)] rounded-2xl bg-white/50 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <h3 className="text-[clamp(1.5rem,3vw,2.25rem)] font-bold text-darkPink mb-[clamp(0.75rem,2vh,1rem)] text-center">
                  Surgical Gauze Detection using Computer Vision
                </h3>
                <p className="text-[clamp(0.875rem,1.75vw,1rem)] text-darkPink/70 text-center max-w-[min(90vw,50rem)] mx-auto mb-[clamp(1.5rem,4vh,2.5rem)]">
                  Developed and deployed a real-time gauze detection system with SGH using YOLOv8, achieving 98% detection accuracy and doubling throughput to 34 FPS.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[clamp(0.75rem,2vw,1.5rem)]">
                  {gauzeMedia.map((item, index) => (
                    <motion.div
                      key={`gauze-${index}`}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="relative group rounded-xl overflow-hidden shadow-md hover:shadow-xl cursor-pointer"
                      onClick={() => setSelectedMedia({src: item.src, type: item.type === 'video' ? 'video' : 'image', loop: item.loop})}
                    >
                      <div className="overflow-hidden">
                        {item.type === 'image' ? (
                          <img 
                            src={item.src} 
                            alt={item.caption} 
                            className="w-full h-auto object-contain min-h-[200px] max-h-[min(550px,50vh)] transition-transform duration-700 group-hover:scale-105"
                          />
                        ) : (
                          <div className="relative">
                            <video 
                              src={item.src}
                              className="w-full h-auto object-contain min-h-[200px] max-h-[min(550px,50vh)]"
                              autoPlay
                              muted
                              loop
                              playsInline
                            />
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Synapse Hackathon Section */}
            <div id="synapse-section" className="border-2 border-darkPink/20 p-[clamp(1rem,3vw,2rem)] rounded-2xl bg-white/50 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <h3 className="text-[clamp(1.5rem,3vw,2.25rem)] font-bold text-darkPink mb-[clamp(0.75rem,2vh,1rem)] text-center">
                  IEEE NTU & NUS Synapse Hackathon 2024
                </h3>
                <p className="text-[clamp(0.875rem,1.75vw,1rem)] text-darkPink/70 text-center max-w-[min(90vw,50rem)] mx-auto mb-[clamp(1.5rem,4vh,2.5rem)]">
                  Images from our 1st Prize winning project at the Synapse Hackathon, where we built an AI-powered platform for content creation.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[clamp(0.75rem,2vw,1.5rem)]">
                  {synapseImages.map((item, index) => (
                    <motion.div
                      key={`synapse-${index}`}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="relative group rounded-xl overflow-hidden shadow-md hover:shadow-xl cursor-pointer"
                      onClick={() => setSelectedMedia({src: item.image, type: 'image'})}
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

            {/* Clean Tech Challenge Section */}
            <div id="cleantech-section" className="border-2 border-darkPink/20 p-[clamp(1rem,3vw,2rem)] rounded-2xl bg-white/50 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <h3 className="text-[clamp(1.5rem,3vw,2.25rem)] font-bold text-darkPink mb-[clamp(0.75rem,2vh,1rem)] text-center">
                  Clean Tech Challenge (2023-2024)
                </h3>
                <p className="text-[clamp(0.875rem,1.75vw,1rem)] text-darkPink/70 text-center max-w-[min(90vw,50rem)] mx-auto mb-[clamp(1.5rem,4vh,2.5rem)]">
                  Images from our 1st Prize winning projects two years in a row, featuring sustainability solutions and shipment prediction models.
                </p>
            
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[clamp(0.75rem,2vw,1.5rem)]">
                  {cleanTechImages.map((item, index) => (
                    <motion.div
                      key={`cleantech-${index}`}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="relative group rounded-xl overflow-hidden shadow-md hover:shadow-xl cursor-pointer"
                      onClick={() => setSelectedMedia({src: item.image, type: 'image'})}
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

            {/* NTU IEEE Intuition Hackathon Section */}
            <div id="intuition-section" className="border-2 border-darkPink/20 p-[clamp(1rem,3vw,2rem)] rounded-2xl bg-white/50 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <h3 className="text-[clamp(1.5rem,3vw,2.25rem)] font-bold text-darkPink mb-[clamp(0.75rem,2vh,1rem)] text-center">
                  NTU IEEE Intuition Hackathon
                </h3>
                <p className="text-[clamp(0.875rem,1.75vw,1rem)] text-darkPink/70 text-center max-w-[min(90vw,50rem)] mx-auto mb-[clamp(1.5rem,4vh,2.5rem)]">
                  1st Runner-Up at the NTU IEEE Intuition Hackathon, where we developed an AI system that transforms prompts into fully-functional websites.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[clamp(0.75rem,2vw,1.5rem)]">
                  {intuitionImages.map((item, index) => (
                    <motion.div
                      key={`intuition-${index}`}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="relative group rounded-xl overflow-hidden shadow-md hover:shadow-xl cursor-pointer"
                      onClick={() => setSelectedMedia({src: item.image, type: 'image'})}
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

            {/* Code with AI Hackathon Section */}
            <div id="codewithai-section" className="border-2 border-darkPink/20 p-[clamp(1rem,3vw,2rem)] rounded-2xl bg-white/50 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <h3 className="text-[clamp(1.5rem,3vw,2.25rem)] font-bold text-darkPink mb-[clamp(0.75rem,2vh,1rem)] text-center">
                  "Code with AI" Hackathon - Get My Leadz
                </h3>
                <p className="text-[clamp(0.875rem,1.75vw,1rem)] text-darkPink/70 text-center max-w-[min(90vw,50rem)] mx-auto mb-[clamp(1.5rem,4vh,2.5rem)]">
                  3rd Place winning project where we built an AI-driven lead generation platform that automates prospect discovery, qualification, and scoring.
                </p>
            
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[clamp(0.75rem,2vw,1.5rem)]">
                  {codeWithAIImages.map((item, index) => (
                    <motion.div
                      key={`codewithai-${index}`}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="relative group rounded-xl overflow-hidden shadow-md hover:shadow-xl cursor-pointer"
                      onClick={() => setSelectedMedia({src: item.image, type: 'image'})}
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

            {/* NTU PEAK Leadership Program Section */}
            <div id="peak-section" className="border-2 border-darkPink/20 p-[clamp(1rem,3vw,2rem)] rounded-2xl bg-white/50 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <h3 className="text-[clamp(1.5rem,3vw,2.25rem)] font-bold text-darkPink mb-[clamp(0.75rem,2vh,1rem)] text-center">
                  NTU PEAK Leadership Program
                </h3>
                <p className="text-[clamp(0.875rem,1.75vw,1rem)] text-darkPink/70 text-center max-w-[min(90vw,50rem)] mx-auto mb-[clamp(1.5rem,4vh,2.5rem)]">
                  1st Runners Up and Best Ideation Award for designing a future-proof MRT system blueprint for 2030 in collaboration with the Land Transport Authority.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[clamp(0.75rem,2vw,1.5rem)]">
                  {peakImages.map((item, index) => (
                    <motion.div
                      key={`peak-${index}`}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="relative group rounded-xl overflow-hidden shadow-md hover:shadow-xl cursor-pointer"
                      onClick={() => setSelectedMedia({src: item.image, type: 'image'})}
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

          {/* Call to action with fluid spacing and font sizing */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mt-[clamp(2rem,5vh,4rem)]"
          >
            <p className="text-[clamp(1rem,1.75vw,1.125rem)] text-darkPink/70 mb-[clamp(1rem,3vh,2rem)]">More photos coming soon!</p>
            <div className="inline-flex items-center gap-[clamp(0.5rem,1vw,0.75rem)] text-white bg-darkPink px-[clamp(1rem,3vw,1.5rem)] py-[clamp(0.5rem,1.5vh,0.75rem)] rounded-full font-medium shadow-lg hover:shadow-xl hover:bg-darkPink/90 transition-all duration-300 hover:-translate-y-1">
              <span className="text-[clamp(0.875rem,1.5vw,1rem)]">Follow me for updates</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-[clamp(1rem,1.5vw,1.25rem)] w-[clamp(1rem,1.5vw,1.25rem)]" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Full-screen image modal */}
      {selectedMedia && (
        <MediaModal 
          media={selectedMedia} 
          onClose={() => setSelectedMedia(null)} 
        />
      )}
    </section>
  );
};

export default AwardsAndPics; 