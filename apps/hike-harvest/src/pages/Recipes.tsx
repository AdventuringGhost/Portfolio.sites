import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { api, ApiError } from '../services/api'
import type { Recipe } from '../types/recipe'

export const Recipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const categories = ['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Dessert', 'Drinks']

  useEffect(() => {
    loadRecipes()
  }, [])

  const loadRecipes = async () => {
    try {
      setLoading(true)
      const data = await api.getRecipes()
      setRecipes(data)
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message)
      } else {
        setError('Failed to load recipes')
      }
    } finally {
      setLoading(false)
    }
  }

  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         recipe.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         recipe.ingredients.some(ingredient => 
                           ingredient.toLowerCase().includes(searchTerm.toLowerCase())
                         )
    return matchesSearch
  })


  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Breakfast': return '🌅'
      case 'Lunch': return '🥪'
      case 'Dinner': return '🍲'
      case 'Snack': return '🥜'
      case 'Dessert': return '🍪'
      case 'Drinks': return '🥤'
      default: return '🍽️'
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-mountain-600">Loading recipes...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 mb-4">Error: {error}</div>
        <button onClick={loadRecipes} className="btn-primary">
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <div 
        className="p-12 rounded-3xl"
        style={{ 
          background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.8) 0%, rgba(251, 191, 36, 0.8) 100%), url("https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80") center/cover',
          border: '2px solid rgba(75, 53, 42, 0.2)'
        }}
      >
        <div className="text-center" style={{ paddingTop: '8rem', paddingBottom: '8rem' }}>
          <h1 className="text-5xl md:text-6xl font-light mb-8" style={{ color: '#4B352A' }}>
            🍽️ Trail Recipes
          </h1>
          <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed font-light" style={{ color: '#4B352A' }}>
            Discover delicious meals for your next adventure. From quick snacks to hearty dinners, 
            find the perfect recipe for every trail.
          </p>
        </div>
      </div>

      {/* Search and Category Navigation */}
      <div 
        className="p-8 rounded-3xl"
        style={{ 
          backgroundColor: 'rgba(240, 242, 189, 0.8)',
          border: '2px solid rgba(75, 53, 42, 0.2)'
        }}
      >
        {/* Search Bar */}
        <div className="mb-8">
          <label className="block text-lg font-medium mb-3" style={{ color: '#4B352A' }}>
            Search Recipes
          </label>
          <input
            type="text"
            placeholder="Search by name, ingredients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 rounded-full text-lg font-light border-2 border-transparent focus:outline-none focus:border-[#CA7842] transition-colors duration-200"
            style={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              color: '#4B352A'
            }}
          />
        </div>

        {/* Category Navigation Buttons */}
        <div>
          <h3 className="text-lg font-medium mb-4" style={{ color: '#4B352A' }}>
            Browse by Category
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map(category => (
              <Link
                key={category}
                to={`/recipes/category/${category.toLowerCase()}`}
                className="group block"
              >
                <div
                  className="p-4 rounded-2xl text-center transition-all duration-300 group-hover:scale-95 group-hover:shadow-lg"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    border: '2px solid rgba(75, 53, 42, 0.1)',
                    boxShadow: '0 4px 15px rgba(202, 120, 66, 0.1)'
                  }}
                >
                  <div className="text-3xl mb-2">{getCategoryIcon(category)}</div>
                  <div className="text-sm font-medium" style={{ color: '#4B352A' }}>
                    {category}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Clear Search Button */}
        {searchTerm && (
          <div className="mt-6 text-center">
            <button
              onClick={() => setSearchTerm('')}
              className="px-6 py-2 rounded-full font-medium transition-all duration-300 hover:scale-95"
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
              Clear Search
            </button>
          </div>
        )}
      </div>

      {/* Results */}
      <div className="text-center mb-8">
        <p className="text-xl font-light" style={{ color: '#4B352A' }}>
          {filteredRecipes.length} recipe{filteredRecipes.length !== 1 ? 's' : ''} found
        </p>
      </div>

      {/* Recipe Grid Container */}
      <div 
        className="p-8 rounded-3xl"
        style={{ 
          backgroundColor: 'rgba(240, 242, 189, 0.9)',
          border: '2px solid rgba(75, 53, 42, 0.3)',
          boxShadow: '0 8px 32px rgba(75, 53, 42, 0.15)'
        }}
      >
        {filteredRecipes.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-6">🍽️</div>
            <h3 className="text-2xl font-bold mb-4" style={{ color: '#4B352A' }}>No recipes found</h3>
            <p className="text-lg mb-8 font-medium" style={{ color: '#4B352A' }}>
              {searchTerm 
                ? 'Try adjusting your search criteria'
                : 'Be the first to add a recipe!'
              }
            </p>
            <Link to="/recipes/add">
              <button 
                className="px-12 py-4 rounded-full font-medium text-lg transition-all duration-300 hover:scale-95"
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
                Submit Recipe
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRecipes.map((recipe) => (
              <Link
                key={recipe.id}
                to={`/recipes/${recipe.id}`}
                className="group block"
              >
                <div
                  className="p-6 rounded-2xl transition-all duration-300 hover:scale-95 hover:shadow-xl"
                  style={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: '2px solid rgba(75, 53, 42, 0.2)',
                    boxShadow: '0 4px 20px rgba(75, 53, 42, 0.1)'
                  }}
                >
                  {/* Recipe Image */}
                  {recipe.imageUrl ? (
                    <div className="w-full h-48 rounded-xl mb-4 overflow-hidden">
                      <img
                        src={recipe.imageUrl}
                        alt={recipe.imageAlt || recipe.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  ) : (
                    <div
                      className="w-full h-48 rounded-xl mb-4 flex items-center justify-center text-4xl"
                      style={{
                        backgroundColor: 'rgba(240, 242, 189, 0.3)',
                        border: '2px solid rgba(75, 53, 42, 0.1)'
                      }}
                    >
                      {getCategoryIcon(recipe.category)}
                    </div>
                  )}

                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-bold group-hover:text-[#CA7842] transition-colors duration-300" style={{ color: '#4B352A' }}>
                      {recipe.title}
                    </h3>
                    <span className="text-3xl">{getCategoryIcon(recipe.category)}</span>
                  </div>
                  
                  {recipe.description && (
                    <p className="mb-4 text-sm font-medium leading-relaxed" style={{ color: '#4B352A' }}>
                      {recipe.description}
                    </p>
                  )}
                  
                  <div className="flex items-center justify-between mb-4">
                    <span 
                      className="px-3 py-1 text-sm font-bold rounded-full"
                      style={{ 
                        backgroundColor: '#CA7842',
                        color: '#F0F2BD'
                      }}
                    >
                      {recipe.difficulty}
                    </span>
                    <span className="text-sm font-bold" style={{ color: '#4B352A' }}>
                      {recipe.prepTime && `${recipe.prepTime}min`}
                      {recipe.prepTime && recipe.cookTime && ' + '}
                      {recipe.cookTime && `${recipe.cookTime}min`}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {recipe.ingredients.slice(0, 3).map((ingredient, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 text-xs font-medium rounded-full"
                        style={{ 
                          backgroundColor: 'rgba(202, 120, 66, 0.2)',
                          color: '#4B352A'
                        }}
                      >
                        {ingredient}
                      </span>
                    ))}
                    {recipe.ingredients.length > 3 && (
                      <span 
                        className="px-3 py-1 text-xs font-medium rounded-full"
                        style={{ 
                          backgroundColor: 'rgba(75, 53, 42, 0.2)',
                          color: '#4B352A'
                        }}
                      >
                        +{recipe.ingredients.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
