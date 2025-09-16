import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { MiniCart } from './MiniCart';

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDesktopMenuOpen, setIsDesktopMenuOpen] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleDesktopMenu = () => {
    setIsDesktopMenuOpen(!isDesktopMenuOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDesktopMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/products', label: 'Products' },
    { path: '/posts', label: 'Posts' },
    { path: '/feedback', label: 'Feedback' },
    { path: '/about', label: 'About' },
  ];

  const externalLinks = [
    { url: 'http://localhost:3000', label: 'Portfolio', external: true }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm">
      <div className="container mx-auto px-6 py-6 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-gray-900">
          Glow+Grove
        </Link>

        {/* Desktop dropdown menu */}
        <div className="hidden md:block relative" ref={dropdownRef}>
          <button
            onClick={toggleDesktopMenu}
            className="flex items-center space-x-2 text-gray-600 hover:text-sunrise-green transition-colors px-3 py-2 rounded-lg"
            aria-label="Toggle navigation menu"
          >
            <span>Menu</span>
            <svg 
              className={`w-4 h-4 transition-transform duration-200 ${isDesktopMenuOpen ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Desktop dropdown */}
          {isDesktopMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsDesktopMenuOpen(false)}
                  className={`block px-4 py-2 text-sm text-gray-700 hover:text-sunrise-green hover:bg-sunrise-green/10 transition-colors ${
                    location.pathname === item.path ? 'font-semibold text-sunrise-green bg-sunrise-green/10' : ''
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              {externalLinks.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsDesktopMenuOpen(false)}
                  className="block px-4 py-2 text-sm text-gray-700 hover:text-sunrise-orange hover:bg-sunrise-orange/10 transition-colors"
                >
                  {link.label} ↗
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Cart and Mobile menu */}
        <div className="flex items-center space-x-6">
          <MiniCart />

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-gray-600 hover:text-sunrise-green transition-colors"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg pb-6">
          <nav className="flex flex-col items-center space-y-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-gray-700 hover:text-sunrise-green transition-colors text-lg px-4 py-2 rounded-lg ${
                  location.pathname === item.path ? 'font-semibold text-sunrise-green bg-sunrise-green/10' : ''
                }`}
              >
                {item.label}
              </Link>
            ))}
            {externalLinks.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-700 hover:text-sunrise-orange transition-colors text-lg px-4 py-2 rounded-lg"
              >
                {link.label} ↗
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};
