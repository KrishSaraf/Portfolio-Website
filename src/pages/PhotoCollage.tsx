import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

const PhotoCollage = () => {
  const [selectedMedia, setSelectedMedia] = useState<{src: string, type: 'image' | 'video', loop?: boolean} | null>(null);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const location = useLocation();
  
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

  // Featured gallery items with better metadata
  const featuredGallery = [
    // Highlight images first
    {
      id: 'basf',
      src: "/gallery/timeline/j.jpeg",
      alt: "BASF Team",
      description: "Team visit to BASF chemical company",
      aspectRatio: 1/1,
      highlight: false,
      objectPosition: "center center",
      maxHeight: 600
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
      aspectRatio: 3/4,
      highlight: true,
      objectPosition: "center center",
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
              Photo Collage
            </h2>
            <p className="text-darkPink/70 text-lg max-w-3xl mx-auto mb-6">
              A collection of moments from various events, competitions and collaborations that have shaped my journey.
            </p>
          </div>
          
          <div className="border-2 border-darkPink/20 p-6 md:p-8 rounded-2xl bg-white/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <ResponsiveMasonry
                columnsCountBreakPoints={{ 350: 1, 500: 2, 900: 3, 1200: 4 }}
              >
                <Masonry gutter="16px">
                  {/* Combining both collageGallery and featuredGallery */}
                  {[...collageGallery, ...featuredGallery].map((item, index) => (
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
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="absolute bottom-4 left-4 right-4 text-white">
                            <h4 className="font-medium">{item.alt}</h4>
                            <p className="text-sm text-white/80">{item.description}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </Masonry>
              </ResponsiveMasonry>
            </motion.div>
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

export default PhotoCollage; 