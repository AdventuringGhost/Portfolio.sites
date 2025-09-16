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
    <header 
      className="sticky top-0 z-50" 
      style={{ 
        backgroundColor: '#F0F2BD',
        borderBottom: '3px solid #CA7842',
        boxShadow: '0 4px 20px rgba(75, 53, 42, 0.15)'
      }}
    >
      <div className="container mx-auto px-8 max-w-7xl">
        <div className="flex items-center justify-between h-64">
          {/* Logo */}
          <Link 
            to="/" 
            className="text-5xl font-bold transition-colors duration-200" 
            style={{ color: '#4B352A' }}
          >
            🏔️ Hike Harvest
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-8 py-4 rounded-3xl text-xl font-medium transition-colors duration-200 ${
                  location.pathname === item.path 
                    ? 'text-white' 
                    : 'text-[#4B352A] hover:text-[#CA7842]'
                }`}
                style={{
                  backgroundColor: location.pathname === item.path ? '#CA7842' : 'transparent'
                }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          
          {/* Right side buttons */}
          <div className="flex items-center space-x-6">
            {/* Portfolio Link */}
            <a 
              href="http://localhost:3005" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden md:block px-8 py-4 rounded-3xl text-xl font-medium transition-colors duration-200"
              style={{ 
                color: '#4B352A',
                backgroundColor: 'rgba(75, 53, 42, 0.1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#CA7842';
                e.currentTarget.style.color = '#F0F2BD';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(75, 53, 42, 0.1)';
                e.currentTarget.style.color = '#4B352A';
              }}
            >
              🎨 Portfolio
            </a>
            
            {/* Submit Recipe Button */}
            <Link to="/recipes/add">
              <button 
                className="px-8 py-4 rounded-3xl text-xl font-medium transition-colors duration-200"
                style={{ 
                  backgroundColor: '#CA7842',
                  color: '#F0F2BD'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#4B352A';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#CA7842';
                }}
              >
                ✍️ Submit Recipe
              </button>
            </Link>
            
            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-4 rounded-3xl transition-colors duration-200"
              style={{ 
                color: '#4B352A',
                backgroundColor: 'rgba(75, 53, 42, 0.1)'
              }}
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
          <div 
            className="md:hidden border-t" 
            style={{ 
              borderColor: '#CA7842',
              backgroundColor: '#F0F2BD'
            }}
          >
            <div className="px-6 py-6 space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={closeMobileMenu}
                  className={`block px-4 py-3 rounded-2xl text-lg font-medium transition-colors duration-200 ${
                    location.pathname === item.path 
                      ? 'text-white' 
                      : 'text-[#4B352A] hover:text-[#CA7842]'
                  }`}
                  style={{
                    backgroundColor: location.pathname === item.path ? '#CA7842' : 'transparent'
                  }}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-3 space-y-3">
                <a 
                  href="http://localhost:3005" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={closeMobileMenu}
                  className="block px-4 py-3 rounded-2xl text-lg font-medium transition-colors duration-200"
                  style={{ 
                    color: '#4B352A',
                    backgroundColor: 'rgba(75, 53, 42, 0.1)'
                  }}
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
