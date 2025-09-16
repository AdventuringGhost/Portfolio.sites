import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api, ApiError } from '../services/api'
import type { CreateRecipeRequest } from '../types/recipe'

export const AddRecipe = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState<CreateRecipeRequest>({
    title: '',
    description: '',
    ingredients: [''],
    instructions: '',
    prepTime: undefined,
    cookTime: undefined,
    servings: undefined,
    difficulty: 'Easy',
    category: 'Breakfast',
    equipment: [''],
    nutrition: {
      calories: undefined,
      protein: undefined,
      carbs: undefined,
      fat: undefined,
    },
    tags: [''],
    imageUrl: '',
    imageAlt: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // Clean up empty fields
      const cleanedData = {
        ...formData,
        ingredients: formData.ingredients.filter(ing => ing.trim() !== ''),
        equipment: formData.equipment?.filter(eq => eq.trim() !== ''),
        tags: formData.tags?.filter(tag => tag.trim() !== ''),
        description: formData.description || undefined,
        prepTime: formData.prepTime || undefined,
        cookTime: formData.cookTime || undefined,
        servings: formData.servings || undefined,
        nutrition: formData.nutrition?.calories ? formData.nutrition : undefined,
      }

      const recipe = await api.createRecipe(cleanedData)
      navigate(`/recipes/${recipe.id}`)
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message)
      } else {
        setError('Failed to create recipe')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleArrayChange = (field: 'ingredients' | 'equipment' | 'tags', index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field]?.map((item, i) => i === index ? value : item) || []
    }))
  }

  const addArrayItem = (field: 'ingredients' | 'equipment' | 'tags') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...(prev[field] || []), '']
    }))
  }

  const removeArrayItem = (field: 'ingredients' | 'equipment' | 'tags', index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field]?.filter((_, i) => i !== index) || []
    }))
  }

  return (
    <div className="max-w-4xl mx-auto space-y-16">
      {/* Hero Section */}
      <div 
        className="p-12 rounded-3xl"
        style={{ 
          background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.8) 0%, rgba(251, 191, 36, 0.8) 100%), url("https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80") center/cover',
          border: '2px solid rgba(75, 53, 42, 0.2)'
        }}
      >
        <div className="text-center" style={{ paddingTop: '6rem', paddingBottom: '6rem' }}>
          <h1 className="text-4xl md:text-5xl font-light mb-6" style={{ color: '#4B352A' }}>
            ✍️ Add New Recipe
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed font-light" style={{ color: '#4B352A' }}>
            Share your favorite trail-ready recipe with the community. Help fellow adventurers 
            discover delicious meals for their next outdoor journey.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-12">
        {/* Basic Info */}
        <div 
          className="p-8 rounded-3xl"
          style={{ 
            backgroundColor: 'rgba(240, 242, 189, 0.8)',
            border: '2px solid rgba(75, 53, 42, 0.2)'
          }}
        >
          <h2 className="text-2xl font-medium mb-6" style={{ color: '#4B352A' }}>Basic Information</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-lg font-medium mb-3" style={{ color: '#4B352A' }}>
                Recipe Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="w-full px-4 py-3 rounded-full text-lg font-light border-2 border-transparent focus:outline-none focus:border-[#CA7842] transition-colors duration-200"
                style={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  color: '#4B352A'
                }}
                placeholder="e.g., Trail Mix Energy Bars"
              />
            </div>
            <div>
              <label className="block text-lg font-medium mb-3" style={{ color: '#4B352A' }}>
                Recipe Photo URL
              </label>
              <input
                type="url"
                value={formData.imageUrl || ''}
                onChange={(e) => handleInputChange('imageUrl', e.target.value)}
                className="w-full px-4 py-3 rounded-full text-lg font-light border-2 border-transparent focus:outline-none focus:border-[#CA7842] transition-colors duration-200"
                style={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  color: '#4B352A'
                }}
                placeholder="https://example.com/recipe-photo.jpg"
              />
            </div>
            <div>
              <label className="block text-lg font-medium mb-3" style={{ color: '#4B352A' }}>
                Photo Description
              </label>
              <input
                type="text"
                value={formData.imageAlt || ''}
                onChange={(e) => handleInputChange('imageAlt', e.target.value)}
                className="w-full px-4 py-3 rounded-full text-lg font-light border-2 border-transparent focus:outline-none focus:border-[#CA7842] transition-colors duration-200"
                style={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  color: '#4B352A'
                }}
                placeholder="e.g., Bowl of warm oatmeal with nuts and dried fruit"
              />
            </div>
            <div>
              <label className="block text-lg font-medium mb-3" style={{ color: '#4B352A' }}>
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className="w-full px-4 py-3 rounded-2xl text-lg font-light border-2 border-transparent focus:outline-none focus:border-[#CA7842] transition-colors duration-200"
                style={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  color: '#4B352A'
                }}
                rows={3}
                placeholder="Brief description of the recipe..."
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-lg font-medium mb-3" style={{ color: '#4B352A' }}>
                  Category *
                </label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className="w-full px-4 py-3 rounded-full text-lg font-light border-2 border-transparent focus:outline-none focus:border-[#CA7842] transition-colors duration-200"
                  style={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    color: '#4B352A'
                  }}
                >
                  <option value="Breakfast">Breakfast</option>
                  <option value="Lunch">Lunch</option>
                  <option value="Dinner">Dinner</option>
                  <option value="Snack">Snack</option>
                  <option value="Dessert">Dessert</option>
                </select>
              </div>
              <div>
                <label className="block text-lg font-medium mb-3" style={{ color: '#4B352A' }}>
                  Difficulty *
                </label>
                <select
                  required
                  value={formData.difficulty}
                  onChange={(e) => handleInputChange('difficulty', e.target.value)}
                  className="w-full px-4 py-3 rounded-full text-lg font-light border-2 border-transparent focus:outline-none focus:border-[#CA7842] transition-colors duration-200"
                  style={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    color: '#4B352A'
                  }}
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Timing & Servings */}
        <div className="card">
          <h2 className="text-xl font-semibold text-mountain-900 mb-4">Timing & Servings</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-mountain-700 mb-2">
                Prep Time (minutes)
              </label>
              <input
                type="number"
                min="0"
                value={formData.prepTime || ''}
                onChange={(e) => handleInputChange('prepTime', e.target.value ? parseInt(e.target.value) : undefined)}
                className="input-field"
                placeholder="15"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-mountain-700 mb-2">
                Cook Time (minutes)
              </label>
              <input
                type="number"
                min="0"
                value={formData.cookTime || ''}
                onChange={(e) => handleInputChange('cookTime', e.target.value ? parseInt(e.target.value) : undefined)}
                className="input-field"
                placeholder="30"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-mountain-700 mb-2">
                Servings
              </label>
              <input
                type="number"
                min="1"
                value={formData.servings || ''}
                onChange={(e) => handleInputChange('servings', e.target.value ? parseInt(e.target.value) : undefined)}
                className="input-field"
                placeholder="4"
              />
            </div>
          </div>
        </div>

        {/* Ingredients */}
        <div className="card">
          <h2 className="text-xl font-semibold text-mountain-900 mb-4">Ingredients *</h2>
          <div className="space-y-2">
            {formData.ingredients.map((ingredient, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="text"
                  required={index === 0}
                  value={ingredient}
                  onChange={(e) => handleArrayChange('ingredients', index, e.target.value)}
                  className="input-field flex-1"
                  placeholder="e.g., 1 cup oats"
                />
                {formData.ingredients.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeArrayItem('ingredients', index)}
                    className="text-red-600 hover:text-red-700 p-2"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem('ingredients')}
              className="btn-secondary text-sm"
            >
              + Add Ingredient
            </button>
          </div>
        </div>

        {/* Instructions */}
        <div className="card">
          <h2 className="text-xl font-semibold text-mountain-900 mb-4">Instructions *</h2>
          <textarea
            required
            value={formData.instructions}
            onChange={(e) => handleInputChange('instructions', e.target.value)}
            className="input-field"
            rows={6}
            placeholder="Step-by-step cooking instructions..."
          />
        </div>

        {/* Equipment */}
        <div className="card">
          <h2 className="text-xl font-semibold text-mountain-900 mb-4">Equipment Needed</h2>
          <div className="space-y-2">
            {formData.equipment?.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleArrayChange('equipment', index, e.target.value)}
                  className="input-field flex-1"
                  placeholder="e.g., Camping stove, Pot"
                />
                {formData.equipment && formData.equipment.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeArrayItem('equipment', index)}
                    className="text-red-600 hover:text-red-700 p-2"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem('equipment')}
              className="btn-secondary text-sm"
            >
              + Add Equipment
            </button>
          </div>
        </div>

        {/* Tags */}
        <div className="card">
          <h2 className="text-xl font-semibold text-mountain-900 mb-4">Tags</h2>
          <div className="space-y-2">
            {formData.tags?.map((tag, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={tag}
                  onChange={(e) => handleArrayChange('tags', index, e.target.value)}
                  className="input-field flex-1"
                  placeholder="e.g., high-protein, vegan, no-cook"
                />
                {formData.tags && formData.tags.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeArrayItem('tags', index)}
                    className="text-red-600 hover:text-red-700 p-2"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem('tags')}
              className="btn-secondary text-sm"
            >
              + Add Tag
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Submit Button */}
        <div className="flex justify-center space-x-6">
          <button
            type="button"
            onClick={() => navigate('/recipes')}
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
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-4 rounded-full font-medium text-lg transition-all duration-300 hover:scale-105 disabled:opacity-50"
            style={{ 
              backgroundColor: '#CA7842', 
              color: '#F0F2BD',
              border: '2px solid #CA7842'
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.currentTarget.style.backgroundColor = '#F0F2BD';
                e.currentTarget.style.color = '#CA7842';
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.currentTarget.style.backgroundColor = '#CA7842';
                e.currentTarget.style.color = '#F0F2BD';
              }
            }}
          >
            {loading ? 'Creating Recipe...' : 'Create Recipe'}
          </button>
        </div>
      </form>
    </div>
  )
}
