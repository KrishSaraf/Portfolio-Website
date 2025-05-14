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
    <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-sm z-50 border-b border-darkPink/10">
      <div className="container-padding mx-auto">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <img src={profileImage} alt="Krish Saraf" className="h-8 w-8 rounded-full object-cover" />
            <span className="text-2xl font-bold text-darkPink">Krish Saraf</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 relative">
            {navigation.map((item) => (
              <div key={item.name} className="relative">
                <Link
                  to={item.href}
                  className={`${
                    location.pathname === item.href
                      ? 'text-darkPink'
                      : 'text-darkPink/70 hover:text-darkPink'
                  } transition-colors duration-300`}
                >
                  {item.name}
                </Link>
                {location.pathname === item.href && 
                 item.name !== 'Home' && 
                 item.name !== 'Contact' && (
                  <img 
                    src={curvedArrow} 
                    alt="Active page indicator" 
                    className="absolute -top-12 left-1/2 -translate-x-1/4 w-14 h-14"
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
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
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