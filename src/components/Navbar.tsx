import { useState, useEffect } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import profileImage from '../assets/KS.jpg';

const navigation = [
  { name: 'Home', href: '#home-section' },
  { name: 'Projects', href: '#projects-section' },
  { name: 'Awards & Pics', href: '#awards-section' },
  { name: 'Experience', href: '#experience-section' },
  { name: 'Skills', href: '#skills-section' },
  { name: 'Contact', href: '#contact-section' },
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home-section');

  // Add scroll event listener to track active section
  useEffect(() => {
    const handleScroll = () => {
      // Find which section is currently in view
      const sections = navigation.map(item => item.href.substring(1));
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          
          // If the top of the element is close to the top of the viewport or above it,
          // and the bottom is still in view (or just out of view by a small margin)
          if (rect.top <= 100 && rect.bottom >= -300) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const smoothScroll = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80, // Offset for navbar height
        behavior: 'smooth'
      });
      
      // Update URL hash without causing a jump
      window.history.pushState('', '', `#${id}`);
      
      // Close mobile menu if open
      setMobileMenuOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md z-50 border-b border-darkPink/10 h-[var(--navbar-height-mobile)] md:h-[var(--navbar-height)] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full">
          <a 
            href="#home-section"
            onClick={(e) => smoothScroll(e, 'home-section')}
            className="flex items-center gap-3"
          >
            <img src={profileImage} alt="Krish Saraf" className="h-9 w-9 rounded-full object-cover border border-darkPink/20" />
            <span className="text-xl md:text-2xl font-bold text-darkPink">Krish Saraf</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 items-center">
            {navigation.map((item) => (
              <div key={item.name} className="relative group">
                <a
                  href={item.href}
                  onClick={(e) => smoothScroll(e, item.href.substring(1))}
                  className={`${
                    activeSection === item.href.substring(1)
                      ? 'text-darkPink font-medium'
                      : 'text-darkPink/70 hover:text-darkPink'
                  } transition-colors duration-300 py-2 px-1`}
                >
                  {item.name}
                </a>
                {activeSection === item.href.substring(1) && (
                  <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-darkPink rounded-full"></div>
                )}
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-darkPink rounded-full transition-all duration-300 group-hover:w-full"></div>
              </div>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-darkPink/70 hover:text-darkPink p-2 rounded-md"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-[var(--navbar-height-mobile)] left-0 w-full bg-white/95 border-b border-darkPink/10 shadow-md z-50">
            <div className="px-4 py-2 space-y-1">
              {navigation.map((item) => (
                <div key={item.name} className="relative">
                  <a
                    href={item.href}
                    onClick={(e) => smoothScroll(e, item.href.substring(1))}
                    className={`${
                      activeSection === item.href.substring(1)
                        ? 'text-darkPink font-medium bg-darkPink/5'
                        : 'text-darkPink/70 hover:text-darkPink hover:bg-darkPink/5'
                    } block px-4 py-3 text-base transition-colors duration-300 rounded-md`}
                  >
                    {item.name}
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 