import React, { useState, useEffect } from 'react';
import { Clock, Users, ChefHat, Plus, X } from 'lucide-react';
import { Recipe } from '../types';
import { mockApi } from '../mockApi';

function RecipeList() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newRecipe, setNewRecipe] = useState<Partial<Recipe>>({
    tags: [],
    ingredients: [],
    instructions: []
  });

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const data = await mockApi.getRecipes();
      setRecipes(data);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  const handleAddRecipe = async () => {
    if (!newRecipe.name) return;

    try {
      const recipeData = {
        name: newRecipe.name,
        image: newRecipe.image || 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&w=600',
        prep_time: newRecipe.prep_time || '0 mins',
        servings: newRecipe.servings || 1,
        difficulty: newRecipe.difficulty || 'Easy',
        ayurvedic: newRecipe.ayurvedic || 'Balanced',
        tags: newRecipe.tags || [],
        ingredients: newRecipe.ingredients || [],
        instructions: newRecipe.instructions || [],
        calories: newRecipe.calories || 0,
        protein: newRecipe.protein || 0,
        carbs: newRecipe.carbs || 0,
        fat: newRecipe.fat || 0
      };

      const response = await mockApi.addRecipe(recipeData);
      setRecipes([...recipes, response]);
      setNewRecipe({ tags: [], ingredients: [], instructions: [] });
      setShowAddForm(false);
    } catch (error) {
      console.error('Error adding recipe:', error);
    }
  };

  const AddRecipeForm = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-gray-900">Add New Recipe</h3>
            <button onClick={() => setShowAddForm(false)} className="text-gray-400 hover:text-gray-500">
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Recipe Name</label>
              <input
                type="text"
                value={newRecipe.name || ''}
                onChange={(e) => setNewRecipe({ ...newRecipe, name: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Image URL</label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <input
                  type="text"
                  value={newRecipe.image || ''}
                  onChange={(e) => setNewRecipe({ ...newRecipe, image: e.target.value })}
                  className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Prep Time</label>
                <input
                  type="text"
                  value={newRecipe.prep_time || ''}
                  onChange={(e) => setNewRecipe({ ...newRecipe, prep_time: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  placeholder="30 mins"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Servings</label>
                <input
                  type="number"
                  value={newRecipe.servings || ''}
                  onChange={(e) => setNewRecipe({ ...newRecipe, servings: parseInt(e.target.value) })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Difficulty</label>
                <select
                  value={newRecipe.difficulty || 'Easy'}
                  onChange={(e) => setNewRecipe({ ...newRecipe, difficulty: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                >
                  <option>Easy</option>
                  <option>Medium</option>
                  <option>Hard</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Ayurvedic Type</label>
                <select
                  value={newRecipe.ayurvedic || 'Balanced'}
                  onChange={(e) => setNewRecipe({ ...newRecipe, ayurvedic: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                >
                  <option>Balanced</option>
                  <option>Vata</option>
                  <option>Pitta</option>
                  <option>Kapha</option>
                  <option>Vata-Pitta</option>
                  <option>Pitta-Kapha</option>
                  <option>Vata-Kapha</option>
                  <option>Tridoshic</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Tags</label>
              <input
                type="text"
                placeholder="Add tags separated by commas"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    const input = e.target as HTMLInputElement;
                    const newTags = input.value.split(',').map(tag => tag.trim());
                    setNewRecipe({ ...newRecipe, tags: [...(newRecipe.tags || []), ...newTags] });
                    input.value = '';
                  }
                }}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              />
              <div className="mt-2 flex flex-wrap gap-2">
                {newRecipe.tags?.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => {
                        const newTags = newRecipe.tags?.filter((_, i) => i !== index);
                        setNewRecipe({ ...newRecipe, tags: newTags });
                      }}
                      className="ml-1 inline-flex items-center p-0.5 rounded-full text-primary-400 hover:bg-primary-200 hover:text-primary-500 focus:outline-none"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Calories</label>
                <input
                  type="number"
                  value={newRecipe.calories || ''}
                  onChange={(e) => setNewRecipe({ ...newRecipe, calories: parseInt(e.target.value) })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Protein (g)</label>
                <input
                  type="number"
                  value={newRecipe.protein || ''}
                  onChange={(e) => setNewRecipe({ ...newRecipe, protein: parseInt(e.target.value) })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Ingredients</label>
              <textarea
                value={newRecipe.ingredients?.join('\n')}
                onChange={(e) => setNewRecipe({ ...newRecipe, ingredients: e.target.value.split('\n') })}
                placeholder="Add each ingredient on a new line"
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Instructions</label>
              <textarea
                value={newRecipe.instructions?.join('\n')}
                onChange={(e) => setNewRecipe({ ...newRecipe, instructions: e.target.value.split('\n') })}
                placeholder="Add each step on a new line"
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleAddRecipe}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
            >
              Add Recipe
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold gradient-text">Recipe Collection</h2>
        <div className="flex space-x-4">
          <select className="rounded-md border-gray-300 text-sm focus:ring-primary-500 focus:border-primary-500">
            <option>All Meals</option>
            <option>Breakfast</option>
            <option>Lunch</option>
            <option>Dinner</option>
            <option>Snacks</option>
          </select>
          <select className="rounded-md border-gray-300 text-sm focus:ring-primary-500 focus:border-primary-500">
            <option>All Doshas</option>
            <option>Vata</option>
            <option>Pitta</option>
            <option>Kapha</option>
          </select>
          <button
            onClick={() => setShowAddForm(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Recipe
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            <div className="relative h-48">
              <img
                src={recipe.image}
                alt={recipe.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary-50 text-secondary-600">
                  {recipe.ayurvedic}
                </span>
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="text-lg font-medium text-gray-900">{recipe.name}</h3>
              
              <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1 text-accent-500" />
                  {recipe.prep_time}
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1 text-orange-500" />
                  {recipe.servings} servings
                </div>
                <div className="flex items-center">
                  <ChefHat className="h-4 w-4 mr-1 text-primary-500" />
                  {recipe.difficulty}
                </div>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {recipe.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary-50 text-primary-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <button
                onClick={() => {/* TODO: Add to meal plan */}}
                className="mt-4 w-full inline-flex justify-center items-center px-4 py-2 border border-primary-600 rounded-md shadow-sm text-sm font-medium text-primary-600 hover:bg-primary-50 transition-colors"
              >
                Add to Meal Plan
              </button>
            </div>
          </div>
        ))}
      </div>

      {showAddForm && <AddRecipeForm />}
    </div>
  );
}

export default RecipeList;