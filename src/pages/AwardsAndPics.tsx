import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, Link } from 'react-router-dom';
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
                         event === 'india-records' ? 'india-book-records-section' :
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
      description: "Team visit to BASF chemical company",
      aspectRatio: 25/9,
      highlight: false,
      objectPosition: "center 25%",
      maxHeight: 750
    },
    // Group landscape orientation images
    {
      id: 'presentation2',
      src: "/gallery/timeline/g.jpeg",
      alt: "Hanoi Winter Prelude 2024",
      description: "Award ceremony at international event in Vietnam",
      aspectRatio: 16/9,
      highlight: false,
      objectPosition: "center 30%",
      maxHeight: 550
    },
    {
      id: 'workshop2',
      src: "/gallery/timeline/k.jpeg",
      alt: "Classroom Group",
      description: "Collaborative session at MIT design innovation workshop",
      aspectRatio: 16/9,
      highlight: false,
      objectPosition: "center 30%",
      maxHeight: 550
    },
    {
      id: 'mountain',
      src: "/gallery/timeline/l.jpeg",
      alt: "Mountain Hiking", 
      description: "Trek to panoramic viewpoint in Southeast Asia",
      aspectRatio: 4/3,
      highlight: false,
      objectPosition: "center 30%",
      maxHeight: 550
    },
    {
      id: 'outdoor',
      src: "/gallery/timeline/o.jpeg",
      alt: "Nature Portrait",
      description: "Standing among trees at a park or nature reserve",
      aspectRatio: 4/3,
      highlight: false,
      objectPosition: "center 30%",
      maxHeight: 550
    },
    {
      id: 'discussion',
      src: "/gallery/timeline/c.jpeg", 
      alt: "Technical Presentation",
      description: "Presenting project details at a technical seminar",
      aspectRatio: 4/3,
      highlight: false,
      objectPosition: "center 15%",
      maxHeight: 550
    },
    {
      id: 'project',
      src: "/gallery/timeline/h.jpeg",
      alt: "Whiteboard Session",
      description: "Explaining system design concepts at a whiteboard",
      aspectRatio: 4/3,
      highlight: false,
      objectPosition: "center 30%",
      maxHeight: 550
    },
    
    // Group portrait and irregular orientation images
    {
      id: 'development',
      src: "/gallery/timeline/b.jpeg",
      alt: "Portrait Photo",
      description: "Professional headshot in casual setting",
      aspectRatio: 3/4,
      highlight: false,
      objectPosition: "center 20%",
      maxHeight: 550
    },
    {
      id: 'workshop',
      src: "/gallery/timeline/e.jpeg",
      alt: "Classroom Audience",
      description: "Student audience during a technical lecture",
      aspectRatio: 4/3,
      highlight: false,
      objectPosition: "center 35%",
      maxHeight: 550
    },
    {
      id: 'innovation',
      src: "/gallery/timeline/f.jpeg",
      alt: "Award Ceremony",
      description: "Receiving an award plaque at recognition ceremony",
      aspectRatio: 7/5,
      highlight: false,
      objectPosition: "center 40%",
      maxHeight: 550
    },
    {
      id: 'technology',
      src: "/gallery/timeline/i.jpeg",
      alt: "Marathon Runner",
      description: "Participating in OneGlint running event",
      aspectRatio: 1/2,
      highlight: false,
      objectPosition: "center 10%",
      maxHeight: 150
    },
    {
      id: 'stakeholders',
      src: "/gallery/timeline/m.jpeg",
      alt: "Cohase Awards 2023",
      description: "Receiving Dean's List award at Cohase ceremony",
      aspectRatio: 2/3,
      highlight: false,
      maxHeight: 550,
    },
    // Adding new timeline images
    {
      id: 'dance',
      src: "/gallery/timeline/dance.jpeg",
      alt: "Dance Performance",
      description: "Performing at a cultural event",
      aspectRatio: 4/3,
      highlight: false,
      objectPosition: "center 30%",
      maxHeight: 550
    },
    {
      id: 'deans-list',
      src: "/gallery/timeline/deans-2023.jpeg",
      alt: "Dean's List Award",
      description: "Recognition for academic excellence",
      aspectRatio: 16/9,
      highlight: true,
      objectPosition: "center 25%",
      maxHeight: 600
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
      caption: "Receiving award certificate at IEEE NTU & NUS Synapse Hackathon",
      aspectRatio: "aspect-w-16 aspect-h-9",
    },
    {
      image: "/gallery/t2.jpeg", 
      caption: "Team celebration after successful presentation",
      aspectRatio: "aspect-w-4 aspect-h-3",
    }
  ];

  // Clean Tech Challenge images
  const cleanTechImages = [
    {
      image: "/gallery/c1.jpeg", 
      caption: "Receiving First Prize trophy at Clean Tech Challenge 2024",
      aspectRatio: "aspect-w-16 aspect-h-9",
    },
    {
      image: "/gallery/c2.jpeg", 
      caption: "Group photo with judges and sponsors after awards",
      aspectRatio: "aspect-w-4 aspect-h-3",
    },
    {
      image: "/gallery/c3.jpeg", 
      caption: "Demonstration of our environmental technology solution",
      aspectRatio: "aspect-w-4 aspect-h-3",
    },
    {
      image: "/gallery/c4.jpeg", 
      caption: "Presenting GreenCompass SG platform to evaluation panel",
      aspectRatio: "aspect-w-16 aspect-h-9",
    },
  ];

  // NTU IEEE Intuition Hackathon images
  const intuitionImages = [
    {
      image: "/gallery/1.jpeg", 
      caption: "Collaborative group work during NTU IEEE Intuition Hackathon",
      aspectRatio: "aspect-w-16 aspect-h-9",
    },
    {
      image: "/gallery/2.jpeg", 
      caption: "Live coding session with team members at the hackathon",
      aspectRatio: "aspect-w-4 aspect-h-3",
    },
    {
      image: "/gallery/3.jpeg", 
      caption: "Accepting 1st Runner-Up award on stage",
      aspectRatio: "aspect-w-4 aspect-h-3",
    },
    {
      image: "/gallery/4.jpeg", 
      caption: "Final project demonstration to judges and audience",
      aspectRatio: "aspect-w-16 aspect-h-9",
    }
  ];

  // Code with AI Hackathon images
  const codeWithAIImages = [
    {
      image: "/gallery/l1.jpeg", 
      caption: "Pitching our Get My Leadz solution to the panel",
      aspectRatio: "aspect-w-16 aspect-h-9",
    },
    {
      image: "/gallery/l2.jpeg", 
      caption: "Interactive demo of our AI-powered lead generation platform",
      aspectRatio: "aspect-w-4 aspect-h-3",
    },
    {
      image: "/gallery/l3.jpeg", 
      caption: "Third place award ceremony with industry representatives",
      aspectRatio: "aspect-w-4 aspect-h-3",
    },
    {
      image: "/gallery/l4.jpeg", 
      caption: "Intensive problem-solving session during the hackathon",
      aspectRatio: "aspect-w-16 aspect-h-9",
    }
  ];

  // NTU PEAK Leadership Program images
  const peakImages = [
    {
      image: "/gallery/p1.jpeg", 
      caption: "Presenting urban transportation system innovations",
      aspectRatio: "aspect-w-16 aspect-h-9",
    },
    {
      image: "/gallery/p2.jpeg", 
      caption: "Workshop with Land Transport Authority representatives",
      aspectRatio: "aspect-w-4 aspect-h-3",
    },
    {
      image: "/gallery/p3.jpeg", 
      caption: "Receiving the Best Ideation Award for our MRT blueprint",
      aspectRatio: "aspect-w-4 aspect-h-3",
    },
    {
      image: "/gallery/p4.jpeg", 
      caption: "Final team presentation of future-ready transportation model",
      aspectRatio: "aspect-w-16 aspect-h-9",
    }
  ];

  // Surgical Gauze Detection images and video
  const gauzeMedia = [
    {
      type: 'video',
      src: "/gallery/videos/video-counting.mp4", 
      caption: "Live demonstration of real-time gauze detection algorithm",
      loop: true,
      aspectRatio: "aspect-w-16 aspect-h-9",
    },
    {
      type: 'image',
      src: "/gallery/gauze.jpeg", 
      caption: "AI-powered surgical gauze detection and counting system",
      aspectRatio: "aspect-w-16 aspect-h-9",
    },
    {
      type: 'image',
      src: "/gallery/krish-hospital.jpeg", 
      caption: "Hospital implementation and staff training session",
      aspectRatio: "aspect-w-4 aspect-h-3",
    },
    {
      type: 'image',
      src: "/gallery/steps.png", 
      caption: "System architecture and computer vision pipeline diagram",
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
            {/* India Book of Records Section - New section at the top */}
            <div id="india-book-records-section" className="border-2 border-darkPink/20 p-8 rounded-2xl bg-white/50 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <h3 className="text-3xl font-bold text-darkPink mb-4 text-center">
                  Did Something Crazy
                </h3>
                <p className="text-darkPink/70 text-center max-w-3xl mx-auto mb-10">
                  Official recognition from the India Book of Records for an extraordinary achievement
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div className="rounded-xl overflow-hidden shadow-md cursor-pointer">
                    <img 
                      src="/gallery/india-book-of-records.png" 
                      alt="India Book of Records Achievement" 
                      className="w-full h-auto object-cover"
                      onClick={() => setSelectedMedia({src: "/gallery/india-book-of-records.png", type: 'image'})}
                    />
                  </div>
                  
                  <div className="flex flex-col space-y-6">
                    <div className="prose prose-lg">
                      <h4 className="text-2xl font-bold text-darkPink">National Recognition</h4>
                      <p className="text-gray-700">
                        Honored to be recognized by the India Book of Records for exceptional achievement. This official acknowledgment represents dedication, commitment, and pushing boundaries.
                      </p>
                      <p className="text-gray-700 font-medium">
                        The certification showcases excellence and stands as a testament to what can be achieved with determination and focus.
                      </p>
                    </div>
                    
                    <a 
                      href="https://indiabookofrecords.in/krish-saraf-appreciation/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 self-start px-6 py-3 bg-darkPink text-white rounded-xl hover:bg-pink-700 transition-colors font-medium group"
                    >
                      <span>View Official Record Page</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>

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
            <Link to="/contact" className="inline-block">
              <div className="inline-flex items-center gap-2 text-white bg-darkPink px-6 py-3 rounded-full font-medium shadow-lg hover:shadow-xl hover:bg-darkPink/90 transition-all duration-300 hover:-translate-y-1">
                <span>Follow me for updates</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </Link>
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