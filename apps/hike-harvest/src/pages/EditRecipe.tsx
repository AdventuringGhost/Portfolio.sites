import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { api, ApiError } from '../services/api'
import type { Recipe, CreateRecipeRequest } from '../types/recipe'

export const EditRecipe = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [recipe, setRecipe] = useState<Recipe | null>(null)
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
  })

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
      setFormData({
        title: data.title,
        description: data.description || '',
        ingredients: data.ingredients.length > 0 ? data.ingredients : [''],
        instructions: data.instructions,
        prepTime: data.prepTime,
        cookTime: data.cookTime,
        servings: data.servings,
        difficulty: data.difficulty,
        category: data.category,
        equipment: data.equipment && data.equipment.length > 0 ? data.equipment : [''],
        nutrition: data.nutrition || {
          calories: undefined,
          protein: undefined,
          carbs: undefined,
          fat: undefined,
        },
        tags: data.tags && data.tags.length > 0 ? data.tags : [''],
      })
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!recipe) return

    setSaving(true)
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

      await api.updateRecipe(recipe.id, cleanedData)
      navigate(`/recipes/${recipe.id}`)
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message)
      } else {
        setError('Failed to update recipe')
      }
    } finally {
      setSaving(false)
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
        <button onClick={() => navigate('/recipes')} className="btn-primary">
          Back to Recipes
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-mountain-900 mb-2">Edit Recipe</h1>
        <p className="text-mountain-600">Update your trail-ready recipe</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="card">
          <h2 className="text-xl font-semibold text-mountain-900 mb-4">Basic Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-mountain-700 mb-2">
                Recipe Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="input-field"
                placeholder="e.g., Trail Mix Energy Bars"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-mountain-700 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className="input-field"
                rows={3}
                placeholder="Brief description of the recipe..."
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-mountain-700 mb-2">
                  Category *
                </label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className="input-field"
                >
                  <option value="Breakfast">Breakfast</option>
                  <option value="Lunch">Lunch</option>
                  <option value="Dinner">Dinner</option>
                  <option value="Snack">Snack</option>
                  <option value="Dessert">Dessert</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-mountain-700 mb-2">
                  Difficulty *
                </label>
                <select
                  required
                  value={formData.difficulty}
                  onChange={(e) => handleInputChange('difficulty', e.target.value)}
                  className="input-field"
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
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate(`/recipes/${recipe.id}`)}
            className="btn-secondary"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="btn-primary"
          >
            {saving ? 'Saving Changes...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  )
}
