import type { Recipe, CreateRecipeRequest, ApiResponse } from '../types/recipe'
import { getMockRecipes, getMockRecipe } from '../data/mockRecipes'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/dev'
const USE_MOCK_DATA = true // Set to false when you have a real API

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message)
    this.name = 'ApiError'
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new ApiError(response.status, errorData.message || `HTTP error! status: ${response.status}`)
  }
  
  return response.json()
}

export const api = {
  // Get all recipes
  async getRecipes(): Promise<Recipe[]> {
    if (USE_MOCK_DATA) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500))
      return getMockRecipes()
    }
    
    const response = await fetch(`${API_BASE_URL}/recipes`)
    const result = await handleResponse<ApiResponse<Recipe[]>>(response)
    return result.data || []
  },

  // Get single recipe
  async getRecipe(id: string): Promise<Recipe> {
    if (USE_MOCK_DATA) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300))
      const recipe = getMockRecipe(id)
      if (!recipe) {
        throw new ApiError(404, 'Recipe not found')
      }
      return recipe
    }
    
    const response = await fetch(`${API_BASE_URL}/recipes/${id}`)
    const result = await handleResponse<ApiResponse<Recipe>>(response)
    if (!result.data) {
      throw new ApiError(404, 'Recipe not found')
    }
    return result.data
  },

  // Create new recipe
  async createRecipe(recipe: CreateRecipeRequest): Promise<Recipe> {
    if (USE_MOCK_DATA) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800))
      const newRecipe: Recipe = {
        ...recipe,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      return newRecipe
    }
    
    const response = await fetch(`${API_BASE_URL}/recipes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(recipe),
    })
    const result = await handleResponse<ApiResponse<Recipe>>(response)
    if (!result.data) {
      throw new ApiError(500, 'Failed to create recipe')
    }
    return result.data
  },

  // Update recipe
  async updateRecipe(id: string, recipe: Partial<CreateRecipeRequest>): Promise<Recipe> {
    if (USE_MOCK_DATA) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 600))
      const existingRecipe = getMockRecipe(id)
      if (!existingRecipe) {
        throw new ApiError(404, 'Recipe not found')
      }
      const updatedRecipe: Recipe = {
        ...existingRecipe,
        ...recipe,
        id,
        updatedAt: new Date().toISOString()
      }
      return updatedRecipe
    }
    
    const response = await fetch(`${API_BASE_URL}/recipes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(recipe),
    })
    const result = await handleResponse<ApiResponse<Recipe>>(response)
    if (!result.data) {
      throw new ApiError(500, 'Failed to update recipe')
    }
    return result.data
  },

  // Delete recipe
  async deleteRecipe(id: string): Promise<void> {
    if (USE_MOCK_DATA) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 400))
      const recipe = getMockRecipe(id)
      if (!recipe) {
        throw new ApiError(404, 'Recipe not found')
      }
      return
    }
    
    const response = await fetch(`${API_BASE_URL}/recipes/${id}`, {
      method: 'DELETE',
    })
    await handleResponse<ApiResponse<void>>(response)
  },
}

export { ApiError }
