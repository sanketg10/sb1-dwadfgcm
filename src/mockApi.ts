import { Recipe } from './types';

const mockRecipes: Recipe[] = [
  {
    id: 1,
    name: 'Golden Milk Oatmeal',
    image: 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&w=600',
    prep_time: '15 mins',
    servings: 2,
    difficulty: 'Easy',
    ayurvedic: 'Vata-Pitta balancing',
    tags: ['Breakfast', 'High-Protein', 'Sattvic'],
    ingredients: ['1 cup oats', '2 cups plant milk', '1 tsp turmeric', '1/2 tsp cinnamon'],
    instructions: ['Heat milk', 'Add oats and spices', 'Cook until creamy'],
    calories: 320,
    protein: 12,
    carbs: 45,
    fat: 8
  }
];

export const mockApi = {
  getRecipes: async () => {
    return mockRecipes;
  },
  
  addRecipe: async (recipe: Omit<Recipe, 'id'>) => {
    const newRecipe = {
      ...recipe,
      id: mockRecipes.length + 1
    };
    mockRecipes.push(newRecipe);
    return newRecipe;
  }
};