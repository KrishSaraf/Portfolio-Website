import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, Link, useSearchParams } from 'react-router-dom';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import AcademicTimeline from '../components/AcademicTimeline';

// Map section IDs to project indexes for back navigation
const sectionToProjectMapping = {
  'gauze-section': 0, // Surgical Gauze Detection (first project)
  'synapse-section': 1, // IEEE NTU & NUS Synapse Hackathon
  'cleantech-section': 2, // Clean-Tech Challenge
  'intuition-section': 3, // NTU IEEE Intuition Hackathon
  'codewithai-section': 4, // "Code with AI" Hackathon
  'peak-section': 5, // NTU PEAK Leadership Program
};

// Back button component with project linking
const BackToProjectButton = ({ sectionId }: { sectionId: string }) => {
  const [searchParams] = useSearchParams();
  const sourceProject = searchParams.get('from');
  
  // If we have a source project parameter, use that, otherwise fall back to our mapping
  const projectIndex = sourceProject || sectionToProjectMapping[sectionId as keyof typeof sectionToProjectMapping];
  
  if (projectIndex !== undefined) {
    return (
      <Link 
        to={`/projects#project-${projectIndex}`}
        className="absolute top-4 left-4 bg-darkPink backdrop-blur-sm text-white hover:bg-pink-600 font-medium text-sm px-4 py-2 rounded-full shadow-sm flex items-center transition-all duration-300 hover:shadow-md"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Project
      </Link>
    );
  }
  
  return null;
};

