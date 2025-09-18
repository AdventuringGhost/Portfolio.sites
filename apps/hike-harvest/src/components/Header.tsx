import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'

export const Header = () => {
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/recipes', label: 'Recipes' },
    { path: '/tips', label: 'Trail Tips' },
    { path: '/community', label: 'Community' },
  ]

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-neutral-200 shadow-sm">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link 
            to="/" 
            className="text-3xl font-bold text-neutral-800 transition-colors duration-200 hover:text-mint-500"
          >
            🏔️ Hike Harvest
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-6 py-3 rounded-full text-lg font-medium transition-all duration-200 ${
                  location.pathname === item.path 
                    ? 'bg-mint-500 text-white shadow-md' 
                    : 'text-neutral-600 hover:text-mint-500 hover:bg-mint-50'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          
          {/* Right side buttons */}
          <div className="flex items-center space-x-3">
            {/* Portfolio Link */}
            <a 
              href="http://localhost:3005" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden md:block px-4 py-2 rounded-full text-sm font-medium text-neutral-600 hover:text-coral-500 hover:bg-coral-50 transition-all duration-200"
            >
              🎨 Portfolio
            </a>
            
            {/* Submit Recipe Button */}
            <Link to="/recipes/add">
              <button className="px-6 py-3 rounded-full text-lg font-medium bg-coral-400 text-white hover:bg-coral-500 transition-all duration-200 shadow-md hover:shadow-lg">
                ✍️ Submit Recipe
              </button>
            </Link>
            
            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-full text-neutral-600 hover:text-mint-500 hover:bg-mint-50 transition-all duration-200"
              aria-label="Toggle mobile menu"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2}
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
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-neutral-200 bg-white">
            <div className="px-6 py-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={closeMobileMenu}
                  className={`block px-4 py-3 rounded-full text-lg font-medium transition-all duration-200 ${
                    location.pathname === item.path 
                      ? 'bg-mint-500 text-white' 
                      : 'text-neutral-600 hover:text-mint-500 hover:bg-mint-50'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-3 space-y-2">
                <a 
                  href="http://localhost:3005" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={closeMobileMenu}
                  className="block px-4 py-3 rounded-full text-lg font-medium text-neutral-600 hover:text-coral-500 hover:bg-coral-50 transition-all duration-200"
                >
                  🎨 Portfolio
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
