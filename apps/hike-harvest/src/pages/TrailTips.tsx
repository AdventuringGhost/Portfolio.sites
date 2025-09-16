import { Link } from 'react-router-dom'

export const TrailTips = () => {
  const tips = [
    {
      category: 'Meal Planning',
      icon: '📋',
      tips: [
        'Plan meals based on trip duration and activity level',
        'Pack 1.5-2 pounds of food per person per day',
        'Include a mix of quick snacks and hearty meals',
        'Consider water availability when planning meals'
      ]
    },
    {
      category: 'Food Storage',
      icon: '🎒',
      tips: [
        'Use bear canisters in bear country',
        'Hang food bags 10 feet high and 4 feet from tree trunk',
        'Keep food in waterproof containers',
        'Store food away from your sleeping area'
      ]
    },
    {
      category: 'Cooking Techniques',
      icon: '🔥',
      tips: [
        'Use a windscreen to conserve fuel',
        'Soak dehydrated foods before cooking',
        'Cook in batches to save fuel',
        'Let food cool before eating to avoid burns'
      ]
    },
    {
      category: 'Nutrition',
      icon: '🥗',
      tips: [
        'Aim for 2,500-4,500 calories per day',
        'Include 10-15% protein in your diet',
        'Pack electrolyte supplements for long hikes',
        'Eat small, frequent meals to maintain energy'
      ]
    },
    {
      category: 'Safety',
      icon: '⚠️',
      tips: [
        'Always boil water for at least 1 minute',
        'Use a water filter for questionable sources',
        'Pack a first aid kit with food-related items',
        'Know the signs of food poisoning'
      ]
    },
    {
      category: 'Cleanup',
      icon: '🧽',
      tips: [
        'Pack out all food scraps and packaging',
        'Use biodegradable soap sparingly',
        'Wash dishes 200 feet from water sources',
        'Leave no trace of your cooking activities'
      ]
    }
  ]

  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <div 
        className="p-12 rounded-3xl"
        style={{ 
          background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.8) 0%, rgba(251, 191, 36, 0.8) 100%), url("https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80") center/cover',
          border: '2px solid rgba(75, 53, 42, 0.2)'
        }}
      >
        <div className="text-center" style={{ paddingTop: '8rem', paddingBottom: '8rem' }}>
          <h1 className="text-5xl md:text-6xl font-light mb-8" style={{ color: '#4B352A' }}>
            🧭 Trail Tips
          </h1>
          <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed font-light" style={{ color: '#4B352A' }}>
            Master the art of trail cooking with expert tips for meal planning, food storage, 
            cooking techniques, and safety. Make every outdoor meal a success.
          </p>
        </div>
      </div>

      {/* Tips Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tips.map((category, index) => (
          <div
            key={index}
            className="p-8 rounded-3xl transition-all duration-300 hover:scale-105"
            style={{ 
              backgroundColor: 'rgba(240, 242, 189, 0.8)',
              border: '2px solid rgba(75, 53, 42, 0.2)'
            }}
          >
            <div className="text-center mb-6">
              <div className="text-5xl mb-4">{category.icon}</div>
              <h3 className="text-2xl font-medium" style={{ color: '#4B352A' }}>
                {category.category}
              </h3>
            </div>
            <ul className="space-y-3">
              {category.tips.map((tip, tipIndex) => (
                <li key={tipIndex} className="flex items-start">
                  <span 
                    className="w-2 h-2 rounded-full mr-3 mt-2 flex-shrink-0"
                    style={{ backgroundColor: '#CA7842' }}
                  ></span>
                  <span className="text-base font-light" style={{ color: '#4B352A' }}>
                    {tip}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div 
        className="p-12 rounded-3xl text-center"
        style={{ 
          backgroundColor: 'rgba(240, 242, 189, 0.8)',
          border: '2px solid rgba(75, 53, 42, 0.2)'
        }}
      >
        <h2 className="text-3xl font-medium mb-6" style={{ color: '#4B352A' }}>
          Ready to Share Your Own Tips?
        </h2>
        <p className="text-lg font-light mb-8 max-w-2xl mx-auto" style={{ color: '#4B352A' }}>
          Have trail cooking wisdom to share? Add your own recipes and tips to help 
          fellow adventurers on their outdoor journeys.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/recipes/add">
            <button 
              className="px-8 py-4 rounded-full font-medium text-lg transition-all duration-300 hover:scale-105"
              style={{ 
                backgroundColor: '#CA7842', 
                color: '#F0F2BD',
                border: '2px solid #CA7842'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#F0F2BD';
                e.currentTarget.style.color = '#CA7842';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#CA7842';
                e.currentTarget.style.color = '#F0F2BD';
              }}
            >
              Add Recipe
            </button>
          </Link>
          <Link to="/recipes">
            <button 
              className="px-8 py-4 rounded-full font-medium text-lg transition-all duration-300 hover:scale-105"
              style={{ 
                backgroundColor: '#F0F2BD', 
                color: '#CA7842',
                border: '2px solid #CA7842'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#CA7842';
                e.currentTarget.style.color = '#F0F2BD';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#F0F2BD';
                e.currentTarget.style.color = '#CA7842';
              }}
            >
              Browse Recipes
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
