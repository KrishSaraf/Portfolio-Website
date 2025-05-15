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
      maxHeight: 750
    },
    // {
    //   id: 'presentation',
    //   src: "/gallery/timeline/m.jpeg",
    //   alt: "Innovation Presentation",
    //   description: "Presenting research findings at the tech conference",
    //   aspectRatio: 5/4,
    //   highlight: true,
    //   objectPosition: "center 40%" 
    // },
    // {
    //   id: 'research',
    //   src: "/gallery/timeline/d.jpeg",
    //   alt: "Research Meeting",
    //   description: "Research planning at university lab",
    //   aspectRatio: 3/4,
    //   highlight: false,
    //   objectPosition: "center 25%"
    // },
    
    // Group landscape orientation images
    {
      id: 'presentation2',
      src: "/gallery/timeline/g.jpeg",
      alt: "Technical Presentation",
      description: "Sharing project insights with the team",
      aspectRatio: 16/9,
      highlight: false,
      objectPosition: "center 30%",
      maxHeight: 550
    },
    {
      id: 'workshop2',
      src: "/gallery/timeline/k.jpeg",
      alt: "Innovation Workshop",
      description: "Collaborative workshop session",
      aspectRatio: 16/9,
      highlight: false,
      objectPosition: "center 30%",
      maxHeight: 550
    },
    {
      id: 'mountain',
      src: "/gallery/timeline/l.jpeg",
      alt: "Mountain View", 
      description: "Project planning retreat",
      aspectRatio: 4/3,
      highlight: false,
      objectPosition: "center 30%",
      maxHeight: 550
    },
    {
      id: 'outdoor',
      src: "/gallery/timeline/o.jpeg",
      alt: "Outdoor Strategy Session",
      description: "Team planning in an outdoor setting",
      aspectRatio: 4/3,
      highlight: false,
      objectPosition: "center 30%",
      maxHeight: 550
    },
    {
      id: 'discussion',
      src: "/gallery/timeline/c.jpeg", 
      alt: "Team Discussion",
      description: "Collaborative problem-solving session",
      aspectRatio: 4/3,
      highlight: false,
      objectPosition: "center 15%",
      maxHeight: 550
    },
    {
      id: 'project',
      src: "/gallery/timeline/h.jpeg",
      alt: "Project Development",
      description: "Whiteboarding system architecture",
      aspectRatio: 4/3,
      highlight: false,
      objectPosition: "center 30%",
      maxHeight: 550
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
      maxHeight: 550
    },
    {
      id: 'workshop',
      src: "/gallery/timeline/e.jpeg",
      alt: "Workshop Session",
      description: "Leading a workshop on AI applications",
      aspectRatio: 4/3,
      highlight: false,
      objectPosition: "center 35%",
      maxHeight: 550
    },
    {
      id: 'innovation',
      src: "/gallery/timeline/f.jpeg",
      alt: "Innovation Work",
      description: "Creative brainstorming for new solutions",
      aspectRatio: 7/5,
      highlight: false,
      objectPosition: "center 40%",
      maxHeight: 550
    },
    {
      id: 'technology',
      src: "/gallery/timeline/i.jpeg",
      alt: "Technology Demo",
      description: "Demonstrating the latest tech solutions",
      aspectRatio: 1/2,
      highlight: false,
      objectPosition: "center 10%",
      maxHeight: 150
    },
    {
      id: 'stakeholders',
      src: "/gallery/timeline/m.jpeg",
      alt: "Stakeholder Meeting",
      description: "Engaging with project stakeholders",
      aspectRatio: 2/3,
      highlight: false,
      maxHeight: 550,
      // The objectPosition property is set to "center 30%", which means the image will be positioned such that the center of the image is aligned horizontally, and vertically it is positioned at 30% from the top. This helps in focusing on a specific part of the image when displayed.
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
      image: "/gallery/basf.jpeg",
      caption: "Speaking at Tech Conference 2023",
      aspectRatio: "aspect-w-3 aspect-h-4",
    },
    {
      image: "/gallery/krish-hospital.jpeg",
      caption: "Team collaboration session",
      aspectRatio: "aspect-w-1 aspect-h-1",
    },
    {
      image: "/gallery/steps.png",
      caption: "Project workflow diagram",
      aspectRatio: "aspect-w-4 aspect-h-3",
    },
    {
      image: "/gallery/gauze.jpeg",
      caption: "Surgical Gauze Detection system",
      aspectRatio: "aspect-w-1 aspect-h-1",
    },
    {
      image: "/gallery/t1.jpeg",
      caption: "Synapse Hackathon presentation",
      aspectRatio: "aspect-w-3 aspect-h-2",
    },
    {
      image: "/gallery/l1.jpeg",
      caption: "Presenting at industry panel",
      aspectRatio: "aspect-w-1 aspect-h-1",
    },
    {
      image: "/gallery/p1.jpeg",
      caption: "PEAK Leadership Program presentation",
      aspectRatio: "aspect-w-4 aspect-h-5",
    },
    {
      image: "/gallery/c1.jpeg",
      caption: "CleanTech Challenge presentation",
      aspectRatio: "aspect-w-16 aspect-h-9",
    },
    {
      image: "/gallery/1.jpeg",
      caption: "IEEE Intuition Hackathon",
      aspectRatio: "aspect-w-1 aspect-h-1",
    },
    {
      image: "/gallery/c2.jpeg",
      caption: "Team celebrations",
      aspectRatio: "aspect-w-3 aspect-h-2",
    },
  ];

  // Videos for the gallery
  const videos = [
    {
      src: "/gallery/videos/video-counting.mp4",
      caption: "Surgical gauze detection and counting system demonstration",
      // No thumbnail image, will use the video itself
    }
  ];

  // Timeline images from WhatsApp - added in different dimensions
  const timelineImages = [
    // {
    //   image: "/gallery/timeline/a.jpeg",
    //   caption: "Academic presentation",
    //   aspectRatio: "aspect-w-1 aspect-h-1",
    // },
    {
      image: "/gallery/timeline/b.jpeg",
      caption: "Technical discussion with team",
      aspectRatio: "aspect-w-3 aspect-h-4",
    },
    {
      image: "/gallery/timeline/c.jpeg",
      caption: "Project development session",
      aspectRatio: "aspect-w-4 aspect-h-3",
    },
    {
      image: "/gallery/timeline/d.jpeg",
      caption: "Collaborative work environment",
      aspectRatio: "aspect-w-4 aspect-h-3",
    },
    {
      image: "/gallery/timeline/e.jpeg",
      caption: "Presenting research findings",
      aspectRatio: "aspect-w-3 aspect-h-5",
    },
    {
      image: "/gallery/timeline/f.jpeg",
      caption: "Team problem-solving session",
      aspectRatio: "aspect-w-7 aspect-h-5",
    },
    {
      image: "/gallery/timeline/g.jpeg",
      caption: "Whiteboard strategy planning",
      aspectRatio: "aspect-w-16 aspect-h-9",
    },
    {
      image: "/gallery/timeline/h.jpeg",
      caption: "Conference presentation",
      aspectRatio: "aspect-w-4 aspect-h-3",
    },
    {
      image: "/gallery/timeline/i.jpeg",
      caption: "Technology demonstration",
      aspectRatio: "aspect-w-3 aspect-h-2",
    },
    {
      image: "/gallery/timeline/k.jpeg",
      caption: "Innovation workshop session",
      aspectRatio: "aspect-w-16 aspect-h-9",
    },
    {
      image: "/gallery/timeline/l.jpeg",
      caption: "Project progress review",
      aspectRatio: "aspect-w-4 aspect-h-3",
    },
    {
      image: "/gallery/timeline/m.jpeg",
      caption: "Engaging with stakeholders",
      aspectRatio: "aspect-w-3 aspect-h-2",
    },
    {
      image: "/gallery/timeline/n.jpeg",
      caption: "Development planning session",
      aspectRatio: "aspect-w-3 aspect-h-4",
    },
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
        className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative max-w-7xl max-h-[90vh] overflow-hidden rounded-xl"
          onClick={(e) => e.stopPropagation()}
        >
              {media.type === 'image' ? (
          <img 
                  src={media.src} 
                  alt="Gallery image" 
            className="max-h-[90vh] max-w-full object-contain"
          />
              ) : (
                <div className="relative">
                  <video 
                    src={media.src} 
                    controls 
                    autoPlay 
                    loop={media.loop}
                    className="max-h-[90vh] max-w-full"
                  />
                </div>
              )}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="absolute top-4 right-4 bg-darkPink/80 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-darkPink transition-colors duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
    <section className="w-full min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-darkPink/5 relative">
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
          <h2 className="text-5xl font-extrabold text-darkPink mb-8 text-center tracking-tight">
            Awards & Pics
          </h2>
          <p className="text-xl text-darkPink/70 text-center max-w-3xl mx-auto mb-12">
            Showcasing memorable moments from my professional journey and achievements
          </p>

          {/* NEW: Responsive Masonry Gallery */}
          <div className="mb-24">
            <ResponsiveMasonry
              columnsCountBreakPoints={{ 350: 1, 750: 2, 1024: 3, 1280: 4 }}
            >
              <Masonry gutter="16px">
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
                    <div className={`overflow-hidden ${item.highlight ? 'aspect-[4/3]' : 'aspect-auto'}`}>
                      <motion.img 
                        src={item.src}
                        alt={item.alt}
                        onLoad={handleImageLoaded}
                        className="w-full h-full object-cover"
                        style={{ 
                          objectPosition: item.objectPosition || "center",
                          ...(item.id === 'stakeholders' ? { maxHeight: '550px', minHeight: '550px' } : {}),
                          ...(item.id === 'basf' ? { maxHeight: '750px' } : {}),
                          ...(item.id === 'technology' ? { maxHeight: '150px' } : {}),
                          ...(item.id.includes('outdoor') ? { maxHeight: '550px', minHeight: '550px' } : {})
                        }}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.5 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                        <div className="p-4 text-white w-full">
                          <h4 className="font-medium">{item.alt}</h4>
                          <p className="text-sm text-white/80">{item.description}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </Masonry>
            </ResponsiveMasonry>
          </div>

          {/* Visual separator */}
          <div className="w-full flex items-center justify-center mb-16 mt-4">
            <div className="h-px w-16 bg-darkPink/20"></div>
            <div className="mx-4 text-darkPink/40">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
              </svg>
            </div>
            <div className="h-px w-16 bg-darkPink/20"></div>
          </div>

          {/* Event Sections - Always displayed */}
          <div className="space-y-24 mb-32">
            {/* Surgical Gauze Detection Section - Always displayed */}
            <div id="gauze-section" className="border-2 border-darkPink/20 p-8 rounded-2xl bg-white/50 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <h3 className="text-3xl font-bold text-darkPink mb-4 text-center">
                  Surgical Gauze Detection using Computer Vision
                </h3>
                <p className="text-darkPink/70 text-center max-w-3xl mx-auto mb-10">
                  Developed and deployed a real-time gauze detection system with SGH using YOLOv8, achieving 98% detection accuracy and doubling throughput to 34 FPS.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                            className={`w-full transition-transform duration-700 group-hover:scale-105 ${
                              item.src.includes('krish-hospital') 
                                ? "h-auto object-contain" 
                                : "h-auto object-contain"
                            }`}
                            style={{
                              ...(item.src.includes('krish-hospital') ? { maxHeight: '400px' } : {}),
                              ...(item.src.includes('gauze.jpeg') ? { maxHeight: '550px' } : {}),
                              ...(item.src.includes('o.jpeg') ? { maxHeight: '550px' } : {})
                            }}
                          />
                        ) : (
                          <div className="relative">
                            <video 
                              src={item.src}
                              className="w-full h-full object-contain"
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

            {/* Code with AI Hackathon Section - Always displayed */}
            <div id="codewithai-section" className="border-2 border-darkPink/20 p-8 rounded-2xl bg-white/50 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <h3 className="text-3xl font-bold text-darkPink mb-4 text-center">
                  "Code with AI" Hackathon - Get My Leadz
            </h3>
                <p className="text-darkPink/70 text-center max-w-3xl mx-auto mb-10">
                  3rd Place winning project where we built an AI-driven lead generation platform that automates prospect discovery, qualification, and scoring.
                </p>
            
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

            {/* NTU PEAK Leadership Program Section - Always displayed */}
            <div id="peak-section" className="border-2 border-darkPink/20 p-8 rounded-2xl bg-white/50 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <h3 className="text-3xl font-bold text-darkPink mb-4 text-center">
                  NTU PEAK Leadership Program
                </h3>
                <p className="text-darkPink/70 text-center max-w-3xl mx-auto mb-10">
                  1st Runners Up and Best Ideation Award for designing a future-proof MRT system blueprint for 2030 in collaboration with the Land Transport Authority.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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