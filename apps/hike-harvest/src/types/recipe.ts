export interface Recipe {
  id: string
  title: string
  description?: string
  ingredients: string[]
  instructions: string
  prepTime?: number // in minutes
  cookTime?: number // in minutes
  servings?: number
  difficulty: 'Easy' | 'Medium' | 'Hard'
  category: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack' | 'Dessert' | 'Drinks'
  equipment?: string[]
  nutrition?: {
    calories?: number
    protein?: number
    carbs?: number
    fat?: number
  }
  tags?: string[]
  imageUrl?: string
  imageAlt?: string
  createdAt: string
  updatedAt: string
}

export interface CreateRecipeRequest {
  title: string
  description?: string
  ingredients: string[]
  instructions: string
  prepTime?: number
  cookTime?: number
  servings?: number
  difficulty: 'Easy' | 'Medium' | 'Hard'
  category: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack' | 'Dessert' | 'Drinks'
  equipment?: string[]
  nutrition?: {
    calories?: number
    protein?: number
    carbs?: number
    fat?: number
  }
  tags?: string[]
  imageUrl?: string
  imageAlt?: string
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}
