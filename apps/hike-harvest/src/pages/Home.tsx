import { Link } from 'react-router-dom'

export const Home = () => {
  const categories = [
    { name: 'Breakfast', icon: '🌅', description: 'Energy-packed morning meals', color: 'sunshine' },
    { name: 'Lunch', icon: '🥪', description: 'Midday trail fuel', color: 'mint' },
    { name: 'Dinner', icon: '🍲', description: 'Hearty evening meals', color: 'coral' },
    { name: 'Snack', icon: '🥜', description: 'Quick energy boosts', color: 'pink' },
    { name: 'Dessert', icon: '🍪', description: 'Sweet trail treats', color: 'sunshine' },
    { name: 'Drinks', icon: '🥤', description: 'Hydrating trail beverages', color: 'mint' },
  ]

  const features = [
    {
      icon: '🥾',
      title: 'Trail-Tested',
      description: 'Every recipe is designed for outdoor adventures. Lightweight, portable, and packed with energy to fuel your journey.',
      color: 'mint'
    },
    {
      icon: '⚡',
      title: 'Quick & Easy',
      description: 'Simple preparation with minimal equipment. Perfect for busy adventurers who want great food fast.',
      color: 'coral'
    },
    {
      icon: '🌱',
      title: 'Nutritious',
      description: 'Balanced meals that provide the fuel you need for long days on the trail and recovery after.',
      color: 'pink'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-mint-50 via-white to-sunshine-50 py-20">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-mint-500 via-coral-400 to-pink-400 bg-clip-text text-transparent">
              Hike Harvest
            </h1>
            <p className="text-xl md:text-2xl text-neutral-600 mb-12 leading-relaxed">
              Fuel your adventures with delicious, trail-ready recipes. From energy-packed breakfasts 
              to hearty dinners, discover meals that travel as well as you do.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link to="/recipes">
                <button className="w-48 px-6 py-3 bg-coral-400 text-white rounded-full text-lg font-semibold hover:bg-coral-500 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                  Explore Recipes
                </button>
              </Link>
              <Link to="/recipes/add">
                <button className="w-48 px-6 py-3 bg-white text-coral-400 border-2 border-coral-400 rounded-full text-lg font-semibold hover:bg-coral-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                  Submit Recipe
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-800 mb-6">
              Browse Trail Recipes
            </h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              Find the perfect fuel for your adventure with our carefully curated categories
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {categories.map((category, index) => (
              <Link
                key={category.name}
                to={`/recipes/category/${category.name.toLowerCase()}`}
                className="group text-center"
              >
                <div className="relative">
                  <div className={`w-24 h-24 mx-auto mb-4 rounded-full flex flex-col items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl bg-${category.color}-100 border-2 border-${category.color}-200 group-hover:border-${category.color}-400`}>
                    <span className="text-3xl mb-1 transition-all duration-300 group-hover:scale-110">{category.icon}</span>
                  </div>
                  <h3 className={`text-sm font-semibold text-neutral-700 group-hover:text-${category.color}-600 transition-colors duration-200`}>
                    {category.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-neutral-50 to-mint-50">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-800 mb-6">
              Why Choose Hike Harvest?
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Discover what makes our recipes perfect for your outdoor adventures
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            {features.map((feature, index) => (
              <div key={feature.title} className="text-center group">
                <div className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center bg-${feature.color}-100 border-2 border-${feature.color}-200 group-hover:border-${feature.color}-400 transition-all duration-300 group-hover:scale-110`}>
                  <span className="text-3xl transition-all duration-300 group-hover:scale-110">{feature.icon}</span>
                </div>
                <h3 className={`text-2xl font-bold mb-4 text-neutral-800 group-hover:text-${feature.color}-600 transition-colors duration-200`}>
                  {feature.title}
                </h3>
                <p className="text-neutral-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-r from-coral-400 to-pink-400">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Get Trail Recipe Updates
            </h2>
            <p className="text-xl mb-12 opacity-90">
              Sign up to receive new trail-ready recipes each week and get our free e-cookbook, 
              "Easy Trail Meals for Every Adventure!"
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-full text-lg border-0 focus:ring-4 focus:ring-white/30 outline-none"
              />
              <button className="w-32 px-6 py-4 bg-white text-coral-400 rounded-full text-lg font-semibold hover:bg-neutral-100 transition-all duration-200 shadow-lg hover:shadow-xl">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-800 mb-6">
              Ready to Start Cooking?
            </h2>
            <p className="text-xl text-neutral-600 mb-12">
              Join our community of outdoor enthusiasts sharing their favorite trail recipes.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/recipes/add">
                <button className="px-8 py-4 bg-mint-500 text-white rounded-full text-lg font-semibold hover:bg-mint-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                  Submit Your First Recipe
                </button>
              </Link>
              <Link to="/recipes">
                <button className="px-8 py-4 bg-white text-mint-500 border-2 border-mint-500 rounded-full text-lg font-semibold hover:bg-mint-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                  Browse Recipes
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trail Tips Section */}
      <section className="py-20 bg-gradient-to-br from-sunshine-50 to-pink-50">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-800 mb-6">
              Trail Cooking Tips
            </h2>
            <p className="text-xl text-neutral-600 mb-12">
              Learn the secrets of successful trail cooking from experienced outdoor chefs.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/tips">
                <button className="px-8 py-4 bg-sunshine-400 text-white rounded-full text-lg font-semibold hover:bg-sunshine-500 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                  View Tips
                </button>
              </Link>
              <Link to="/community">
                <button className="px-8 py-4 bg-white text-sunshine-400 border-2 border-sunshine-400 rounded-full text-lg font-semibold hover:bg-sunshine-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                  Join Community
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}