const AwardsAndPics = () => {
  const [selectedMedia, setSelectedMedia] = useState<{src: string, type: 'image' | 'video', loop?: boolean} | null>(null);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const location = useLocation();
  
  // Scroll to the element with the given ID
  const scrollToElement = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;
    
    // For mobile devices, use a larger offset
    const isMobile = window.innerWidth < 768;
    const offset = isMobile ? 120 : 40; // Larger offset for mobile
    
    // Get element position
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;
    
    // Scroll to the element
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  };
  
  // Handle hash changes and initial hash
  useEffect(() => {
    // Function to handle hash change
    const handleHash = () => {
      // Longer delay for mobile to ensure everything is loaded
      const delay = window.innerWidth < 768 ? 1000 : 500;
      
      // If there's a hash in the URL
      if (location.hash) {
        // Get the element ID from hash
        const id = location.hash.replace('#', '');
        
        // Use setTimeout to ensure the page is fully loaded
        setTimeout(() => {
          scrollToElement(id);
        }, delay);
      }
    };
    
    // Run on mount and when hash changes
    handleHash();
    
    // Clean up
    return () => {};
  }, [location]);

  // New collage images grouped by aspect ratio and visual appearance
  const collageGallery = [
    // Wide landscape images
    {
      id: 'wide-1',
      src: "/images/image copy 4.png", 
      alt: "Wide landscape format",
      description: "Conference presentation",
      aspectRatio: 843/226,
      highlight: true,
      objectPosition: "center center",
    },
    // Portrait format images
    {
      id: 'portrait-1',
      src: "/images/image copy 10.png", 
      alt: "Portrait format",
      description: "Award ceremony",
      aspectRatio: 442/610,
      highlight: false,
      objectPosition: "center center",
    },
    {
      id: 'portrait-2',
      src: "/images/image copy 15.png", 
      alt: "Portrait format",
      description: "Team presentation",
      aspectRatio: 442/559,
      highlight: false,
      objectPosition: "center center",
    },
    {
      id: 'portrait-3',
      src: "/images/image copy 7.png", 
      alt: "Portrait format",
      description: "Conference participation",
      aspectRatio: 385/568,
      highlight: false,
      objectPosition: "center center",
    },
    {
      id: 'portrait-4',
      src: "/images/image copy.png", 
      alt: "Portrait format",
      description: "Award recognition",
      aspectRatio: 385/594,
      highlight: false,
      objectPosition: "center center",
    },
    {
      id: 'portrait-5',
      src: "/images/image.png", 
      alt: "Portrait format",
      description: "Team photo",
      aspectRatio: 437/600,
      highlight: false,
      objectPosition: "center center",
    },
    // Square-ish images
    {
      id: 'square-1',
      src: "/images/image copy 3.png", 
      alt: "Square format",
      description: "Conference presentation",
      aspectRatio: 595/596,
      highlight: true,
      objectPosition: "center center",
    },
    {
      id: 'square-2',
      src: "/images/image copy 5.png", 
      alt: "Vertical rectangle",
      description: "Team activity",
      aspectRatio: 317/470,
      highlight: false,
      objectPosition: "center center",
    },
    // Landscape format images - large
    {
      id: 'landscape-1',
      src: "/images/image copy 2.png", 
      alt: "Large landscape",
      description: "Group photo",
      aspectRatio: 1170/858,
      highlight: true,
      objectPosition: "center center",
    },
    // Landscape format images - medium
    {
      id: 'landscape-2',
      src: "/images/image copy 11.png", 
      alt: "Landscape format",
      description: "Team presentation",
      aspectRatio: 625/385,
      highlight: false,
      objectPosition: "center center",
    },
    {
      id: 'landscape-3',
      src: "/images/image copy 12.png", 
      alt: "Landscape format",
      description: "Award ceremony",
      aspectRatio: 622/381,
      highlight: false,
      objectPosition: "center center",
    },
    {
      id: 'landscape-4',
      src: "/images/image copy 18.png", 
      alt: "Landscape format",
      description: "Conference discussion",
      aspectRatio: 624/416,
      highlight: false,
      objectPosition: "center center",
    },
    {
      id: 'landscape-5',
      src: "/images/image copy 19.png", 
      alt: "Landscape format",
      description: "Project presentation",
      aspectRatio: 618/426,
      highlight: false,
      objectPosition: "center center",
    },
    // More balanced aspect ratios
    {
      id: 'balanced-1',
      src: "/images/image copy 13.png", 
      alt: "Balanced format",
      description: "Team discussion",
      aspectRatio: 450/442,
      highlight: false,
      objectPosition: "center center",
    },
    {
      id: 'balanced-2',
      src: "/images/image copy 14.png", 
      alt: "Balanced format",
      description: "Award ceremony",
      aspectRatio: 566/439,
      highlight: false,
      objectPosition: "center center",
    },
    {
      id: 'balanced-3',
      src: "/images/image copy 16.png", 
      alt: "Balanced format",
      description: "Conference presentation",
      aspectRatio: 604/440,
      highlight: false,
      objectPosition: "center center",
    },
    {
      id: 'balanced-4',
      src: "/images/image copy 17.png", 
      alt: "Balanced format",
      description: "Group discussion",
      aspectRatio: 558/441,
      highlight: false,
      objectPosition: "center center",
    },
    {
      id: 'balanced-5',
      src: "/images/image copy 20.png", 
      alt: "Balanced format",
      description: "Team activity",
      aspectRatio: 601/434,
      highlight: false,
      objectPosition: "center center",
    },
    // WhatsApp images with varied aspects
    {
      id: 'whatsapp-1',
      src: "/images/WhatsApp Image 2025-05-15 at 5.20.45 PM (3).jpeg", 
      alt: "Portrait format",
      description: "Team celebration",
      aspectRatio: 960/1280,
      highlight: false,
      objectPosition: "center center",
    },
    {
      id: 'whatsapp-2',
      src: "/images/WhatsApp Image 2025-05-15 at 5.20.45 PM (4).jpeg", 
      alt: "Portrait format",
      description: "Award recognition",
      aspectRatio: 960/1280,
      highlight: false,
      objectPosition: "center center",
    },
    {
      id: 'whatsapp-3',
      src: "/images/WhatsApp Image 2025-05-15 at 5.20.45 PM (7).jpeg", 
      alt: "Portrait format",
      description: "Conference participation",
      aspectRatio: 960/1280,
      highlight: false,
      objectPosition: "center center",
    },
    {
      id: 'whatsapp-4',
      src: "/images/WhatsApp Image 2025-05-15 at 5.20.44 PM (2).jpeg", 
      alt: "Landscape format",
      description: "Team photo",
      aspectRatio: 1280/960,
      highlight: true,
      objectPosition: "center center",
    },
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
    <>
      <MediaModal media={selectedMedia} onClose={() => setSelectedMedia(null)} />
      
      <div className="pt-20 container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-darkPink mb-4 leading-tight">
              Awards & Pics
            </h2>
            <p className="text-darkPink/70 text-lg max-w-3xl mx-auto mb-6">
              A visual showcase of my achievements, collaborations, and memorable moments from various events, competitions, and projects.
            </p>
          </div>

          {/* Section Navigation Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <button 
              onClick={() => scrollToElement('academic-timeline')}
              className="px-4 py-2 bg-white/70 hover:bg-white text-darkPink border border-darkPink/20 rounded-full text-sm font-medium transition-all duration-300 shadow-sm hover:shadow"
            >
              School Education
            </button>
            <button 
              onClick={() => scrollToElement('india-book-records-section')}
              className="px-4 py-2 bg-white/70 hover:bg-white text-darkPink border border-darkPink/20 rounded-full text-sm font-medium transition-all duration-300 shadow-sm hover:shadow"
            >
              Book of Records
            </button>
            <button 
              onClick={() => scrollToElement('college-timeline')}
              className="px-4 py-2 bg-white/70 hover:bg-white text-darkPink border border-darkPink/20 rounded-full text-sm font-medium transition-all duration-300 shadow-sm hover:shadow"
            >
              College Education
            </button>
            <button 
              onClick={() => scrollToElement('photo-collage')}
              className="px-4 py-2 bg-white/70 hover:bg-white text-darkPink border border-darkPink/20 rounded-full text-sm font-medium transition-all duration-300 shadow-sm hover:shadow"
            >
              Photo Collage
            </button>
            {/* Add more buttons as needed */}
          </div>

          <div className="space-y-24">
            {/* SCHOOL TIMELINE */}
            <div id="academic-timeline" className="border-2 border-darkPink/20 p-6 md:p-8 rounded-2xl bg-white/50 backdrop-blur-sm mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <h3 className="text-2xl font-bold text-darkPink mb-6 text-center">
                  My Academic Journey
                </h3>
                <AcademicTimeline className="mt-4" />
              </motion.div>
            </div>

            {/* DID SOMETHING CRAZY SECTION */}
            <div id="india-book-records-section" className="border-2 border-darkPink/20 p-6 md:p-8 rounded-2xl bg-white/50 backdrop-blur-sm mb-24">
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

            {/* COLLEGE TIMELINE */}
            <div id="college-timeline" className="border-2 border-darkPink/20 p-6 md:p-8 rounded-2xl bg-white/50 backdrop-blur-sm mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <h3 className="text-2xl font-bold text-darkPink mb-6 text-center">
                  College Education
                </h3>
                {/* We're reusing the AcademicTimeline component here, but it will show only the college timeline based on our redesign */}
                <AcademicTimeline className="mt-4" />
              </motion.div>
            </div>
            
            {/* PHOTO COLLAGE SECTION */}
            <div id="photo-collage" className="border-2 border-darkPink/20 p-6 md:p-8 rounded-2xl bg-white/50 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <h3 className="text-3xl font-bold text-darkPink mb-4 text-center">
                  Photo Collage
                </h3>
                <p className="text-darkPink/70 text-center max-w-3xl mx-auto mb-10">
                  A collection of moments from various events, competitions and collaborations that have shaped my journey.
                </p>

                <ResponsiveMasonry
                  columnsCountBreakPoints={{ 350: 1, 500: 2, 900: 3, 1200: 4 }}
                >
                  <Masonry gutter="16px">
                    {collageGallery.map((item, index) => (
                      <motion.div
                        key={`collage-${item.id}`}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.05 }}
                        className={`relative group rounded-xl overflow-hidden shadow-md hover:shadow-xl cursor-pointer ${item.highlight ? 'col-span-2' : ''}`}
                        onClick={() => setSelectedMedia({src: item.src, type: 'image'})}
                        style={item.highlight ? { gridColumn: 'span 2' } : {}}
                      >
                        <div className="overflow-hidden" style={{ 
                          maxHeight: item.highlight ? '600px' : '450px'
                        }}>
                          <img 
                            src={item.src} 
                            alt={item.alt} 
                            className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                            style={{ 
                              aspectRatio: typeof item.aspectRatio === 'number' ? item.aspectRatio : 'auto',
                              objectPosition: item.objectPosition || 'center center'
                            }}
                            onLoad={handleImageLoaded}
                          />
                          
                          {item.description && (
                            <div className="absolute inset-0 flex items-end justify-center p-4 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <p className="text-white text-center text-sm font-medium">{item.description}</p>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </Masonry>
                </ResponsiveMasonry>
              </motion.div>
            </div>

            {/* OTHER PROJECT SECTIONS REMAIN THE SAME */}
            {/* Synapse section, CleanTech section, etc. */}
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default AwardsAndPics;