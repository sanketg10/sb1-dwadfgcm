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
}