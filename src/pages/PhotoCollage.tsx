import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

interface PhotoItemProps {
  id: string;
  src: string;
  alt: string;
  description: string;
  aspectRatio: number;
  highlight?: boolean;
  objectPosition?: string;
  maxHeight?: number;
}

const PhotoCollage = () => {
  const [selectedMedia, setSelectedMedia] = useState<{src: string, type: 'image' | 'video', loop?: boolean} | null>(null);
  
  // Sample gallery items
  const galleryItems: PhotoItemProps[] = [
    {
      id: 'sample-1',
      src: "/images/sample1.jpg",
      alt: "Sample image 1",
      description: "Sample description",
      aspectRatio: 4/3,
      highlight: false,
      objectPosition: "center center",
    },
    // Add more items as needed
  ];
  
  // Track image loading for performance optimization
  const handleImageLoaded = () => {
    // Implementation can be added if needed
  };
  
  // Media modal component for displaying fullscreen images
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
                className="absolute top-4 right-4 bg-gray-800/80 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors duration-300"
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
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">Photo Gallery</h2>
        
        <ResponsiveMasonry
          columnsCountBreakPoints={{ 350: 1, 500: 2, 900: 3, 1200: 4 }}
        >
          <Masonry gutter="16px">
            {galleryItems.map((item, index) => (
              <motion.div
                key={`gallery-${item.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
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
      </div>
      
      {/* Modal for showing selected media */}
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