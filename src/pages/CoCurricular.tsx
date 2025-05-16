import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

const CoCurricular = () => {
  const [selectedMedia, setSelectedMedia] = useState<{src: string, type: 'image' | 'video', loop?: boolean} | null>(null);
  // Track when images are loaded for better UX feedback
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
      src: "/images/image copy 6.png", 
      alt: "Balanced format",
      description: "Award presentation",
      aspectRatio: 559/417,
      highlight: false,
      objectPosition: "center center",
    },
    // WhatsApp vertical images (very tall)
    {
      id: 'whatsapp-1',
      src: "/images/image copy 8.png", 
      alt: "WhatsApp format",
      description: "Special moment",
      aspectRatio: 364/800,
      highlight: false,
      objectPosition: "center center",
    },
    {
      id: 'whatsapp-2',
      src: "/images/image copy 9.png", 
      alt: "WhatsApp format",
      description: "Group celebration",
      aspectRatio: 368/794,
      highlight: false,
      objectPosition: "center center",
    },
    {
      id: 'featured-1',
      src: '/images/certificate.jpg',
      alt: 'Academic certificates and medals',
      description: 'Academic achievements and recognitions',
      aspectRatio: 1.33,
      highlight: true,
      objectPosition: 'center center',
      maxHeight: 650
    },
    {
      id: 'featured-2',
      src: '/images/medals.jpg',
      alt: 'Competition medals collection',
      description: 'Medals from various competitions',
      aspectRatio: 1.5,
      highlight: false,
      objectPosition: 'center center',
      maxHeight: 400
    },
    {
      id: 'featured-3',
      src: '/images/school-certificate.jpg',
      alt: 'School achievement certificate',
      description: 'Academic excellence certificate',
      aspectRatio: 1.33,
      highlight: false,
      objectPosition: 'center center',
      maxHeight: 550
    },
    {
      id: 'featured-4',
      src: '/images/appreciation.jpg',
      alt: 'Community appreciation award',
      description: 'Recognition for community service',
      aspectRatio: 1.5,
      highlight: false,
      objectPosition: 'center center',
      maxHeight: 650
    }
  ];

  // Increment loaded images counter
  const handleImageLoaded = () => {
    setImagesLoaded(prev => prev + 1);
  };

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
    <section className="pb-20 relative overflow-hidden bg-gradient-to-b from-white via-pink-50 to-pink-100">
      <div className="pt-20 container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-darkPink mb-4 leading-tight">
              Co-curricular
            </h2>
            <p className="text-darkPink/70 text-lg max-w-3xl mx-auto mb-6">
              A visual showcase of my achievements, collaborations, and memorable moments from various events, competitions, and projects.
            </p>
            
            {/* Loading progress indicator - visible only during initial loading */}
            {imagesLoaded < collageGallery.length && (
              <div className="w-full max-w-md mx-auto bg-pink-100 rounded-full h-2.5 mb-6 overflow-hidden">
                <div 
                  className="bg-darkPink h-2.5 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${Math.min(100, Math.round((imagesLoaded / collageGallery.length) * 100))}%` }}
                ></div>
                <p className="text-xs text-darkPink/60 mt-1">Loading gallery: {Math.min(100, Math.round((imagesLoaded / collageGallery.length) * 100))}%</p>
              </div>
            )}
          </div>

          <div className="space-y-24">
            {/* Photo Collage Section */}
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
                          aspectRatio: `${item.aspectRatio}`,
                          maxHeight: item.highlight ? '600px' : '450px'
                        }}>
                          <img 
                            src={item.src} 
                            alt={item.alt}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            style={{ objectPosition: item.objectPosition || 'center' }}
                            onLoad={handleImageLoaded}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </Masonry>
                </ResponsiveMasonry>
              </motion.div>
            </div>
          </div>
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

export default CoCurricular; 