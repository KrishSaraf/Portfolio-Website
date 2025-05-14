import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import profileImage from '../assets/KS.jpg';
import curvedArrow from '../assets/curved-arrow.svg';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Projects', href: '/projects' },
  { name: 'Awards & Pics', href: '/awards' },
  { name: 'Experience', href: '/experience' },
  { name: 'Skills', href: '/skills' },
  { name: 'Contact', href: '/contact' },
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md z-50 border-b border-darkPink/10 h-[var(--navbar-height-mobile)] md:h-[var(--navbar-height)] shadow-sm laptop:bg-white/98 laptop:backdrop-blur-lg laptop:border-b-2 laptop:border-darkPink/5 laptop:shadow-md">
      <div className="container-padding mx-auto h-full laptop:px-[min(5vw,3rem)] xl:px-[min(6vw,4rem)]">
        <div className="flex items-center justify-between h-full">
          <Link to="/" className="flex items-center gap-2 laptop:gap-3">
            <img src={profileImage} alt="Krish Saraf" className="h-8 w-8 rounded-full object-cover laptop:h-10 laptop:w-10 xl:h-12 xl:w-12" />
            <span className="text-xl md:text-2xl font-bold text-darkPink laptop:text-2xl xl:text-3xl">Krish Saraf</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 relative laptop:space-x-10 xl:space-x-12">
            {navigation.map((item) => (
              <div key={item.name} className="relative">
                <Link
                  to={item.href}
                  className={`${
                    location.pathname === item.href
                      ? 'text-darkPink'
                      : 'text-darkPink/70 hover:text-darkPink'
                  } transition-colors duration-300 laptop:text-lg laptop:font-medium xl:text-xl`}
                >
                  {item.name}
                </Link>
                {location.pathname === item.href && 
                 item.name !== 'Home' && 
                 item.name !== 'Contact' && (
                  <img 
                    src={curvedArrow} 
                    alt="Active page indicator" 
                    className="absolute -top-12 left-1/2 -translate-x-1/4 w-14 h-14 laptop:w-16 laptop:h-16 xl:w-20 xl:h-20"
                  />
                )}
              </div>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-darkPink/70 hover:text-darkPink"
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
                  <Link
                    to={item.href}
                    className={`${
                      location.pathname === item.href
                        ? 'text-darkPink'
                        : 'text-darkPink/70 hover:text-darkPink'
                    } block px-3 py-4 text-base transition-colors duration-300`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                  {location.pathname === item.href && 
                   item.name !== 'Home' && 
                   item.name !== 'Contact' && (
                    <img 
                      src={curvedArrow} 
                      alt="Active page indicator" 
                      className="absolute -right-8 top-1/2 -translate-y-1/2 w-8 h-8 transform -rotate-90"
                    />
                  )}
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