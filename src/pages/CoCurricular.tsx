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
    // Very wide landscape images
    {
      id: 'wide-1',
      src: "/images/image copy 4.png", 
      alt: "Conference presentation",
      description: "Conference presentation",
      aspectRatio: 843/226, // 3.73:1 ratio - very wide
      highlight: true,
      objectPosition: "center center",
    },
    
    // Landscape images (width > height)
    {
      id: 'landscape-1',
      src: "/images/image copy 2.png", 
      alt: "Group photo",
      description: "Group photo",
      aspectRatio: 1170/858, // 1.36:1 ratio
      highlight: true,
      objectPosition: "center center",
    },
    {
      id: 'landscape-2',
      src: "/images/image copy 11.png", 
      alt: "Team presentation",
      description: "Team presentation",
      aspectRatio: 625/385, // 1.62:1 ratio
      highlight: false,
      objectPosition: "center center",
    },
    {
      id: 'landscape-3',
      src: "/images/image copy 12.png", 
      alt: "Award ceremony",
      description: "Award ceremony",
      aspectRatio: 622/381, // 1.63:1 ratio
      highlight: false,
      objectPosition: "center center",
    },
    {
      id: 'landscape-4',
      src: "/images/image copy 18.png", 
      alt: "Conference discussion",
      description: "Conference discussion",
      aspectRatio: 624/416, // 1.5:1 ratio
      highlight: false,
      objectPosition: "center center",
    },
    {
      id: 'landscape-5',
      src: "/images/image copy 19.png", 
      alt: "Project presentation",
      description: "Project presentation",
      aspectRatio: 618/426, // 1.45:1 ratio
      highlight: false,
      objectPosition: "center center",
    },
    {
      id: 'landscape-6',
      src: "/images/image copy 20.png", 
      alt: "Academic recognition",
      description: "Academic recognition",
      aspectRatio: 601/434, // 1.38:1 ratio
      highlight: false,
      objectPosition: "center center",
    },
    {
      id: 'landscape-7',
      src: "/images/image copy 22.png", 
      alt: "Award ceremony",
      description: "Award ceremony",
      aspectRatio: 583/438, // 1.33:1 ratio
      highlight: false,
      objectPosition: "center center",
    },
    {
      id: 'landscape-8',
      src: "/images/image copy 23.png", 
      alt: "Special recognition",
      description: "Special recognition",
      aspectRatio: 493/444, // 1.11:1 ratio - nearly square but wider
      highlight: false,
      objectPosition: "center center",
    },
    {
      id: 'landscape-9',
      src: "/images/image copy 26.png", 
      alt: "Educational recognition",
      description: "Educational recognition",
      aspectRatio: 776/517, // 1.5:1 ratio
      highlight: false,
      objectPosition: "center center",
    },
    {
      id: 'landscape-10',
      src: "/images/image copy 27.png", 
      alt: "School certificate",
      description: "School certificate",
      aspectRatio: 926/868, // 1.07:1 ratio - nearly square
      highlight: true, // Larger, more important image
      objectPosition: "center center",
    },
    {
      id: 'landscape-11',
      src: "/images/image copy 28.png", 
      alt: "Achievement award",
      description: "Achievement award",
      aspectRatio: 742/493, // 1.5:1 ratio
      highlight: false,
      objectPosition: "center center",
    },
    {
      id: 'landscape-12',
      src: "/images/image copy 29.png", 
      alt: "Recognition certificate",
      description: "Recognition certificate",
      aspectRatio: 574/402, // 1.43:1 ratio
      highlight: false,
      objectPosition: "center center",
    },
    {
      id: 'landscape-13',
      src: "/images/image copy 6.png", 
      alt: "Award presentation",
      description: "Award presentation",
      aspectRatio: 467/294, // 1.59:1 ratio
      highlight: false,
      objectPosition: "center center",
    },
    {
      id: 'landscape-14',
      src: "/images/image copy 8.png", 
      alt: "Special moment",
      description: "Special moment",
      aspectRatio: 495/403, // 1.23:1 ratio
      highlight: false,
      objectPosition: "center center",
    },
    {
      id: 'landscape-15',
      src: "/images/image copy 9.png", 
      alt: "Group celebration",
      description: "Group celebration",
      aspectRatio: 566/386, // 1.47:1 ratio
      highlight: false,
      objectPosition: "center center",
    },
    
    // Nearly square images (width ≈ height)
    {
      id: 'square-1',
      src: "/images/image copy 3.png", 
      alt: "Conference presentation",
      description: "Conference presentation",
      aspectRatio: 595/596, // 1:1 ratio - almost perfectly square
      highlight: true,
      objectPosition: "center center",
    },
    {
      id: 'square-2',
      src: "/images/image copy 13.png", 
      alt: "Team discussion",
      description: "Team discussion",
      aspectRatio: 450/442, // 1.02:1 ratio - very close to square
      highlight: false,
      objectPosition: "center center",
    },
    {
      id: 'square-3',
      src: "/images/image copy 14.png", 
      alt: "Award ceremony",
      description: "Award ceremony",
      aspectRatio: 566/439, // 1.29:1 ratio - slightly wider than tall but close to square
      highlight: false,
      objectPosition: "center center",
    },
    {
      id: 'square-4',
      src: "/images/image copy 16.png", 
      alt: "Conference presentation",
      description: "Conference presentation",
      aspectRatio: 604/440, // 1.37:1 ratio
      highlight: false,
      objectPosition: "center center",
    },
    {
      id: 'square-5',
      src: "/images/image copy 17.png", 
      alt: "Group discussion",
      description: "Group discussion",
      aspectRatio: 558/441, // 1.27:1 ratio
      highlight: false,
      objectPosition: "center center",
    },
    {
      id: 'square-6',
      src: "/images/image copy 24.png", 
      alt: "Certificate of achievement",
      description: "Certificate of achievement",
      aspectRatio: 420/453, // 0.93:1 ratio - slightly taller than wide
      highlight: false,
      objectPosition: "center center",
    },
    
    // Portrait images (height > width)
    {
      id: 'portrait-1',
      src: "/images/image copy 10.png", 
      alt: "Award ceremony",
      description: "Award ceremony",
      aspectRatio: 442/610, // 0.72:1 ratio
      highlight: false,
      objectPosition: "center center",
    },
    {
      id: 'portrait-2',
      src: "/images/image copy 15.png", 
      alt: "Team presentation",
      description: "Team presentation",
      aspectRatio: 442/559, // 0.79:1 ratio
      highlight: false,
      objectPosition: "center center",
    },
    {
      id: 'portrait-3',
      src: "/images/image copy 21.png", 
      alt: "Team celebration",
      description: "Team celebration",
      aspectRatio: 433/487, // 0.89:1 ratio
      highlight: false,
      objectPosition: "center center",
    },
    {
      id: 'portrait-4',
      src: "/images/image copy 25.png", 
      alt: "Academic accomplishment",
      description: "Academic accomplishment",
      aspectRatio: 609/512, // 1.19:1 ratio - wider than tall but still portrait-like
      highlight: false,
      objectPosition: "center center",
    },
    {
      id: 'portrait-5',
      src: "/images/image copy 5.png", 
      alt: "Team activity",
      description: "Team activity",
      aspectRatio: 317/470, // 0.67:1 ratio
      highlight: false,
      objectPosition: "center center",
    },
    {
      id: 'portrait-6',
      src: "/images/image copy 7.png", 
      alt: "Conference participation",
      description: "Conference participation",
      aspectRatio: 385/568, // 0.68:1 ratio
      highlight: false,
      objectPosition: "center center",
    },
    {
      id: 'portrait-7',
      src: "/images/image copy.png", 
      alt: "Award recognition",
      description: "Award recognition",
      aspectRatio: 385/594, // 0.65:1 ratio
      highlight: false,
      objectPosition: "center center",
    },
    {
      id: 'portrait-8',
      src: "/images/image.png", 
      alt: "Team photo",
      description: "Team photo",
      aspectRatio: 437/600, // 0.73:1 ratio
      highlight: false,
      objectPosition: "center center",
    },
    
    // WhatsApp images with specific dimensions
    {
      id: 'whatsapp-landscape-1',
      src: "/images/WhatsApp Image 2025-05-15 at 5.20.44 PM (2).jpeg", 
      alt: "Team photo",
      description: "Team photo",
      aspectRatio: 1280/960, // 1.33:1 ratio
      highlight: true,
      objectPosition: "center center",
    },
    {
      id: 'whatsapp-landscape-2',
      src: "/images/WhatsApp Image 2025-05-15 at 5.20.44 PM (3).jpeg", 
      alt: "Group activity",
      description: "Group activity",
      aspectRatio: 1280/960, // 1.33:1 ratio
      highlight: false,
      objectPosition: "center center",
    },
    {
      id: 'whatsapp-portrait-1',
      src: "/images/WhatsApp Image 2025-05-15 at 5.20.44 PM.jpeg", 
      alt: "Portrait format",
      description: "Special event",
      aspectRatio: 537/580, // 0.93:1 ratio - nearly square but taller
      highlight: false,
      objectPosition: "center center",
    },
    {
      id: 'whatsapp-landscape-3',
      src: "/images/WhatsApp Image 2025-05-15 at 5.20.45 PM (1).jpeg", 
      alt: "Landscape format",
      description: "Team event",
      aspectRatio: 1280/853, // 1.5:1 ratio
      highlight: false,
      objectPosition: "center center",
    },
    {
      id: 'whatsapp-landscape-4',
      src: "/images/WhatsApp Image 2025-05-15 at 5.20.45 PM (2).jpeg", 
      alt: "Landscape format",
      description: "Award ceremony",
      aspectRatio: 1280/853, // 1.5:1 ratio
      highlight: false,
      objectPosition: "center center",
    },
    {
      id: 'whatsapp-portrait-2',
      src: "/images/WhatsApp Image 2025-05-15 at 5.20.45 PM (3).jpeg", 
      alt: "Portrait format",
      description: "Team celebration",
      aspectRatio: 960/1280, // 0.75:1 ratio - distinctly portrait
      highlight: false,
      objectPosition: "center center",
    },
    {
      id: 'whatsapp-portrait-3',
      src: "/images/WhatsApp Image 2025-05-15 at 5.20.45 PM (4).jpeg", 
      alt: "Portrait format",
      description: "Award recognition",
      aspectRatio: 960/1280, // 0.75:1 ratio
      highlight: false,
      objectPosition: "center center",
    },
    {
      id: 'whatsapp-square',
      src: "/images/WhatsApp Image 2025-05-15 at 5.20.45 PM (5).jpeg", 
      alt: "Square format",
      description: "Special moment",
      aspectRatio: 898/882, // 1.02:1 ratio - very close to square
      highlight: false,
      objectPosition: "center center",
    },
    {
      id: 'whatsapp-landscape-5',
      src: "/images/WhatsApp Image 2025-05-15 at 5.20.45 PM (6).jpeg", 
      alt: "Landscape format",
      description: "Team discussion",
      aspectRatio: 828/607, // 1.36:1 ratio
      highlight: false,
      objectPosition: "center center",
    },
    {
      id: 'whatsapp-portrait-4',
      src: "/images/WhatsApp Image 2025-05-15 at 5.20.45 PM (7).jpeg", 
      alt: "Portrait format",
      description: "Conference participation",
      aspectRatio: 960/1280, // 0.75:1 ratio
      highlight: false,
      objectPosition: "center center",
    },
    // {
    //   id: 'whatsapp-portrait-5',
    //   src: "/images/WhatsApp Image 2025-05-15 at 5.20.45 PM (8).jpeg", 
    //   alt: "Tall portrait format",
    //   description: "Special achievement",
    //   aspectRatio: 736/1280, // 0.57:1 ratio - very tall and narrow
    //   highlight: false,
    //   objectPosition: "center center",
    // },
    {
      id: 'whatsapp-landscape-6',
      src: "/images/WhatsApp Image 2025-05-15 at 5.20.45 PM (9).jpeg", 
      alt: "Landscape format",
      description: "Team collaboration",
      aspectRatio: 1280/960, // 1.33:1 ratio
      highlight: false,
      objectPosition: "center center",
    },
    {
      id: 'whatsapp-landscape-7',
      src: "/images/WhatsApp Image 2025-05-15 at 5.20.45 PM.jpeg", 
      alt: "Landscape format",
      description: "Group discussion",
      aspectRatio: 1280/853, // 1.5:1 ratio
      highlight: false,
      objectPosition: "center center",
    },
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
            A visual snapshot of my journey beyond academics—12+ years of elocution, state-level tennis tournaments, kickboxing championship gold, school tennis captaincy, and a drama play close to my heart. 
            <br></br>
            <br></br>
            <br></br>
            You'll also find my scuba diving certification, a letter from the Chief Minister  and even a glimpse into a startup that didn't take off—but taught me plenty. From adventure trips to community leadership, it's all here.            </p>
            
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
                  GALLERY
                </h3>
                <p className="text-darkPink/70 text-center max-w-3xl mx-auto mb-10">
                  {/* A collection of moments from various events, competitions and collaborations that have shaped my journey. */}
                </p>

                <ResponsiveMasonry
                  columnsCountBreakPoints={{ 350: 1, 500: 2, 750: 3, 1100: 4 }}
                >
                  <Masonry gutter="12px">
                    {[
                      // Reorder the images to better fill the space
                      // First put some key wide images at the top
                      ...collageGallery.filter(item => item.id === 'wide-1' || item.id === 'landscape-1'),
                      // Follow with portrait images to fill vertical space
                      ...collageGallery.filter(item => 
                        item.id.startsWith('portrait') && 
                        item.id !== 'portrait-5' && 
                        item.id !== 'portrait-8'
                      ),
                      // Then some square images
                      ...collageGallery.filter(item => item.id.startsWith('square')),
                      // Remaining landscape images
                      ...collageGallery.filter(item => 
                        item.id.startsWith('landscape') && 
                        item.id !== 'landscape-1'
                      ),
                      // Move portrait-5 and portrait-8 to the end to fill the bottom left
                      ...collageGallery.filter(item => item.id === 'portrait-5' || item.id === 'portrait-8'),
                      // WhatsApp images at the end
                      ...collageGallery.filter(item => item.id.startsWith('whatsapp'))
                    ].map((item, index) => (
                      <motion.div
                        key={`collage-${item.id}`}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: Math.min(0.5, index * 0.03) }}
                        className={`relative group rounded-xl overflow-hidden shadow-md hover:shadow-xl cursor-pointer ${item.highlight ? 'col-span-2' : ''}`}
                        onClick={() => setSelectedMedia({src: item.src, type: 'image'})}
                        style={item.highlight ? { gridColumn: 'span 2' } : {}}
                      >
                        <div className="overflow-hidden" style={{ 
                          aspectRatio: `${item.aspectRatio}`,
                          maxHeight: item.highlight ? '500px' : '400px'
                        }}>
                          <img 
                            src={item.src} 
                            alt={item.alt}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            style={{ objectPosition: item.objectPosition || 'center' }}
                            onLoad={handleImageLoaded}
                            loading="lazy"
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