import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, Link, useSearchParams } from 'react-router-dom';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

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

// Academic timeline data
const academicJourney = [
  { class: "Class 1", achievement: "3rd" },
  { class: "Class 2", achievement: "1st" },
  { class: "Class 3", achievement: "2nd" },
  { class: "Class 4", achievement: "2nd" },
  { class: "Class 5", achievement: "1st" },
  { class: "Class 6", achievement: "2nd" },
  { class: "Class 7", achievement: "2nd" },
  { class: "Class 8", achievement: "3rd" },
  { class: "Class 9", achievement: "+1 promoted" },
  { class: "Class 10", achievement: "98.2% — All India Rank 7" },
  { class: "Class 11", achievement: "1st in Class" },
  { class: "Class 12", achievement: "1st in School, 1st in State" }
];

// Academic Timeline Component
const AcademicTimeline = () => {
  const [activePoint, setActivePoint] = useState<number | null>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="w-full overflow-x-hidden mb-16"
      ref={timelineRef}
    >
      <div className="relative w-full overflow-x-auto py-20 px-4">
        <div className="min-w-[1000px] md:min-w-[1200px] relative mx-auto">
          {/* SVG Timeline */}
          <svg 
            width="100%" 
            height="160" 
            viewBox="0 0 1200 160" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="relative z-10"
          >
            {/* Wavy Path */}
            <path 
              d="M0,80 C50,40 100,120 200,80 C300,40 400,120 500,80 C600,40 700,120 800,80 C900,40 1000,120 1100,80 C1150,60 1200,100 1200,80" 
              stroke="#e60023" 
              strokeWidth="4" 
              fill="none" 
              className="path-animation"
            />
            
            {/* Timeline Points */}
            {academicJourney.map((item, index) => {
              // Calculate position along the path
              const xPos = 50 + (index * (1100 / 11));
              // Calculate y position with a sine wave function to follow the path
              const yPos = 80 + (Math.sin((index / 11) * Math.PI * 2) * 40);
              
              return (
                <g key={index}>
                  {/* Circle Marker */}
                  <motion.circle
                    cx={xPos}
                    cy={yPos}
                    r={activePoint === index ? 12 : 10}
                    fill={activePoint === index ? "#e60023" : "white"}
                    stroke="#e60023"
                    strokeWidth="3"
                    whileHover={{ scale: 1.2 }}
                    onMouseEnter={() => setActivePoint(index)}
                    onMouseLeave={() => setActivePoint(null)}
                    className="cursor-pointer transition-all duration-300"
                  />
                  
                  {/* Class Label */}
                  <motion.text
                    x={xPos}
                    y={yPos - 25}
                    fontSize="14"
                    fontWeight={activePoint === index ? "bold" : "normal"}
                    fill="#333"
                    textAnchor="middle"
                    initial={{ opacity: 0.7 }}
                    animate={{ opacity: activePoint === index ? 1 : 0.7, y: activePoint === index ? yPos - 30 : yPos - 25 }}
                    className="pointer-events-none"
                  >
                    {item.class}
                  </motion.text>
                  
                  {/* Achievement Tooltip */}
                  <motion.g
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ 
                      opacity: activePoint === index ? 1 : 0,
                      scale: activePoint === index ? 1 : 0.8,
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Background Pill */}
                    <rect
                      x={xPos - 60}
                      y={yPos + 15}
                      width={120}
                      height={30}
                      rx={15}
                      fill="#e60023"
                      className="shadow-lg"
                    />
                    {/* Achievement Text */}
                    <text
                      x={xPos}
                      y={yPos + 35}
                      fontSize="12"
                      fontWeight="medium"
                      fill="white"
                      textAnchor="middle"
                      className="pointer-events-none"
                    >
                      {item.achievement}
                    </text>
                  </motion.g>
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    </motion.div>
  );
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
    
    // Group portrait and irregular orientation images
    // {
    //   id: 'development',
    //   src: "/gallery/timeline/b.jpeg",
    //   alt: "Portrait Photo",
    //   description: "Professional headshot in casual setting",
    //   aspectRatio: 3/4,
    //   highlight: false,
    //   objectPosition: "center 20%",
    //   maxHeight: 550
    // },
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
              Awards & Pics
            </h2>
            <p className="text-darkPink/70 text-lg max-w-3xl mx-auto mb-6">
              A visual showcase of my achievements, collaborations, and memorable moments from various events, competitions, and projects.
            </p>
          </div>
          
          {/* Academic Journey Timeline */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-darkPink mb-6 text-center">Academic Journey</h3>
            <AcademicTimeline />
          </div>
            
          <div className="space-y-24">
            {/* India Book of Records Section */}
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
            
            {/* Combined Photo Collage Section */}
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