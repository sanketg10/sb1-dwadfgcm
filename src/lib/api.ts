import axios from 'axios';
import type { Recipe, UserPreferences, ShoppingListItem, MealPlan } from '../types/api';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor to handle 401 errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
    }
    return Promise.reject(error);
  }
);

export const recipesApi = {
  getAll: () => api.get<Recipe[]>('/recipes/').then(res => res.data),
  getById: (id: number) => api.get<Recipe>(`/recipes/${id}`).then(res => res.data),
  create: (recipe: Omit<Recipe, 'id' | 'created_at'>) => 
    api.post<Recipe>('/recipes/', recipe).then(res => res.data),
  update: (id: number, recipe: Partial<Recipe>) => 
    api.put<Recipe>(`/recipes/${id}`, recipe).then(res => res.data),
  delete: (id: number) => api.delete(`/recipes/${id}`),
};

export const preferencesApi = {
  get: (userId: string) => 
    api.get<UserPreferences>(`/preferences/${userId}`).then(res => res.data),
  update: (userId: string, preferences: UserPreferences) => 
    api.put<UserPreferences>(`/preferences/${userId}`, preferences).then(res => res.data),
};

export const mealPlanApi = {
  generate: (userId: string) => 
    api.post<MealPlan>('/meal-plan/generate', { user_id: userId }).then(res => res.data),
  get: (userId: string) => 
    api.get<MealPlan>(`/meal-plan/${userId}`).then(res => res.data),
  update: (userId: string, mealPlan: Partial<MealPlan>) => 
    api.put<MealPlan>(`/meal-plan/${userId}`, mealPlan).then(res => res.data),
};

export const shoppingListApi = {
  getAll: (userId: string) => 
    api.get<ShoppingListItem[]>(`/shopping-list/${userId}`).then(res => res.data),
  create: (userId: string, item: Omit<ShoppingListItem, 'id' | 'user_id'>) => 
    api.post<ShoppingListItem>('/shopping-list/', { ...item, user_id: userId }).then(res => res.data),
  update: (id: number, item: Partial<ShoppingListItem>) => 
    api.put<ShoppingListItem>(`/shopping-list/${id}`, item).then(res => res.data),
  delete: (id: number) => api.delete(`/shopping-list/${id}`),
  clear: (userId: string) => api.delete(`/shopping-list/${userId}/clear`),
};