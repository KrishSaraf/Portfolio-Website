import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, Link, useSearchParams } from 'react-router-dom';

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
  const featuredGallery = [
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

  // Combine both collageGallery and featuredGallery to get total count
  const totalImagesToLoad = featuredGallery.length;
  
  // Percentage of images loaded for progress indicator
  const loadingProgress = totalImagesToLoad > 0 
    ? Math.min(100, Math.round((imagesLoaded / totalImagesToLoad) * 100)) 
    : 100;

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
    <section className="pb-20 relative overflow-hidden bg-gradient-to-b from-white via-pink-50 to-pink-100">
      <div className="pt-20 container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-darkPink mb-4 leading-tight">
              Journey
            </h2>
            <p className="text-darkPink/70 text-lg max-w-3xl mx-auto mb-6">
              A visual showcase of my achievements, collaborations, and memorable moments from various events, competitions, and projects.
            </p>
            
            {/* Loading progress indicator - visible only during initial loading */}
            {loadingProgress < 100 && (
              <div className="w-full max-w-md mx-auto bg-pink-100 rounded-full h-2.5 mb-6 overflow-hidden">
                <div 
                  className="bg-darkPink h-2.5 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${loadingProgress}%` }}
                ></div>
                <p className="text-xs text-darkPink/60 mt-1">Loading gallery: {loadingProgress}%</p>
              </div>
            )}
          </div>

          {/* Navigation to sections */}
            
          <div className="space-y-24">
            {/* Academic Journey Timeline */}
            <div className="border-2 border-darkPink/20 p-6 md:p-10 rounded-2xl bg-white/60 backdrop-blur-sm mb-24">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <h3 className="text-4xl font-extrabold text-darkPink text-center mb-8">
                  School Ranks
                </h3>
                
                {/* Desktop Timeline (hidden on mobile) */}
                <div className="hidden md:block mb-10">
                  <div className="relative mx-auto max-w-6xl px-8">
                    {/* Journey Path Container */}
                    <div className="flex flex-wrap justify-center gap-4">
                      {[
                        { class: "Class 1", achievement: "3rd" },
                        { class: "Class 2", achievement: "1st" },
                        { class: "Class 3", achievement: "2nd" },
                        { class: "Class 4", achievement: "2nd" },
                        { class: "Class 5", achievement: "1st" },
                        { class: "Class 6", achievement: "2nd" },
                        { class: "Class 7", achievement: "2nd" },
                        { class: "Class 8", achievement: "3rd" },
                        { class: "Class 9", achievement: "3rd" },
                        { class: "Class 10", achievement: "98.2% — All India Rank 7" },
                        { class: "Class 11", achievement: "1st in Class" },
                        { class: "Class 12", achievement: "99% — All India Rank 4" }
                      ].map((item, index) => (
                  <motion.div
                          key={`desktop-journey-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                    transition={{ 
                      duration: 0.5, 
                            delay: index * 0.08,
                            type: "spring",
                            stiffness: 100
                          }}
                          className={`
                            relative rounded-xl overflow-hidden
                            ${index === 9 || index === 11 ? "transform origin-center hover:-rotate-1" : "hover:scale-105"}
                            transition-all duration-300 hover:shadow-lg z-10
                          `}
                        >
                          {/* Connection line to next card */}
                          {index < 11 && (
                            <div className="absolute top-1/2 right-0 w-8 h-0.5 bg-pink-200 transform translate-x-4 z-0"></div>
                          )}
                          
                          <div className={`
                            p-4 min-w-[100px] relative
                            ${index === 9 || index === 11 ? 
                              "bg-gradient-to-br from-yellow-50 to-yellow-100 border-2 border-yellow-300 shadow-md" : 
                              "bg-white border border-pink-200"
                            }
                            ${index < 5 ? "border-l-4 border-l-pink-300" : ""}
                            ${index >= 5 && index < 9 ? "border-l-4 border-l-pink-400" : ""}
                            ${index === 9 ? "border-l-4 border-l-amber-400" : ""}
                            ${index === 10 ? "border-l-4 border-l-pink-500" : ""}
                            ${index === 11 ? "border-l-4 border-l-amber-500" : ""}
                          `}>
                            <h4 className={`
                              text-center font-bold mb-1
                              ${index === 9 || index === 11 ? "text-amber-800" : "text-darkPink"}
                            `}>
                              {item.class}
                            </h4>
                            <p className={`
                              text-sm text-center whitespace-nowrap
                              ${index === 9 || index === 11 ? "text-amber-700 font-medium" : "text-gray-600"}
                            `}>
                              {item.achievement}
                            </p>
                            
                            {/* Visual progress indicator */}
                            <div className={`
                              absolute bottom-0 left-0 right-0 h-1
                              ${index === 9 || index === 11 ? "bg-gradient-to-r from-amber-300 to-amber-400" : "bg-gradient-to-r from-pink-200 to-pink-300"}
                            `}></div>
                        </div>
                        </motion.div>
                      ))}
                      </div>
                  </div>
                </div>
                
                {/* Mobile Timeline (visible only on mobile) */}
                <div className="md:hidden mb-8">
                  <div className="relative max-w-xs mx-auto">
                    {/* Vertical journey path */}
                    <div className="absolute w-1 bg-gradient-to-b from-pink-200 via-pink-400 to-pink-500 top-2 bottom-2 left-4 rounded-full"></div>
                    
                    {/* Journey Items */}
                    <div className="space-y-3">
                      {[
                        { class: "Class 1", achievement: "3rd" },
                        { class: "Class 2", achievement: "1st" },
                        { class: "Class 3", achievement: "2nd" },
                        { class: "Class 4", achievement: "2nd" },
                        { class: "Class 5", achievement: "1st" },
                        { class: "Class 6", achievement: "2nd" },
                        { class: "Class 7", achievement: "2nd" },
                        { class: "Class 8", achievement: "3rd" },
                        { class: "Class 9", achievement: "3rd" },
                        { class: "Class 10", achievement: "98.2% — All India Rank 7" },
                        { class: "Class 11", achievement: "1st in Class" },
                        { class: "Class 12", achievement: "99% — All India Rank 4" }
                      ].map((item, index) => (
                        <motion.div 
                          key={`mobile-journey-${index}`}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ 
                            duration: 0.4, 
                            delay: index * 0.06,
                            type: "spring",
                            stiffness: 100
                          }}
                          className="relative pl-8 pr-2"
                        >
                          {/* Connection to timeline */}
                          <div className="absolute left-4 top-1/2 w-4 h-0.5 bg-pink-200 transform -translate-y-1/2"></div>
                          
                          {/* Timeline marker */}
                          <div className={`
                            absolute left-[9px] top-1/2 w-3 h-3 rounded-full border bg-white transform -translate-y-1/2 z-10
                            ${index === 9 || index === 11 ? "border-amber-400" : "border-pink-300"}
                          `}></div>
                          
                          <div className={`
                            p-3 rounded-lg shadow-sm border transition-all duration-300 hover:shadow-md relative
                            ${index === 9 || index === 11 ? 
                              "bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-300" : 
                              "bg-white border-pink-200"
                            }
                            ${index < 5 ? "border-l-4 border-l-pink-300" : ""}
                            ${index >= 5 && index < 9 ? "border-l-4 border-l-pink-400" : ""}
                            ${index === 9 ? "border-l-4 border-l-amber-400" : ""}
                            ${index === 10 ? "border-l-4 border-l-pink-500" : ""}
                            ${index === 11 ? "border-l-4 border-l-amber-500" : ""}
                          `}>
                            <div className="flex justify-between items-center">
                              <h4 className={`
                                font-bold text-sm
                                ${index === 9 || index === 11 ? "text-amber-800" : "text-darkPink"}
                              `}>
                                {item.class}
                              </h4>
                              <p className={`
                                text-sm font-medium 
                                ${index === 9 || index === 11 ? "text-amber-700" : "text-gray-600"}
                              `}>
                                {item.achievement}
                              </p>
                            </div>
                            
                            {/* Visual progress indicator */}
                            <div className={`
                              absolute bottom-0 left-0 right-0 h-1
                              ${index === 9 || index === 11 ? "bg-gradient-to-r from-amber-300 to-amber-400" : "bg-gradient-to-r from-pink-200 to-pink-300"}
                            `}></div>
                    </div>
                  </motion.div>
                ))}
                    </div>
                  </div>
          </div>

                <div className="text-center mt-6">
                  <p className="text-darkPink/70 italic font-medium">Ranked consistently among the top students throughout school years</p>
                </div>
              </motion.div>
            </div>
            
            {/* India Book of Records Section */}
            <div id="india-book-records-section" className="border-2 border-darkPink/20 p-6 md:p-10 rounded-2xl bg-white/60 backdrop-blur-sm mb-24">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <h3 className="text-4xl font-extrabold text-darkPink text-center mb-2">
                  Did Something Crazy
                </h3>
                <div className="flex flex-col items-center mb-8">
                  <span className="text-2xl sm:text-3xl font-bold text-pink-700 bg-pink-100 px-6 py-2 rounded-xl shadow mb-2 mt-2 text-center">
                    Got my name in the India Book of Records
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                  <div className="rounded-xl overflow-hidden shadow-lg border border-pink-200 bg-white">
                    <img 
                      src="/gallery/india-book-of-records.png" 
                      alt="India Book of Records Achievement" 
                      className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105 cursor-pointer"
                      onClick={() => setSelectedMedia({src: "/gallery/india-book-of-records.png", type: 'image'})}
                    />
                  </div>
                  <div className="flex flex-col items-center text-center space-y-6">
                    <div>
                      <h4 className="text-2xl font-bold text-darkPink mb-2">National Recognition</h4>
                      <p className="text-gray-700 mb-2">
                        {/* Honored to be recognized by the India Book of Records for exceptional achievement. This official acknowledgment represents dedication, commitment, and pushing boundaries. */}
                      </p>
                      <p className="text-gray-700 font-medium">
                        Didn't miss a single day of school for <span className="text-pink-700 font-bold">12 consecutive years</span>.
                      </p>
                    </div>
                    <a 
                      href="https://indiabookofrecords.in/krish-saraf-appreciation/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 justify-center px-6 py-3 bg-darkPink text-white rounded-xl hover:bg-pink-700 transition-colors font-medium group mt-2"
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

            {/* College Journey Section */}
            <div className="border-2 border-darkPink/20 p-6 md:p-10 rounded-2xl bg-white/60 backdrop-blur-sm mb-24">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <h3 className="text-4xl font-extrabold text-darkPink text-center mb-8">
                  University Ranks
                </h3>
                
                {/* CGPA Highlight */}
                <div className="max-w-xl mx-auto mb-10">
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-r from-amber-50 to-yellow-100 rounded-xl p-5 border-2 border-amber-300 shadow-lg"
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className="text-amber-800 text-sm font-medium uppercase tracking-wide mb-1">Current Cumulative Grade Point Average</div>
                      <div className="text-5xl font-bold text-amber-700 mb-2">4.84 / 5.00</div>
                      <div className="flex flex-wrap justify-center gap-3 mt-1">
                        <span className="bg-white px-3 py-1 rounded-full text-sm font-medium text-gray-700 shadow-sm">
                          Nanyang Technological University
                        </span>
                        <span className="bg-white px-3 py-1 rounded-full text-sm font-medium text-gray-700 shadow-sm">
                          Economics & Data Science
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Desktop College Timeline (hidden on mobile) */}
                <div className="hidden md:block mb-10">
                  <div className="relative mx-auto max-w-5xl px-8">
                    {/* Journey Path Container */}
                    <div className="flex flex-wrap justify-center gap-6">
                      {[
                        { 
                          year: "Year 1", 
                          semesters: [
                            { sem: "Semester 1", gpa: "4.69" },
                            { sem: "Semester 2", gpa: "4.87" }
                          ],
                          achievement: "Dean's List",
                          // details: "Perfect A/A+ in 11 of 12 courses"
                        },
                        { 
                          year: "Year 2", 
                          semesters: [
                            { sem: "Semester 1", gpa: "5.00" },
                            { sem: "Semester 2", gpa: "4.71" }
                          ],
                          achievement: "Dean's List",
                          details: ""
                        },
                        { 
                          year: "Year 3", 
                          semesters: [
                            { sem: "Semester 1", gpa: "4.92" }
                          ],
                          achievement: "Dean's List",
                          details: ""
                        },
                        { 
                          year: "Year 4", 
                          semesters: [],
                          achievement: "Ongoing",
                          details: ""
                        }
                      ].map((item, index) => (
                        <motion.div 
                          key={`college-desktop-${index}`}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ 
                            duration: 0.5, 
                            delay: index * 0.15,
                            type: "spring",
                            stiffness: 100
                          }}
                          className={`
                            relative rounded-xl overflow-hidden
                            ${index < 3 ? "hover:scale-105" : "hover:scale-105 opacity-80"}
                            transition-all duration-300 hover:shadow-lg z-10
                          `}
                        >
                          {/* Connection line to next card */}
                          {index < 3 && (
                            <div className="absolute top-1/2 right-0 w-12 h-0.5 bg-pink-200 transform translate-x-6 z-0"></div>
                          )}
                          
                          <div className={`
                            p-5 w-[180px] min-h-[180px] relative flex flex-col
                            bg-white border border-pink-200
                            ${index === 0 ? "border-l-4 border-l-pink-400" : ""}
                            ${index === 1 ? "border-l-4 border-l-pink-500" : ""}
                            ${index === 2 ? "border-l-4 border-l-pink-600" : ""}
                            ${index === 3 ? "border-l-4 border-l-pink-400 bg-pink-50/50" : ""}
                          `}>
                            <h4 className="text-center font-bold mb-2 text-darkPink">
                              {item.year}
                            </h4>
                            
                            <div className="bg-pink-50 rounded-lg p-2 mb-3">
                              <div className="text-center font-medium text-darkPink">
                                {item.achievement}
                              </div>
                            </div>
                            
                            {item.semesters.length > 0 ? (
                              <div className="space-y-1.5 mb-auto">
                                {item.semesters.map((sem, idx) => (
                                  <div key={`sem-${index}-${idx}`} className="flex justify-between text-xs">
                                    <span className="text-gray-500">{sem.sem}</span>
                                    <span className="font-medium text-darkPink">{sem.gpa}</span>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="text-center text-xs text-gray-500 mb-auto">
                                {item.achievement}
                              </div>
                            )}
                            
                            {item.details && (
                              <p className="text-xs text-center text-gray-600 mt-auto">
                                {item.details}
                              </p>
                            )}
                            
                            {/* Visual progress indicator */}
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-300 to-pink-400"></div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Mobile College Timeline (visible only on mobile) */}
                <div className="md:hidden mb-8">
                  <div className="relative max-w-xs mx-auto">
                    {/* Vertical journey path */}
                    <div className="absolute w-1 bg-gradient-to-b from-pink-300 via-pink-500 to-pink-600 top-2 bottom-2 left-4 rounded-full"></div>
                    
                    {/* Journey Items */}
                    <div className="space-y-6">
                      {[
                        { 
                          year: "Year 1", 
                          semesters: [
                            { sem: "Semester 1", gpa: "4.69" },
                            { sem: "Semester 2", gpa: "4.87" }
                          ],
                          achievement: "Dean's List",
                          details: "Perfect A/A+ in 11 of 12 courses"
                        },
                        { 
                          year: "Year 2", 
                          semesters: [
                            { sem: "Semester 1", gpa: "5.00" },
                            { sem: "Semester 2", gpa: "4.71" }
                          ],
                          achievement: "Dean's List",
                          // details: "5.00 GPA in Semester 1"
                        },
                        { 
                          year: "Year 3", 
                          semesters: [
                            { sem: "Semester 1", gpa: "4.92" }
                          ],
                          achievement: "Dean's List",
                          details: ""
                        },
                        { 
                          year: "Year 4", 
                          semesters: [],
                          achievement: "Ongoing",
                          details: ""
                        }
                      ].map((item, index) => (
                        <motion.div 
                          key={`college-mobile-${index}`}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ 
                            duration: 0.4, 
                            delay: index * 0.1,
                            type: "spring",
                            stiffness: 100
                          }}
                          className={`relative pl-8 pr-2 ${index === 3 ? "opacity-80" : ""}`}
                        >
                          {/* Connection to timeline */}
                          <div className="absolute left-4 top-1/2 w-4 h-0.5 bg-pink-200 transform -translate-y-1/2"></div>
                          
                          {/* Timeline marker */}
                          <div className="absolute left-[9px] top-1/2 w-3 h-3 rounded-full border border-pink-300 bg-white transform -translate-y-1/2 z-10"></div>
                          
                          <div className={`
                            p-4 rounded-lg shadow-sm border border-pink-200 transition-all duration-300 hover:shadow-md relative
                            ${index === 0 ? "border-l-4 border-l-pink-400" : ""}
                            ${index === 1 ? "border-l-4 border-l-pink-500" : ""}
                            ${index === 2 ? "border-l-4 border-l-pink-600" : ""}
                            ${index === 3 ? "border-l-4 border-l-pink-400 bg-pink-50/50" : ""}
                            ${index === 3 ? "bg-pink-50/50" : "bg-white"}
                          `}>
                            <div className="flex justify-between items-center mb-2">
                              <h4 className="font-bold text-darkPink">{item.year}</h4>
                              <span className="px-2 py-0.5 bg-pink-100 text-pink-700 rounded-md text-xs font-medium">
                                {item.achievement}
                              </span>
                            </div>
                            
                            {item.semesters.length > 0 ? (
                              <div className="space-y-1 mb-2 text-xs">
                                {item.semesters.map((sem, idx) => (
                                  <div key={`sem-mobile-${index}-${idx}`} className="flex justify-between">
                                    <span className="text-gray-500">{sem.sem}</span>
                                    <span className="font-medium text-darkPink">{sem.gpa}</span>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="text-xs text-gray-500 mb-2">
                                {item.achievement}
                              </div>
                            )}
                            
                            {item.details && (
                              <p className="text-xs text-gray-600">{item.details}</p>
                            )}
                            
                            {/* Visual progress indicator */}
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-300 to-pink-400"></div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="text-center mt-6">
                  <p className="text-darkPink/70 italic font-medium">Working hard & Trying to maintain the Attendance Record haha</p>
                </div>
              </motion.div>
            </div>
            
            {/* Keep other original project sections with BackToProjectButton */}
            {/* Synapse Hackathon Section */}
            <div id="synapse-section" className="border-2 border-darkPink/20 p-6 md:p-8 rounded-2xl bg-white/50 backdrop-blur-sm relative">
              <BackToProjectButton sectionId="synapse-section" />
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

            {/* Clean Tech Challenge Section */}
            <div id="cleantech-section" className="border-2 border-darkPink/20 p-6 md:p-8 rounded-2xl bg-white/50 backdrop-blur-sm relative">
              <BackToProjectButton sectionId="cleantech-section" />
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

            {/* NTU IEEE Intuition Hackathon Section */}
            <div id="intuition-section" className="border-2 border-darkPink/20 p-6 md:p-8 rounded-2xl bg-white/50 backdrop-blur-sm relative">
              <BackToProjectButton sectionId="intuition-section" />
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

            {/* Code with AI Hackathon Section */}
            <div id="codewithai-section" className="border-2 border-darkPink/20 p-6 md:p-8 rounded-2xl bg-white/50 backdrop-blur-sm relative">
              <BackToProjectButton sectionId="codewithai-section" />
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

            {/* NTU PEAK Leadership Program Section */}
            <div id="peak-section" className="border-2 border-darkPink/20 p-6 md:p-8 rounded-2xl bg-white/50 backdrop-blur-sm relative">
              <BackToProjectButton sectionId="peak-section" />
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

            {/* Surgical Gauze Detection Section */}
            <div id="gauze-section" className="border-2 border-darkPink/20 p-6 md:p-8 rounded-2xl bg-white/50 backdrop-blur-sm relative">
              <BackToProjectButton sectionId="gauze-section" />
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