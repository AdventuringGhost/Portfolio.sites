import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { api, ApiError } from '../services/api'
import type { Recipe } from '../types/recipe'

export const RecipeDetail = () => {
  const { id } = useParams<{ id: string }>()
  const [recipe, setRecipe] = useState<Recipe | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (id) {
      loadRecipe(id)
    }
  }, [id])

  const loadRecipe = async (recipeId: string) => {
    try {
      setLoading(true)
      const data = await api.getRecipe(recipeId)
      setRecipe(data)
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message)
      } else {
        setError('Failed to load recipe')
      }
    } finally {
      setLoading(false)
    }
  }



  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Breakfast': return '🌅'
      case 'Lunch': return '🥪'
      case 'Dinner': return '🍲'
      case 'Snack': return '🥜'
      case 'Dessert': return '🍪'
      default: return '🍽️'
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-mountain-600">Loading recipe...</div>
      </div>
    )
  }

  if (error || !recipe) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 mb-4">Error: {error || 'Recipe not found'}</div>
        <Link to="/recipes" className="btn-primary">
          Back to Recipes
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto space-y-20">
      {/* Header Container */}
      <div 
        className="p-8 rounded-3xl"
        style={{ 
          backgroundColor: 'rgba(240, 242, 189, 0.9)',
          border: '2px solid rgba(75, 53, 42, 0.3)',
          boxShadow: '0 8px 32px rgba(75, 53, 42, 0.15)'
        }}
      >
        <div className="flex items-center justify-center">
          <Link 
            to="/recipes" 
            className="flex items-center text-lg font-bold transition-all duration-200 hover:opacity-70"
            style={{ color: '#4B352A' }}
          >
            <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Recipes
          </Link>
        </div>
      </div>

      {/* Recipe Header */}
      <div 
        className="p-16 rounded-3xl"
        style={{ 
          backgroundColor: 'rgba(255, 255, 255, 1)',
          border: '4px solid rgba(75, 53, 42, 0.5)',
          boxShadow: '0 16px 50px rgba(75, 53, 42, 0.3)'
        }}
      >
        <div className="flex items-start justify-between mb-12">
          <div className="flex-1">
            <div className="text-center mb-8">
              <div className="mb-6">
                <span className="text-8xl">{getCategoryIcon(recipe.category)}</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6" style={{ color: '#4B352A' }}>{recipe.title}</h1>
              <span 
                className="px-6 py-3 text-xl font-bold rounded-full"
                style={{ 
                  backgroundColor: '#CA7842',
                  color: '#F0F2BD'
                }}
              >
                {recipe.difficulty}
              </span>
            </div>
            {recipe.description && (
              <p className="text-2xl font-medium mb-8 leading-relaxed text-center" style={{ color: '#4B352A' }}>{recipe.description}</p>
            )}
          </div>
        </div>

        {/* Recipe Image */}
        {recipe.imageUrl && (
          <div className="mb-12">
            <div className="w-full max-w-4xl mx-auto">
              <div className="w-full h-96 rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src={recipe.imageUrl}
                  alt={recipe.imageAlt || recipe.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        )}

        {/* Recipe Info */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {recipe.prepTime && (
            <div className="text-center p-6 rounded-2xl" style={{ backgroundColor: 'rgba(240, 242, 189, 0.8)', border: '2px solid rgba(75, 53, 42, 0.2)' }}>
              <div className="text-4xl font-bold mb-3" style={{ color: '#CA7842' }}>{recipe.prepTime}</div>
              <div className="text-lg font-bold" style={{ color: '#4B352A' }}>Prep (min)</div>
            </div>
          )}
          {recipe.cookTime && (
            <div className="text-center p-6 rounded-2xl" style={{ backgroundColor: 'rgba(240, 242, 189, 0.8)', border: '2px solid rgba(75, 53, 42, 0.2)' }}>
              <div className="text-4xl font-bold mb-3" style={{ color: '#CA7842' }}>{recipe.cookTime}</div>
              <div className="text-lg font-bold" style={{ color: '#4B352A' }}>Cook (min)</div>
            </div>
          )}
          {recipe.servings && (
            <div className="text-center p-6 rounded-2xl" style={{ backgroundColor: 'rgba(240, 242, 189, 0.8)', border: '2px solid rgba(75, 53, 42, 0.2)' }}>
              <div className="text-4xl font-bold mb-3" style={{ color: '#CA7842' }}>{recipe.servings}</div>
              <div className="text-lg font-bold" style={{ color: '#4B352A' }}>Servings</div>
            </div>
          )}
          <div className="text-center p-6 rounded-2xl" style={{ backgroundColor: 'rgba(240, 242, 189, 0.8)', border: '2px solid rgba(75, 53, 42, 0.2)' }}>
            <div className="text-4xl font-bold mb-3" style={{ color: '#CA7842' }}>{recipe.category}</div>
            <div className="text-lg font-bold" style={{ color: '#4B352A' }}>Category</div>
          </div>
        </div>

        {/* Tags */}
        {recipe.tags && recipe.tags.length > 0 && (
          <div className="flex flex-wrap gap-4 mb-8 justify-center">
            {recipe.tags.map((tag, index) => (
              <span
                key={index}
                className="px-6 py-3 text-lg font-bold rounded-full"
                style={{ 
                  backgroundColor: 'rgba(202, 120, 66, 0.2)',
                  color: '#4B352A',
                  border: '2px solid rgba(202, 120, 66, 0.3)'
                }}
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Nutrition */}
      {recipe.nutrition && (
        <div 
          className="p-12 rounded-3xl"
          style={{ 
            backgroundColor: 'rgba(255, 255, 255, 1)',
            border: '4px solid rgba(75, 53, 42, 0.5)',
            boxShadow: '0 16px 50px rgba(75, 53, 42, 0.3)'
          }}
        >
          <h2 className="text-4xl font-bold mb-8 text-center" style={{ color: '#4B352A' }}>Nutrition (per serving)</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {recipe.nutrition.calories && (
              <div className="text-center p-6 rounded-2xl" style={{ backgroundColor: 'rgba(240, 242, 189, 0.8)', border: '2px solid rgba(75, 53, 42, 0.2)' }}>
                <div className="text-4xl font-bold mb-3" style={{ color: '#CA7842' }}>{recipe.nutrition.calories}</div>
                <div className="text-lg font-bold" style={{ color: '#4B352A' }}>Calories</div>
              </div>
            )}
            {recipe.nutrition.protein && (
              <div className="text-center p-6 rounded-2xl" style={{ backgroundColor: 'rgba(240, 242, 189, 0.8)', border: '2px solid rgba(75, 53, 42, 0.2)' }}>
                <div className="text-4xl font-bold mb-3" style={{ color: '#CA7842' }}>{recipe.nutrition.protein}g</div>
                <div className="text-lg font-bold" style={{ color: '#4B352A' }}>Protein</div>
              </div>
            )}
            {recipe.nutrition.carbs && (
              <div className="text-center p-6 rounded-2xl" style={{ backgroundColor: 'rgba(240, 242, 189, 0.8)', border: '2px solid rgba(75, 53, 42, 0.2)' }}>
                <div className="text-4xl font-bold mb-3" style={{ color: '#CA7842' }}>{recipe.nutrition.carbs}g</div>
                <div className="text-lg font-bold" style={{ color: '#4B352A' }}>Carbs</div>
              </div>
            )}
            {recipe.nutrition.fat && (
              <div className="text-center p-6 rounded-2xl" style={{ backgroundColor: 'rgba(240, 242, 189, 0.8)', border: '2px solid rgba(75, 53, 42, 0.2)' }}>
                <div className="text-4xl font-bold mb-3" style={{ color: '#CA7842' }}>{recipe.nutrition.fat}g</div>
                <div className="text-lg font-bold" style={{ color: '#4B352A' }}>Fat</div>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Ingredients */}
        <div 
          className="p-12 rounded-3xl"
          style={{ 
            backgroundColor: 'rgba(255, 255, 255, 1)',
            border: '4px solid rgba(75, 53, 42, 0.5)',
            boxShadow: '0 16px 50px rgba(75, 53, 42, 0.3)'
          }}
        >
          <h2 className="text-4xl font-bold mb-8 text-center" style={{ color: '#4B352A' }}>Ingredients</h2>
          <ul className="space-y-6">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="flex items-center">
                <span 
                  className="w-4 h-4 rounded-full mr-6 flex-shrink-0"
                  style={{ backgroundColor: '#CA7842' }}
                ></span>
                <span className="text-xl font-bold" style={{ color: '#4B352A' }}>{ingredient}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Equipment */}
        {recipe.equipment && recipe.equipment.length > 0 && (
          <div 
            className="p-12 rounded-3xl"
            style={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              border: '3px solid rgba(75, 53, 42, 0.3)',
              boxShadow: '0 12px 40px rgba(75, 53, 42, 0.2)'
            }}
          >
            <h2 className="text-4xl font-bold mb-8 text-center" style={{ color: '#4B352A' }}>Equipment Needed</h2>
            <ul className="space-y-6">
              {recipe.equipment.map((item, index) => (
                <li key={index} className="flex items-center">
                  <span 
                    className="w-4 h-4 rounded-full mr-6 flex-shrink-0"
                    style={{ backgroundColor: '#FB4141' }}
                  ></span>
                  <span className="text-xl font-bold" style={{ color: '#4B352A' }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Instructions */}
      <div 
        className="p-12 rounded-3xl"
        style={{ 
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          border: '3px solid rgba(75, 53, 42, 0.3)',
          boxShadow: '0 12px 40px rgba(75, 53, 42, 0.2)'
        }}
      >
        <h2 className="text-4xl font-bold mb-8 text-center" style={{ color: '#4B352A' }}>Instructions</h2>
        <div className="prose max-w-none">
          <p className="text-xl font-bold leading-relaxed whitespace-pre-wrap" style={{ color: '#4B352A' }}>{recipe.instructions}</p>
        </div>
      </div>
    </div>
  )
}
