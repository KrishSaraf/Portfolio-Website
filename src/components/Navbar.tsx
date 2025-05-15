import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import profileImage from '../assets/KS.jpg';

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
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md z-50 border-b border-darkPink/10 h-[clamp(3.5rem,10vh,4rem)] shadow-sm">
      <div className="w-[min(100%,1400px)] mx-auto px-[clamp(1rem,3vw,2rem)] h-full">
        <div className="flex items-center justify-between h-full">
          <Link to="/" className="flex items-center gap-[clamp(0.5rem,1vw,0.75rem)]">
            <img src={profileImage} alt="Krish Saraf" className="h-[clamp(1.75rem,5vw,2rem)] w-[clamp(1.75rem,5vw,2rem)] rounded-full object-cover" />
            <span className="text-[clamp(1.125rem,2.5vw,1.5rem)] font-bold text-darkPink">Krish Saraf</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-[clamp(1rem,3vw,2rem)] relative">
            {navigation.map((item) => (
              <div key={item.name} className="relative">
                <Link
                  to={item.href}
                  className={`${
                    location.pathname === item.href
                      ? 'text-darkPink'
                      : 'text-darkPink/70 hover:text-darkPink'
                  } transition-colors duration-300 text-[clamp(0.875rem,1vw,1rem)]`}
                >
                  {item.name}
                </Link>
                {location.pathname === item.href && (
                  <div className="absolute -bottom-[clamp(0.5rem,1vh,0.75rem)] left-0 w-full h-[0.125rem] bg-darkPink rounded-full"></div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-darkPink/70 hover:text-darkPink p-[clamp(0.25rem,0.5vw,0.5rem)]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <XMarkIcon className="h-[clamp(1.25rem,6vw,1.5rem)] w-[clamp(1.25rem,6vw,1.5rem)]" />
              ) : (
                <Bars3Icon className="h-[clamp(1.25rem,6vw,1.5rem)] w-[clamp(1.25rem,6vw,1.5rem)]" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation - using container query approach */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-[clamp(3.5rem,10vh,4rem)] left-0 w-full bg-white/95 border-b border-darkPink/10 shadow-md z-50">
            <div className="px-[clamp(1rem,4vw,1.5rem)] py-[clamp(0.5rem,2vh,0.75rem)] space-y-[clamp(0.25rem,1vh,0.5rem)]">
              {navigation.map((item) => (
                <div key={item.name} className="relative">
                  <Link
                    to={item.href}
                    className={`${
                      location.pathname === item.href
                        ? 'text-darkPink'
                        : 'text-darkPink/70 hover:text-darkPink'
                    } block px-[clamp(0.75rem,2vw,1rem)] py-[clamp(0.75rem,3vh,1rem)] text-[clamp(0.9375rem,4vw,1.125rem)] transition-colors duration-300`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                    {location.pathname === item.href && (
                      <div className="absolute left-0 w-[0.25rem] h-full bg-darkPink rounded-r-full top-0"></div>
                    )}
                  </Link>
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