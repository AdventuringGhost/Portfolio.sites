import { Link, useLocation } from 'react-router-dom'
import { Button } from '@adventuringghost/ui'
import { useState, useEffect, useRef } from 'react'

export const Header = () => {
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  
  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/projects', label: 'Projects' },
    { path: '/notes', label: 'Notes' }
  ]
  
  const externalLinks = [
    { url: 'https://github.com/AdventuringGhost', label: 'GitHub', external: true },
    { url: 'https://glow-grove.com', label: 'Glow Grove', external: true },
    { url: 'https://hike-harvest.com', label: 'Hike Harvest', external: true }
  ]
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }
  
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }
  
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }
  
  const closeDropdown = () => {
    setIsDropdownOpen(false)
  }
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }
    
    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isDropdownOpen])
  
  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center h-16">
          <Link to="/" className="text-lg sm:text-xl md:text-2xl font-bold text-custom-burgundy hover:text-custom-orange transition-colors duration-200 no-underline">
            Adventuring Ghost
          </Link>
          
          {/* Desktop Navigation Dropdown */}
          <nav className="hidden md:block relative ml-auto" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className="flex items-center space-x-1 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 text-custom-burgundy hover:text-white hover:bg-custom-green border border-custom-green hover:border-custom-green focus:outline-none focus:ring-2 focus:ring-custom-green focus:ring-offset-2"
            >
              <span>Menu</span>
              <svg
                className={`w-5 h-5 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  d="M19 9l-7 7-7-7" 
                />
              </svg>
            </button>
            
            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={closeDropdown}
                    className={`block px-4 py-2 text-sm transition-colors duration-200 ${
                      location.pathname === item.path
                        ? 'text-custom-green bg-custom-cream'
                        : 'text-custom-burgundy hover:text-custom-green hover:bg-custom-cream'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="border-t border-gray-100 my-1"></div>
                {externalLinks.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeDropdown}
                    className="block px-4 py-2 text-sm transition-colors duration-200 text-custom-burgundy hover:text-custom-orange hover:bg-custom-cream"
                  >
                    {link.label} ↗
                  </a>
                ))}
                <div className="border-t border-gray-100 my-1"></div>
                <Link to="/contact" onClick={closeDropdown}>
                  <div className="block px-4 py-2 text-sm transition-colors duration-200 text-custom-burgundy hover:text-custom-green hover:bg-custom-cream">
                    Contact Me
                  </div>
                </Link>
              </div>
            )}
          </nav>
          
          <div className="flex items-center space-x-4">
            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={toggleMobileMenu}
                className="p-2 rounded-md text-custom-burgundy hover:text-white hover:bg-custom-green border border-custom-green hover:border-custom-green focus:outline-none focus:ring-2 focus:ring-custom-green focus:ring-offset-2 transition-colors duration-200"
                aria-label="Toggle mobile menu"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  viewBox="0 0 24 24"
                >
                  {isMobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={closeMobileMenu}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                    location.pathname === item.path
                      ? 'text-custom-green bg-custom-cream'
                      : 'text-custom-burgundy hover:text-custom-green hover:bg-custom-cream'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-2 space-y-2">
                {externalLinks.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeMobileMenu}
                    className="block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 text-custom-burgundy hover:text-custom-orange hover:bg-custom-cream"
                  >
                    {link.label} ↗
                  </a>
                ))}
                <Link to="/contact" onClick={closeMobileMenu}>
                  <Button size="sm" className="w-full">
                    Contact Me
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
