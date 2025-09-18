import { Link } from 'react-router-dom'

export const Footer = () => {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-neutral-800 text-white">
      <div className="container mx-auto px-6 max-w-7xl py-16">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4 text-mint-400">
              🏔️ Hike Harvest
            </h3>
            <p className="text-neutral-300 leading-relaxed mb-6">
              Your ultimate companion for trail-ready recipes. From energy-packed breakfasts 
              to hearty dinners, fuel your adventures with delicious, portable meals.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://github.com/AdventuringGhost" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 bg-neutral-700 rounded-full flex items-center justify-center hover:bg-mint-500 transition-all duration-200 hover:scale-110"
              >
                <span className="sr-only">GitHub</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a 
                href="http://localhost:3005" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 bg-neutral-700 rounded-full flex items-center justify-center hover:bg-coral-500 transition-all duration-200 hover:scale-110"
              >
                <span className="sr-only">Portfolio</span>
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
              <a 
                href="mailto:contact@hikeharvest.com" 
                className="w-10 h-10 bg-neutral-700 rounded-full flex items-center justify-center hover:bg-pink-500 transition-all duration-200 hover:scale-110"
              >
                <span className="sr-only">Email</span>
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-mint-400">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/" 
                  className="text-neutral-300 hover:text-mint-400 transition-colors duration-200"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/recipes" 
                  className="text-neutral-300 hover:text-mint-400 transition-colors duration-200"
                >
                  All Recipes
                </Link>
              </li>
              <li>
                <Link 
                  to="/recipes/add" 
                  className="text-neutral-300 hover:text-mint-400 transition-colors duration-200"
                >
                  Submit Recipe
                </Link>
              </li>
              <li>
                <Link 
                  to="/tips" 
                  className="text-neutral-300 hover:text-mint-400 transition-colors duration-200"
                >
                  Trail Tips
                </Link>
              </li>
              <li>
                <Link 
                  to="/community" 
                  className="text-neutral-300 hover:text-mint-400 transition-colors duration-200"
                >
                  Community
                </Link>
              </li>
            </ul>
          </div>

          {/* Recipe Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-coral-400">Categories</h4>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/recipes/category/breakfast" 
                  className="text-neutral-300 hover:text-coral-400 transition-colors duration-200"
                >
                  Breakfast
                </Link>
              </li>
              <li>
                <Link 
                  to="/recipes/category/lunch" 
                  className="text-neutral-300 hover:text-coral-400 transition-colors duration-200"
                >
                  Lunch
                </Link>
              </li>
              <li>
                <Link 
                  to="/recipes/category/dinner" 
                  className="text-neutral-300 hover:text-coral-400 transition-colors duration-200"
                >
                  Dinner
                </Link>
              </li>
              <li>
                <Link 
                  to="/recipes/category/snack" 
                  className="text-neutral-300 hover:text-coral-400 transition-colors duration-200"
                >
                  Snacks
                </Link>
              </li>
              <li>
                <Link 
                  to="/recipes/category/dessert" 
                  className="text-neutral-300 hover:text-coral-400 transition-colors duration-200"
                >
                  Desserts
                </Link>
              </li>
              <li>
                <Link 
                  to="/recipes/category/drinks" 
                  className="text-neutral-300 hover:text-coral-400 transition-colors duration-200"
                >
                  Drinks
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Newsletter Section */}
        <div className="mt-16 pt-8 border-t border-neutral-700">
          <div className="max-w-md">
            <h4 className="text-lg font-semibold mb-4 text-sunshine-400">Stay Updated</h4>
            <p className="text-neutral-300 mb-4">
              Get the latest trail recipes and cooking tips delivered to your inbox.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-l-full bg-neutral-700 text-white border-0 focus:ring-2 focus:ring-mint-500 outline-none"
              />
              <button className="px-6 py-3 bg-mint-500 text-white rounded-r-full font-semibold hover:bg-mint-600 transition-colors duration-200">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        {/* Bottom Copyright Section */}
        <div className="mt-12 pt-8 border-t border-neutral-700 text-center">
          <p className="text-neutral-400">
            &copy; {currentYear} Hike Harvest. Fuel your adventures. 🏔️
          </p>
        </div>
      </div>
    </footer>
  )
}