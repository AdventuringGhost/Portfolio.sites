import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { api } from '../services/api'
import type { Recipe } from '../types/recipe'

export function CategoryRecipes() {
  const { category } = useParams<{ category: string }>()
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true)
        const allRecipes = await api.getRecipes()
        const categoryRecipes = allRecipes.filter(recipe => 
          recipe.category.toLowerCase() === category?.toLowerCase()
        )
        setRecipes(categoryRecipes)
      } catch (err) {
        setError('Failed to load recipes')
        console.error('Error fetching recipes:', err)
      } finally {
        setLoading(false)
      }
    }

    if (category) {
      fetchRecipes()
    }
  }, [category])

  const getCategoryEmoji = (category: string) => {
    const emojiMap: Record<string, string> = {
      breakfast: '🌅',
      lunch: '🥪',
      dinner: '🍲',
      snack: '🥜',
      dessert: '🍪',
      drinks: '🥤'
    }
    return emojiMap[category.toLowerCase()] || '🍽️'
  }

  const getCategoryColor = (category: string) => {
    const colorMap: Record<string, string> = {
      breakfast: '#FF9B2F',
      lunch: '#78C841',
      dinner: '#B4E50D',
      snack: '#FB4141',
      dessert: '#CA7842',
      drinks: '#4B352A'
    }
    return colorMap[category.toLowerCase()] || '#CA7842'
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{ borderColor: '#CA7842' }}></div>
          <p className="text-lg" style={{ color: '#4B352A' }}>Loading recipes...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-red-600 mb-4">{error}</p>
          <Link 
            to="/recipes"
            className="px-6 py-3 rounded-full font-medium transition-all duration-300 hover:scale-95"
            style={{
              backgroundColor: '#CA7842',
              color: '#F0F2BD',
              border: '2px solid #CA7842'
            }}
          >
            Back to All Recipes
          </Link>
        </div>
      </div>
    )
  }

  const categoryName = category ? category.charAt(0).toUpperCase() + category.slice(1) : ''

  return (
    <div className="min-h-screen py-8">
      {/* Hero Section */}
      <div 
        className="text-center py-16 mb-12 rounded-3xl"
        style={{
          background: `linear-gradient(135deg, ${getCategoryColor(categoryName)} 0%, rgba(240, 242, 189, 0.8) 100%)`,
          border: '2px solid rgba(75, 53, 42, 0.2)',
          boxShadow: '0 8px 32px rgba(75, 53, 42, 0.1)'
        }}
      >
        <div className="text-6xl mb-4">{getCategoryEmoji(categoryName)}</div>
        <h1 className="text-4xl font-bold mb-4" style={{ color: '#4B352A' }}>
          {categoryName} Recipes
        </h1>
        <p className="text-lg" style={{ color: '#4B352A' }}>
          Discover delicious {categoryName.toLowerCase()} recipes perfect for your trail adventures
        </p>
      </div>

      {/* Back to All Recipes */}
      <div className="mb-8 text-center">
        <Link 
          to="/recipes"
          className="inline-flex items-center px-6 py-3 rounded-full font-medium transition-all duration-300 hover:scale-95"
          style={{
            backgroundColor: 'rgba(75, 53, 42, 0.1)',
            color: '#4B352A',
            border: '2px solid rgba(75, 53, 42, 0.2)'
          }}
        >
          ← Back to All Recipes
        </Link>
      </div>

      {/* Results Count */}
      <div className="mb-8 text-center">
        <p className="text-lg" style={{ color: '#4B352A' }}>
          {recipes.length} {recipes.length === 1 ? 'recipe' : 'recipes'} found
        </p>
      </div>

      {/* Recipe Grid */}
      {recipes.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#4B352A' }}>
            No {categoryName.toLowerCase()} recipes found
          </h2>
          <p className="text-lg mb-8" style={{ color: '#4B352A' }}>
            Be the first to share a {categoryName.toLowerCase()} recipe!
          </p>
          <Link 
            to="/recipes/add"
            className="px-8 py-4 rounded-full font-medium text-lg transition-all duration-300 hover:scale-95"
            style={{
              backgroundColor: '#CA7842',
              color: '#F0F2BD',
              border: '2px solid #CA7842'
            }}
          >
            Submit Your Recipe
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recipes.map((recipe) => (
            <Link
              key={recipe.id}
              to={`/recipes/${recipe.id}`}
              className="group block"
            >
              <div
                className="bg-white rounded-2xl p-6 shadow-lg transition-all duration-300 group-hover:scale-95 group-hover:shadow-xl"
                style={{
                  border: '2px solid rgba(75, 53, 42, 0.1)',
                  boxShadow: '0 8px 25px rgba(202, 120, 66, 0.1)'
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
                    {getCategoryEmoji(recipe.category)}
                  </div>
                )}

                {/* Recipe Info */}
                <div className="space-y-3">
                  <h3 className="text-xl font-bold group-hover:text-[#CA7842] transition-colors duration-300" style={{ color: '#4B352A' }}>
                    {recipe.title}
                  </h3>
                  
                  <p className="text-sm" style={{ color: '#4B352A' }}>
                    {recipe.description}
                  </p>

                  {/* Recipe Meta */}
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span
                      className="px-3 py-1 rounded-full font-medium"
                      style={{
                        backgroundColor: getCategoryColor(recipe.category),
                        color: '#F0F2BD'
                      }}
                    >
                      {recipe.category}
                    </span>
                    <span
                      className="px-3 py-1 rounded-full font-medium"
                      style={{
                        backgroundColor: 'rgba(75, 53, 42, 0.1)',
                        color: '#4B352A'
                      }}
                    >
                      {recipe.difficulty}
                    </span>
                    <span
                      className="px-3 py-1 rounded-full font-medium"
                      style={{
                        backgroundColor: 'rgba(75, 53, 42, 0.1)',
                        color: '#4B352A'
                      }}
                    >
                      {(recipe.prepTime || 0) + (recipe.cookTime || 0)} min
                    </span>
                  </div>

                  {/* Tags */}
                  {recipe.tags && recipe.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {recipe.tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 rounded text-xs"
                          style={{
                            backgroundColor: 'rgba(240, 242, 189, 0.5)',
                            color: '#4B352A'
                          }}
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
