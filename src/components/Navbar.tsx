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
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md z-50 border-b border-darkPink/10 h-[var(--navbar-height-mobile)] md:h-[var(--navbar-height)] shadow-sm">
      <div className="container-padding mx-auto h-full">
        <div className="flex items-center justify-between h-full">
          <Link to="/" className="flex items-center gap-2">
            <img src={profileImage} alt="Krish Saraf" className="h-8 w-8 rounded-full object-cover" />
            <span className="text-xl md:text-2xl font-bold text-darkPink">Krish Saraf</span>
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