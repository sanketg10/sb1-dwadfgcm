export interface UserPreferences {
  targets: {
    protein: number;
    calories: number;
  };
  healthFocus: {
    primary: string;
    secondary: string;
  };
  dietaryRestrictions: string[];
  timeAvailability: {
    [key: string]: {
      breakfast: string;
      lunch: string;
      dinner: string;
    };
  };
  about: string;
  favoriteFoods: string;
  sampleMealPlan: string;
  socialMediaFavorites: string;
  familiarityLevel: number;
  culturalBackground: string[];
}

export interface ShoppingListItem {
  id: number;
  name: string;
  category: string;
  quantity: string;
  checked: boolean;
  user_id: string;
}

export interface MealPlan {
  id: number;
  user_id: string;
  week_start: string;
  meals: {
    [key: string]: {
      breakfast: Recipe;
      lunch: Recipe;
      dinner: Recipe;
    };
  };
}

export interface Recipe {
  id: number;
  name: string;
  image: string;
  prep_time: string;
  servings: number;
  difficulty: string;
  ayurvedic: string;
  tags: string[];
  ingredients: string[];
  instructions: string[];
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  created_at: string;
}