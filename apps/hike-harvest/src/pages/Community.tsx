import { Link } from 'react-router-dom'

export const Community = () => {
  const communityFeatures = [
    {
      title: 'Share Recipes',
      icon: '✍️',
      description: 'Upload your favorite trail recipes and help fellow adventurers discover new meals for their outdoor adventures.',
      action: 'Add Recipe'
    },
    {
      title: 'Rate & Review',
      icon: '⭐',
      description: 'Share your experience with recipes by rating and reviewing them. Help others find the best trail meals.',
      action: 'Browse Recipes'
    },
    {
      title: 'Get Inspired',
      icon: '💡',
      description: 'Discover new cooking techniques, meal ideas, and trail tips from our community of outdoor enthusiasts.',
      action: 'View Tips'
    },
    {
      title: 'Connect',
      icon: '🤝',
      description: 'Join discussions, share stories, and connect with like-minded adventurers who love trail cooking.',
      action: 'Join Community'
    }
  ]

  const stats = [
    { number: '500+', label: 'Recipes Shared' },
    { number: '2,500+', label: 'Community Members' },
    { number: '10,000+', label: 'Meals Cooked' },
    { number: '50+', label: 'Countries Represented' }
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
            🤝 Community
          </h1>
          <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed font-light" style={{ color: '#4B352A' }}>
            Join a vibrant community of outdoor enthusiasts sharing their love for trail cooking. 
            Connect, learn, and inspire others with your culinary adventures.
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div 
        className="p-8 rounded-3xl"
        style={{ 
          backgroundColor: 'rgba(240, 242, 189, 0.8)',
          border: '2px solid rgba(75, 53, 42, 0.2)'
        }}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2" style={{ color: '#CA7842' }}>
                {stat.number}
              </div>
              <div className="text-lg font-light" style={{ color: '#4B352A' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Community Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {communityFeatures.map((feature, index) => (
          <div
            key={index}
            className="p-8 rounded-3xl transition-all duration-300 hover:scale-105"
            style={{ 
              backgroundColor: 'rgba(240, 242, 189, 0.8)',
              border: '2px solid rgba(75, 53, 42, 0.2)'
            }}
          >
            <div className="text-center mb-6">
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-medium mb-4" style={{ color: '#4B352A' }}>
                {feature.title}
              </h3>
              <p className="text-lg font-light mb-6" style={{ color: '#4B352A' }}>
                {feature.description}
              </p>
            </div>
            <div className="text-center">
              <Link to={feature.action === 'Add Recipe' ? '/recipes/add' : 
                       feature.action === 'Browse Recipes' ? '/recipes' : 
                       feature.action === 'View Tips' ? '/tips' : '#'}>
                <button 
                  className="px-6 py-3 rounded-full font-medium text-lg transition-all duration-300 hover:scale-105"
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
                  {feature.action}
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Community Guidelines */}
      <div 
        className="p-8 rounded-3xl"
        style={{ 
          backgroundColor: 'rgba(240, 242, 189, 0.8)',
          border: '2px solid rgba(75, 53, 42, 0.2)'
        }}
      >
        <h2 className="text-3xl font-medium mb-6 text-center" style={{ color: '#4B352A' }}>
          Community Guidelines
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-medium mb-4" style={{ color: '#4B352A' }}>
              Be Respectful
            </h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span 
                  className="w-2 h-2 rounded-full mr-3 mt-2 flex-shrink-0"
                  style={{ backgroundColor: '#CA7842' }}
                ></span>
                <span className="text-base font-light" style={{ color: '#4B352A' }}>
                  Treat all community members with kindness and respect
                </span>
              </li>
              <li className="flex items-start">
                <span 
                  className="w-2 h-2 rounded-full mr-3 mt-2 flex-shrink-0"
                  style={{ backgroundColor: '#CA7842' }}
                ></span>
                <span className="text-base font-light" style={{ color: '#4B352A' }}>
                  Share constructive feedback and helpful suggestions
                </span>
              </li>
              <li className="flex items-start">
                <span 
                  className="w-2 h-2 rounded-full mr-3 mt-2 flex-shrink-0"
                  style={{ backgroundColor: '#CA7842' }}
                ></span>
                <span className="text-base font-light" style={{ color: '#4B352A' }}>
                  Celebrate diverse cooking styles and dietary preferences
                </span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-medium mb-4" style={{ color: '#4B352A' }}>
              Share Quality Content
            </h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span 
                  className="w-2 h-2 rounded-full mr-3 mt-2 flex-shrink-0"
                  style={{ backgroundColor: '#CA7842' }}
                ></span>
                <span className="text-base font-light" style={{ color: '#4B352A' }}>
                  Provide clear, detailed recipe instructions
                </span>
              </li>
              <li className="flex items-start">
                <span 
                  className="w-2 h-2 rounded-full mr-3 mt-2 flex-shrink-0"
                  style={{ backgroundColor: '#CA7842' }}
                ></span>
                <span className="text-base font-light" style={{ color: '#4B352A' }}>
                  Include accurate cooking times and serving sizes
                </span>
              </li>
              <li className="flex items-start">
                <span 
                  className="w-2 h-2 rounded-full mr-3 mt-2 flex-shrink-0"
                  style={{ backgroundColor: '#CA7842' }}
                ></span>
                <span className="text-base font-light" style={{ color: '#4B352A' }}>
                  Share your personal experiences and tips
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Join Community CTA */}
      <div 
        className="p-12 rounded-3xl text-center"
        style={{ 
          backgroundColor: 'rgba(240, 242, 189, 0.8)',
          border: '2px solid rgba(75, 53, 42, 0.2)'
        }}
      >
        <h2 className="text-3xl font-medium mb-6" style={{ color: '#4B352A' }}>
          Ready to Join Our Community?
        </h2>
        <p className="text-lg font-light mb-8 max-w-2xl mx-auto" style={{ color: '#4B352A' }}>
          Start sharing your trail cooking adventures today. Whether you're a seasoned outdoor chef 
          or just starting out, there's a place for you in our community.
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
              Share Your First Recipe
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
              Explore Community Recipes
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
