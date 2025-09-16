import type { Recipe } from '../types/recipe'

export const mockRecipes: Recipe[] = [
  // BREAKFAST RECIPES
  {
    id: '1',
    title: 'Mountain Oatmeal',
    description: 'Hearty oatmeal with nuts and dried fruit, perfect for cold mornings on the trail.',
    ingredients: [
      '1/2 cup quick oats',
      '1 cup water',
      '2 tbsp chopped walnuts',
      '2 tbsp dried apples, chopped',
      '1 tbsp brown sugar',
      '1/4 tsp cinnamon',
      'Pinch of salt'
    ],
    instructions: 'Bring water to a boil in a small pot. Add oats and salt, reduce heat and simmer for 2-3 minutes. Remove from heat and stir in walnuts, dried apples, brown sugar, and cinnamon. Let sit for 1 minute before serving.',
    prepTime: 5,
    cookTime: 5,
    servings: 1,
    difficulty: 'Easy',
    category: 'Breakfast',
    equipment: ['Small pot', 'Spoon'],
    tags: ['warm', 'filling', 'quick', 'healthy'],
    imageUrl: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Bowl of warm oatmeal with nuts and dried fruit',
    nutrition: {
      calories: 320,
      protein: 10,
      carbs: 45,
      fat: 12
    },
    createdAt: '2025-01-15T08:00:00Z',
    updatedAt: '2025-01-15T08:00:00Z'
  },
  {
    id: '2',
    title: 'Trail Pancakes',
    description: 'Fluffy pancakes made with just-add-water mix, perfect for a hearty breakfast.',
    ingredients: [
      '1 cup pancake mix',
      '3/4 cup water',
      '2 tbsp oil',
      '1/4 cup dried blueberries',
      'Maple syrup (optional)'
    ],
    instructions: 'Mix pancake mix with water and oil until smooth. Fold in dried blueberries. Cook on a greased griddle over medium heat for 2-3 minutes per side. Serve with maple syrup.',
    prepTime: 5,
    cookTime: 10,
    servings: 2,
    difficulty: 'Easy',
    category: 'Breakfast',
    equipment: ['Griddle or pan', 'Spatula'],
    tags: ['fluffy', 'sweet', 'portable', 'classic'],
    imageUrl: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Stack of fluffy pancakes with blueberries and syrup',
    nutrition: {
      calories: 280,
      protein: 8,
      carbs: 42,
      fat: 8
    },
    createdAt: "2025-01-15T08:00:00Z",
    updatedAt: "2025-01-15T08:00:00Z"
  },

  // LUNCH RECIPES
  {
    id: '3',
    title: 'Trail Wraps',
    description: 'Quick and portable wraps perfect for lunch on the go.',
    ingredients: [
      '2 large tortillas',
      '1/2 avocado, sliced',
      '1/4 cup hummus',
      '1/4 cup shredded carrots',
      '1/4 cup spinach leaves',
      '2 tbsp sunflower seeds',
      'Salt and pepper to taste'
    ],
    instructions: 'Spread hummus evenly on tortillas. Layer with spinach, carrots, avocado, and sunflower seeds. Season with salt and pepper. Roll tightly and wrap in foil or parchment paper for transport.',
    prepTime: 10,
    cookTime: 0,
    servings: 2,
    difficulty: 'Easy',
    category: 'Lunch',
    equipment: ['Cutting board', 'Knife'],
    tags: ['no-cook', 'portable', 'healthy', 'vegetarian'],
    imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Fresh vegetable wraps with hummus and avocado',
    nutrition: {
      calories: 320,
      protein: 12,
      carbs: 35,
      fat: 16
    },
    createdAt: "2025-01-15T08:00:00Z",
    updatedAt: "2025-01-15T08:00:00Z"
  },
  {
    id: '4',
    title: 'Trail Salad',
    description: 'Fresh, crunchy salad with nuts and dried fruit for a light lunch.',
    ingredients: [
      '2 cups mixed greens',
      '1/4 cup dried cranberries',
      '1/4 cup chopped walnuts',
      '1/4 cup feta cheese',
      '2 tbsp olive oil',
      '1 tbsp balsamic vinegar',
      'Salt and pepper to taste'
    ],
    instructions: 'Combine all ingredients in a bowl. Toss with olive oil and balsamic vinegar. Season with salt and pepper. Serve immediately.',
    prepTime: 8,
    cookTime: 0,
    servings: 1,
    difficulty: 'Easy',
    category: 'Lunch',
    equipment: ['Mixing bowl', 'Spoon'],
    tags: ['fresh', 'light', 'healthy', 'quick'],
    imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Fresh mixed green salad with nuts and dried fruit',
    nutrition: {
      calories: 380,
      protein: 12,
      carbs: 28,
      fat: 28
    },
    createdAt: "2025-01-15T08:00:00Z",
    updatedAt: "2025-01-15T08:00:00Z"
  },

  // DINNER RECIPES
  {
    id: '5',
    title: 'Campfire Chili',
    description: 'Hearty vegetarian chili that warms you up after a long day of hiking.',
    ingredients: [
      '1 can black beans, drained',
      '1 can kidney beans, drained',
      '1 can diced tomatoes',
      '1/2 onion, diced',
      '2 cloves garlic, minced',
      '1 bell pepper, diced',
      '2 tbsp chili powder',
      '1 tsp cumin',
      '1/2 tsp cayenne pepper',
      'Salt and pepper to taste',
      '1 cup vegetable broth'
    ],
    instructions: 'Heat oil in a large pot over medium heat. Add onion and bell pepper, cook until softened. Add garlic and spices, cook for 1 minute. Add beans, tomatoes, and broth. Bring to a boil, then simmer for 20 minutes. Season with salt and pepper.',
    prepTime: 15,
    cookTime: 25,
    servings: 4,
    difficulty: 'Medium',
    category: 'Dinner',
    equipment: ['Large pot', 'Cutting board', 'Knife', 'Wooden spoon'],
    tags: ['vegetarian', 'hearty', 'spicy', 'one-pot'],
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Bowl of hearty vegetarian chili with beans and vegetables',
    nutrition: {
      calories: 280,
      protein: 15,
      carbs: 45,
      fat: 4
    },
    createdAt: "2025-01-15T08:00:00Z",
    updatedAt: "2025-01-15T08:00:00Z"
  },
  {
    id: '6',
    title: 'Trail Pasta',
    description: 'Simple pasta with vegetables and herbs, perfect for a filling dinner.',
    ingredients: [
      '8 oz pasta',
      '2 tbsp olive oil',
      '1/2 onion, diced',
      '2 cloves garlic, minced',
      '1 bell pepper, sliced',
      '1/4 cup sun-dried tomatoes',
      '2 tbsp fresh basil',
      'Salt and pepper to taste',
      'Parmesan cheese (optional)'
    ],
    instructions: 'Cook pasta according to package directions. Heat oil in a pan, add onion and garlic, cook until fragrant. Add bell pepper and sun-dried tomatoes, cook for 5 minutes. Toss with pasta, basil, salt, and pepper. Top with parmesan if desired.',
    prepTime: 10,
    cookTime: 15,
    servings: 2,
    difficulty: 'Easy',
    category: 'Dinner',
    equipment: ['Large pot', 'Pan', 'Strainer'],
    tags: ['italian', 'vegetarian', 'filling', 'simple'],
    imageUrl: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Pasta with vegetables and herbs in a bowl',
    nutrition: {
      calories: 420,
      protein: 14,
      carbs: 68,
      fat: 12
    },
    createdAt: "2025-01-15T08:00:00Z",
    updatedAt: "2025-01-15T08:00:00Z"
  },

  // SNACK RECIPES
  {
    id: '7',
    title: 'Trail Mix Energy Bars',
    description: 'Perfect no-bake energy bars packed with nuts, dried fruit, and oats.',
    ingredients: [
      '1 cup rolled oats',
      '1/2 cup almonds, chopped',
      '1/2 cup dried cranberries',
      '1/4 cup sunflower seeds',
      '1/4 cup honey',
      '2 tbsp peanut butter',
      '1 tsp vanilla extract',
      'Pinch of salt'
    ],
    instructions: 'Mix all dry ingredients in a large bowl. Heat honey and peanut butter in a small saucepan until melted. Add vanilla and salt. Pour over dry ingredients and mix well. Press into a lined 8x8 pan and refrigerate for 2 hours. Cut into bars and wrap individually.',
    prepTime: 15,
    cookTime: 0,
    servings: 8,
    difficulty: 'Easy',
    category: 'Snack',
    equipment: ['Large mixing bowl', 'Small saucepan', '8x8 baking pan', 'Parchment paper'],
    tags: ['no-bake', 'energy', 'portable', 'vegan-friendly'],
    imageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Homemade energy bars with nuts and dried fruit',
    nutrition: {
      calories: 180,
      protein: 6,
      carbs: 22,
      fat: 8
    },
    createdAt: "2025-01-15T08:00:00Z",
    updatedAt: "2025-01-15T08:00:00Z"
  },
  {
    id: '8',
    title: 'Trail Mix',
    description: 'Customizable mix of nuts, dried fruit, and chocolate for sustained energy.',
    ingredients: [
      '1/2 cup almonds',
      '1/2 cup cashews',
      '1/4 cup dried cranberries',
      '1/4 cup raisins',
      '1/4 cup dark chocolate chips',
      '1/4 cup pumpkin seeds',
      '1/4 cup coconut flakes'
    ],
    instructions: 'Mix all ingredients in a large bowl. Store in an airtight container or individual bags. Perfect for snacking throughout the day.',
    prepTime: 10,
    cookTime: 0,
    servings: 8,
    difficulty: 'Easy',
    category: 'Snack',
    equipment: ['Large bowl', 'Airtight container'],
    tags: ['no-cook', 'portable', 'energy', 'customizable'],
    imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Mixed nuts, dried fruit, and chocolate trail mix',
    nutrition: {
      calories: 220,
      protein: 7,
      carbs: 18,
      fat: 15
    },
    createdAt: "2025-01-15T08:00:00Z",
    updatedAt: "2025-01-15T08:00:00Z"
  },

  // DESSERT RECIPES
  {
    id: '9',
    title: 'Campfire S\'mores',
    description: 'Classic campfire treat with a twist - perfect for dessert around the fire.',
    ingredients: [
      'Graham crackers',
      'Chocolate bars',
      'Marshmallows',
      'Optional: peanut butter',
      'Optional: banana slices'
    ],
    instructions: 'Toast marshmallows over the campfire until golden brown. Place chocolate on a graham cracker, add the toasted marshmallow, and top with another graham cracker. For extra flavor, add peanut butter or banana slices.',
    prepTime: 5,
    cookTime: 5,
    servings: 4,
    difficulty: 'Easy',
    category: 'Dessert',
    equipment: ['Roasting sticks', 'Campfire'],
    tags: ['classic', 'sweet', 'fun', 'campfire'],
    imageUrl: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Classic s\'mores with toasted marshmallows and chocolate',
    nutrition: {
      calories: 200,
      protein: 3,
      carbs: 35,
      fat: 6
    },
    createdAt: "2025-01-15T08:00:00Z",
    updatedAt: "2025-01-15T08:00:00Z"
  },
  {
    id: '10',
    title: 'Trail Cookies',
    description: 'Soft, chewy cookies perfect for a sweet treat after a long hike.',
    ingredients: [
      '1 cup flour',
      '1/2 cup brown sugar',
      '1/4 cup butter',
      '1 egg',
      '1/2 cup chocolate chips',
      '1/4 cup oats',
      '1 tsp vanilla',
      '1/2 tsp baking soda',
      'Pinch of salt'
    ],
    instructions: 'Mix dry ingredients in a bowl. Cream butter and sugar, add egg and vanilla. Combine wet and dry ingredients, fold in chocolate chips and oats. Drop spoonfuls onto a greased pan and bake at 350°F for 10-12 minutes.',
    prepTime: 15,
    cookTime: 12,
    servings: 12,
    difficulty: 'Medium',
    category: 'Dessert',
    equipment: ['Mixing bowls', 'Baking sheet', 'Oven'],
    tags: ['sweet', 'chewy', 'chocolate', 'homemade'],
    imageUrl: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Soft chocolate chip cookies with oats',
    nutrition: {
      calories: 150,
      protein: 2,
      carbs: 22,
      fat: 6
    },
    createdAt: "2025-01-15T08:00:00Z",
    updatedAt: "2025-01-15T08:00:00Z"
  },

  // DRINKS RECIPES
  {
    id: '11',
    title: 'Trail Coffee',
    description: 'Rich, strong coffee perfect for early morning starts on the trail.',
    ingredients: [
      '2 tbsp ground coffee',
      '1 cup water',
      'Optional: sugar or honey',
      'Optional: powdered milk'
    ],
    instructions: 'Bring water to a boil. Remove from heat and add coffee grounds. Let steep for 4-5 minutes. Pour through a fine mesh strainer or coffee filter. Add sweetener and milk if desired.',
    prepTime: 2,
    cookTime: 8,
    servings: 1,
    difficulty: 'Easy',
    category: 'Drinks',
    equipment: ['Small pot', 'Fine mesh strainer or coffee filter'],
    tags: ['caffeine', 'morning', 'simple', 'warm'],
    imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Hot coffee in a mug with steam rising',
    nutrition: {
      calories: 5,
      protein: 0,
      carbs: 1,
      fat: 0
    },
    createdAt: "2025-01-15T08:00:00Z",
    updatedAt: "2025-01-15T08:00:00Z"
  },
  {
    id: '12',
    title: 'Trail Tea',
    description: 'Refreshing herbal tea blend perfect for hydration and relaxation.',
    ingredients: [
      '2 tea bags (herbal blend)',
      '2 cups water',
      '1 tbsp honey',
      '1/2 lemon, juiced',
      'Fresh mint leaves (optional)'
    ],
    instructions: 'Bring water to a boil. Remove from heat and add tea bags, steep for 5 minutes. Remove tea bags and stir in honey and lemon juice. Add mint leaves if desired. Serve hot or cold.',
    prepTime: 3,
    cookTime: 8,
    servings: 2,
    difficulty: 'Easy',
    category: 'Drinks',
    equipment: ['Small pot', 'Tea strainer'],
    tags: ['herbal', 'refreshing', 'hydrating', 'relaxing'],
    imageUrl: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Herbal tea with lemon and mint in a cup',
    nutrition: {
      calories: 25,
      protein: 0,
      carbs: 7,
      fat: 0
    },
    createdAt: "2025-01-15T08:00:00Z",
    updatedAt: "2025-01-15T08:00:00Z"
  }
]

export const getMockRecipes = (): Recipe[] => {
  return mockRecipes
}

export const getMockRecipe = (id: string): Recipe | undefined => {
  return mockRecipes.find(recipe => recipe.id === id)
}
