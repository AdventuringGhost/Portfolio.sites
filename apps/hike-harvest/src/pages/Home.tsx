import { Link } from 'react-router-dom'

export const Home = () => {
  const categories = [
    { name: 'Breakfast', icon: '🌅', description: 'Energy-packed morning meals' },
    { name: 'Lunch', icon: '🥪', description: 'Midday trail fuel' },
    { name: 'Dinner', icon: '🍲', description: 'Hearty evening meals' },
    { name: 'Snack', icon: '🥜', description: 'Quick energy boosts' },
    { name: 'Dessert', icon: '🍪', description: 'Sweet trail treats' },
    { name: 'Drinks', icon: '🥤', description: 'Hydrating trail beverages' },
  ]

  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <div 
        className="p-12 rounded-3xl transition-all duration-500 hover:shadow-2xl"
        style={{ 
          background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.8) 0%, rgba(251, 191, 36, 0.8) 100%), url("https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80") center/cover',
          border: '2px solid rgba(75, 53, 42, 0.2)',
          boxShadow: '0 20px 40px rgba(75, 53, 42, 0.1)',
          backdropFilter: 'blur(10px)'
        }}
      >
        <div className="text-center pt-48 pb-80" style={{ paddingTop: '8rem', paddingBottom: '10rem' }}>
          <h1 className="text-6xl md:text-8xl font-light mb-32" style={{ color: '#4B352A' }}>
            <span className="block">🏔️ Hike</span>
            <span className="block font-medium">Harvest</span>
          </h1>
          <p className="text-xl md:text-2xl mb-24 max-w-4xl mx-auto leading-relaxed font-light" style={{ color: '#4B352A' }}>
            Fuel your adventures with delicious, trail-ready recipes. From energy-packed breakfasts 
            to hearty dinners, discover meals that travel as well as you do.
          </p>
          <div className="flex flex-row gap-16 justify-center">
              <Link to="/recipes">
                <button
                  className="px-16 py-6 rounded-full font-medium text-xl transition-all duration-300 hover:scale-95 hover:shadow-xl transform hover:-translate-y-1"
                  style={{
                    backgroundColor: '#CA7842',
                    color: '#F0F2BD',
                    border: '2px solid #CA7842',
                    boxShadow: '0 8px 25px rgba(202, 120, 66, 0.3)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#F0F2BD';
                    e.currentTarget.style.color = '#CA7842';
                    e.currentTarget.style.boxShadow = '0 12px 35px rgba(202, 120, 66, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#CA7842';
                    e.currentTarget.style.color = '#F0F2BD';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(202, 120, 66, 0.3)';
                  }}
                >
                  Explore Recipes
                </button>
              </Link>
              <Link to="/recipes/add">
                <button 
                  className="px-16 py-6 rounded-full font-medium text-xl transition-all duration-300 hover:scale-95 hover:shadow-xl transform hover:-translate-y-1"
                  style={{
                    backgroundColor: '#F0F2BD',
                    color: '#CA7842',
                    border: '2px solid #F0F2BD',
                    boxShadow: '0 8px 25px rgba(240, 242, 189, 0.4)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#CA7842';
                    e.currentTarget.style.color = '#F0F2BD';
                    e.currentTarget.style.boxShadow = '0 12px 35px rgba(202, 120, 66, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#F0F2BD';
                    e.currentTarget.style.color = '#CA7842';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(240, 242, 189, 0.4)';
                  }}
                >
                  Submit Recipe
                </button>
              </Link>
          </div>
        </div>

        {/* Section Separator */}
        <div className="flex items-center justify-center py-8">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#CA7842]/30 to-transparent"></div>
          <div className="mx-6 w-3 h-3 rounded-full" style={{ backgroundColor: '#CA7842' }}></div>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#CA7842]/30 to-transparent"></div>
        </div>
      </div>

      {/* Features and Categories Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 py-20">
        {/* Features Section */}
        <div 
          className="p-12 rounded-3xl"
          style={{ 
            backgroundColor: 'rgba(240, 242, 189, 0.8)',
            border: '2px solid rgba(75, 53, 42, 0.2)'
          }}
        >
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-light mb-12" style={{ color: '#4B352A' }}>
              Why Choose Hike Harvest?
            </h2>
            <p className="text-xl mb-16 font-light max-w-2xl mx-auto leading-relaxed" style={{ color: '#4B352A' }}>
              Discover what makes our recipes perfect for your outdoor adventures. Each recipe is carefully crafted 
              to provide the energy and nutrition you need for your journey.
            </p>
            
            <div className="space-y-16">
              {/* Trail-Tested Card */}
              <div className="text-center group">
                <div className="text-6xl mb-8 transition-all duration-300 group-hover:scale-90 group-hover:rotate-3">🥾</div>
                <h3 className="text-2xl font-medium mb-6 transition-colors duration-300 group-hover:text-[#CA7842]" style={{ color: '#4B352A' }}>Trail-Tested</h3>
                <p className="text-lg leading-relaxed font-light transition-colors duration-300 group-hover:text-[#CA7842]" style={{ color: '#4B352A' }}>
                  Every recipe is designed for outdoor adventures. Lightweight, portable, and packed with energy to fuel your journey.
                </p>
              </div>

              {/* Quick & Easy Card */}
              <div className="text-center group">
                <div className="text-6xl mb-8 transition-all duration-300 group-hover:scale-90 group-hover:rotate-3">⚡</div>
                <h3 className="text-2xl font-medium mb-6 transition-colors duration-300 group-hover:text-[#CA7842]" style={{ color: '#4B352A' }}>Quick & Easy</h3>
                <p className="text-lg leading-relaxed font-light transition-colors duration-300 group-hover:text-[#CA7842]" style={{ color: '#4B352A' }}>
                  Simple preparation with minimal equipment. Perfect for busy adventurers who want great food fast.
                </p>
              </div>

              {/* Nutritious Card */}
              <div className="text-center group">
                <div className="text-6xl mb-8 transition-all duration-300 group-hover:scale-90 group-hover:rotate-3">🌱</div>
                <h3 className="text-2xl font-medium mb-6 transition-colors duration-300 group-hover:text-[#CA7842]" style={{ color: '#4B352A' }}>Nutritious</h3>
                <p className="text-lg leading-relaxed font-light transition-colors duration-300 group-hover:text-[#CA7842]" style={{ color: '#4B352A' }}>
                  Balanced meals that provide the fuel you need for long days on the trail and recovery after.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Recipe Categories Section */}
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-light mb-6" style={{ color: '#4B352A' }}>
            Browse Trail Recipes by Category
          </h2>
          <p className="text-lg mb-16 font-light" style={{ color: '#4B352A' }}>
            Find the perfect fuel for your adventure
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={`/recipes/category/${category.name.toLowerCase()}`}
                className="group text-center transition-all duration-300 hover:scale-90 transform hover:-translate-y-1"
              >
                <div 
                  className="w-24 h-24 mx-auto mb-4 rounded-full flex flex-col items-center justify-center transition-all duration-300 group-hover:scale-95 group-hover:shadow-xl"
                  style={{ 
                    backgroundColor: 'rgba(240, 242, 189, 0.8)',
                    border: '3px solid #CA7842',
                    boxShadow: '0 8px 25px rgba(202, 120, 66, 0.2)',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  <span className="text-2xl transition-all duration-300 group-hover:scale-90 group-hover:rotate-3">{category.icon}</span>
                  <h3 className="text-xs font-bold transition-all duration-300 group-hover:scale-95 leading-tight group-hover:text-[#CA7842]" style={{ color: '#4B352A' }}>{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Additional spacing before newsletter */}
      <div className="py-12"></div>

      {/* Newsletter & Community Section */}
      <div 
        className="rounded-3xl p-16 mx-8"
        style={{ 
          background: 'linear-gradient(135deg, rgba(75, 53, 42, 0.9) 0%, rgba(202, 120, 66, 0.8) 100%)',
          border: '2px solid rgba(178, 205, 156, 0.3)'
        }}
      >
        <div className="text-center space-y-20">
          {/* Newsletter Signup */}
          <div className="py-8">
            <h2 className="text-3xl md:text-4xl font-light mb-6" style={{ color: '#F0F2BD' }}>
              Get Trail Recipe Updates
            </h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto font-light" style={{ color: '#F0F2BD' }}>
              Sign up to receive new trail-ready recipes each week and get our free e-cookbook, 
              "Easy Trail Meals for Every Adventure!"
            </p>
            <div 
              className="flex flex-col sm:flex-row gap-6 justify-center w-80 mx-auto p-6 rounded-2xl px-16"
              style={{ 
                backgroundColor: 'rgba(240, 242, 189, 0.2)',
                border: '2px solid rgba(240, 242, 189, 0.4)'
              }}
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-full text-lg font-light"
                style={{ 
                  backgroundColor: 'rgba(240, 242, 189, 0.9)',
                  border: '2px solid rgba(178, 205, 156, 0.3)',
                  color: '#4B352A'
                }}
              />
              <button 
                className="px-4 py-2 rounded-full font-medium text-sm transition-all duration-200 hover:opacity-80 flex-shrink-0"
                style={{ 
                  backgroundColor: '#B2CD9C', 
                  color: '#4B352A'
                }}
              >
                Subscribe
              </button>
            </div>
          </div>

          {/* Section Divider */}
          <div className="flex items-center justify-center py-8">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#F0F2BD]/30 to-transparent"></div>
            <div className="mx-6 w-3 h-3 rounded-full" style={{ backgroundColor: '#F0F2BD' }}></div>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#F0F2BD]/30 to-transparent"></div>
          </div>

          {/* Community Section */}
          <div className="py-8">
            <h2 className="text-3xl md:text-4xl font-light mb-8" style={{ color: '#F0F2BD' }}>
              Ready to Start Cooking?
            </h2>
            <p className="text-lg mb-12 leading-relaxed max-w-2xl mx-auto font-light" style={{ color: '#F0F2BD' }}>
              Join our community of outdoor enthusiasts sharing their favorite trail recipes.
            </p>
            <div className="flex flex-col sm:flex-row gap-8 justify-center">
              <Link to="/recipes/add">
                <button 
                  className="px-10 py-4 rounded-full font-medium text-lg transition-all duration-200 hover:opacity-80"
                  style={{ 
                    backgroundColor: '#B2CD9C', 
                    color: '#4B352A'
                  }}
                >
                  Submit Your First Recipe
                </button>
              </Link>
              <Link to="/recipes">
                <button 
                  className="px-10 py-4 rounded-full font-medium text-lg transition-all duration-200 hover:opacity-80"
                  style={{ 
                    backgroundColor: 'transparent', 
                    color: '#F0F2BD',
                    border: '2px solid #F0F2BD'
                  }}
                >
                  Browse Recipes
                </button>
              </Link>
            </div>
          </div>

          {/* Additional Section Divider */}
          <div className="flex items-center justify-center py-8">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#F0F2BD]/20 to-transparent"></div>
            <div className="mx-4 w-2 h-2 rounded-full" style={{ backgroundColor: '#F0F2BD' }}></div>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#F0F2BD]/20 to-transparent"></div>
          </div>

          {/* Additional Layer - Trail Tips */}
          <div className="pt-8 pb-16">
            <h2 className="text-2xl md:text-3xl font-light mb-6" style={{ color: '#F0F2BD' }}>
              Trail Cooking Tips
            </h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto font-light" style={{ color: '#F0F2BD' }}>
              Learn the secrets of successful trail cooking from experienced outdoor chefs.
            </p>
            <div className="flex flex-col sm:flex-row gap-8 justify-center">
              <Link to="/tips">
                <button 
                  className="px-8 py-4 rounded-full font-medium text-base transition-all duration-200 hover:opacity-80"
                  style={{ 
                    backgroundColor: 'transparent', 
                    color: '#F0F2BD',
                    border: '2px solid #F0F2BD'
                  }}
                >
                  View Tips
                </button>
              </Link>
              <Link to="/community">
                <button 
                  className="px-8 py-4 rounded-full font-medium text-base transition-all duration-200 hover:opacity-80"
                  style={{ 
                    backgroundColor: 'rgba(240, 242, 189, 0.2)', 
                    color: '#F0F2BD',
                    border: '1px solid rgba(240, 242, 189, 0.3)'
                  }}
                >
                  Join Community
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
