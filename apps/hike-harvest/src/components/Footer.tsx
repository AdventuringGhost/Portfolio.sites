import { Link } from 'react-router-dom'

export const Footer = () => {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer 
      className="mt-16 pt-8 w-full"
      style={{ 
        backgroundColor: '#B2CD9C',
        borderTop: '2px solid rgba(75, 53, 42, 0.3)',
        minHeight: '200px',
        position: 'relative',
        zIndex: 10
      }}
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <div 
          className="py-8"
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}
        >
          {/* Brand */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold" style={{ color: '#4B352A' }}>
              🏔️ Hike Harvest
            </h3>
            <p className="text-base leading-relaxed font-medium" style={{ color: '#4B352A' }}>
              Your ultimate companion for trail-ready recipes. From energy-packed breakfasts 
              to hearty dinners, fuel your adventures with delicious, portable meals.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://github.com/AdventuringGhost" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="transition-all duration-200 hover:opacity-70 hover:scale-110"
                style={{ color: '#4B352A' }}
              >
                <span className="sr-only">GitHub</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a 
                href="http://localhost:3005" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="transition-all duration-200 hover:opacity-70 hover:scale-110"
                style={{ color: '#4B352A' }}
              >
                <span className="sr-only">Portfolio</span>
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
              <a 
                href="mailto:contact@hikeharvest.com" 
                className="transition-all duration-200 hover:opacity-70 hover:scale-110"
                style={{ color: '#4B352A' }}
              >
                <span className="sr-only">Email</span>
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div 
            className="p-6 rounded-2xl"
            style={{ 
              backgroundColor: 'rgba(240, 242, 189, 0.8)',
              border: '2px solid rgba(75, 53, 42, 0.2)'
            }}
          >
            <h4 className="text-lg font-bold mb-6" style={{ color: '#4B352A' }}>Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/" 
                  className="text-base transition-all duration-200 hover:opacity-70 block font-medium"
                  style={{ color: '#4B352A' }}
                >
                  🏠 Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/recipes" 
                  className="text-base transition-all duration-200 hover:opacity-70 block font-medium"
                  style={{ color: '#4B352A' }}
                >
                  🍽️ All Recipes
                </Link>
              </li>
              <li>
                <Link 
                  to="/recipes/add" 
                  className="text-base transition-all duration-200 hover:opacity-70 block font-medium"
                  style={{ color: '#4B352A' }}
                >
                  ➕ Submit Recipe
                </Link>
              </li>
              <li>
                <Link 
                  to="/tips" 
                  className="text-base transition-all duration-200 hover:opacity-70 block font-medium"
                  style={{ color: '#4B352A' }}
                >
                  💡 Trail Tips
                </Link>
              </li>
              <li>
                <Link 
                  to="/community" 
                  className="text-base transition-all duration-200 hover:opacity-70 block font-medium"
                  style={{ color: '#4B352A' }}
                >
                  👥 Community
                </Link>
              </li>
            </ul>
          </div>

          {/* Recipe Categories */}
          <div 
            className="p-6 rounded-2xl"
            style={{ 
              backgroundColor: 'rgba(240, 242, 189, 0.8)',
              border: '2px solid rgba(75, 53, 42, 0.2)'
            }}
          >
            <h4 className="text-lg font-bold mb-6" style={{ color: '#4B352A' }}>Recipe Categories</h4>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/recipes/category/breakfast" 
                  className="text-base transition-all duration-200 hover:opacity-70 block font-medium"
                  style={{ color: '#4B352A' }}
                >
                  🌅 Breakfast
                </Link>
              </li>
              <li>
                <Link 
                  to="/recipes/category/lunch" 
                  className="text-base transition-all duration-200 hover:opacity-70 block font-medium"
                  style={{ color: '#4B352A' }}
                >
                  🥪 Lunch
                </Link>
              </li>
              <li>
                <Link 
                  to="/recipes/category/dinner" 
                  className="text-base transition-all duration-200 hover:opacity-70 block font-medium"
                  style={{ color: '#4B352A' }}
                >
                  🍲 Dinner
                </Link>
              </li>
              <li>
                <Link 
                  to="/recipes/category/snack" 
                  className="text-base transition-all duration-200 hover:opacity-70 block font-medium"
                  style={{ color: '#4B352A' }}
                >
                  🥜 Snacks
                </Link>
              </li>
              <li>
                <Link 
                  to="/recipes/category/dessert" 
                  className="text-base transition-all duration-200 hover:opacity-70 block font-medium"
                  style={{ color: '#4B352A' }}
                >
                  🍪 Desserts
                </Link>
              </li>
              <li>
                <Link 
                  to="/recipes/category/drinks" 
                  className="text-base transition-all duration-200 hover:opacity-70 block font-medium"
                  style={{ color: '#4B352A' }}
                >
                  🥤 Drinks
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter & Contact */}
          <div 
            className="p-6 rounded-2xl"
            style={{ 
              backgroundColor: 'rgba(240, 242, 189, 0.8)',
              border: '2px solid rgba(75, 53, 42, 0.2)'
            }}
          >
            <h4 className="text-lg font-bold mb-6" style={{ color: '#4B352A' }}>Stay Connected</h4>
            <div className="space-y-4">
              <p className="text-sm font-medium" style={{ color: '#4B352A' }}>
                Get the latest trail recipes and cooking tips delivered to your inbox.
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 rounded-l-full text-sm"
                  style={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    border: '2px solid rgba(75, 53, 42, 0.2)',
                    color: '#4B352A'
                  }}
                />
                <button 
                  className="px-4 py-2 rounded-r-full text-sm font-bold transition-all duration-200 hover:opacity-80"
                  style={{ 
                    backgroundColor: '#CA7842', 
                    color: '#F0F2BD'
                  }}
                >
                  Subscribe
                </button>
              </div>
              <div className="pt-4">
                <p className="text-sm font-medium mb-2" style={{ color: '#4B352A' }}>Contact Us:</p>
                <p className="text-sm" style={{ color: '#4B352A' }}>📧 contact@hikeharvest.com</p>
                <p className="text-sm" style={{ color: '#4B352A' }}>🌐 hikeharvest.com</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Copyright Section */}
        <div 
          className="mt-16 pt-8 text-center"
          style={{ borderTop: '1px solid rgba(75, 53, 42, 0.2)' }}
        >
          <p className="text-base font-light" style={{ color: '#4B352A' }}>
            &copy; {currentYear} Hike Harvest. Fuel your adventures. 🏔️
          </p>
        </div>
      </div>
    </footer>
  )
}
