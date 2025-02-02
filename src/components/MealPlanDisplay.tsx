import React, { useState } from 'react';
import { Clock, Utensils, AlertCircle, ChevronLeft, ChevronRight, Youtube, BookOpen, Edit2, Plus } from 'lucide-react';

interface DailyTargets {
  protein: number;
  calories: number;
}

interface MealPlanDisplayProps {
  dailyTargets: DailyTargets;
}

const MealPlanDisplay: React.FC<MealPlanDisplayProps> = ({ dailyTargets }) => {
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [editingMeal, setEditingMeal] = useState<string | null>(null);
  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  const weeklyMeals = {
    Monday: [
      {
        type: 'Breakfast',
        time: '7:30 AM',
        recipe: 'Protein-Packed Overnight Oats',
        prepTime: '20 mins',
        image: 'https://images.unsplash.com/photo-1517673132405-a56a62b18caf?auto=format&fit=crop&w=600',
        calories: 320,
        protein: 12,
        recipeUrl: 'https://www.example.com/recipe',
        videoUrl: 'https://youtube.com/watch?v=example'
      },
      {
        type: 'Lunch',
        time: '12:30 PM',
        recipe: 'Mediterranean Quinoa Bowl',
        prepTime: '25 mins',
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600',
        calories: 450,
        protein: 18,
        recipeUrl: 'https://www.example.com/recipe',
        videoUrl: 'https://youtube.com/watch?v=example'
      },
      {
        type: 'Dinner',
        time: '6:30 PM',
        recipe: 'Lentil and Vegetable Curry',
        prepTime: '45 mins',
        image: 'https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?auto=format&fit=crop&w=600',
        calories: 380,
        protein: 15,
        recipeUrl: 'https://www.example.com/recipe',
        videoUrl: 'https://youtube.com/watch?v=example'
      }
    ],
    // Add similar meal plans for other days
  };

  interface MealEditFormProps {
    meal: {
      type: string;
      time: string;
      recipe: string;
      prepTime: string;
      calories: number;
      protein: number;
      recipeUrl: string;
      videoUrl: string;
    };
    onSave: () => void;
    onCancel: () => void;
  }

  const MealEditForm: React.FC<MealEditFormProps> = ({ meal, onSave, onCancel }) => (
    <div className="p-6 space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Recipe Name</label>
        <input
          type="text"
          defaultValue={meal.recipe}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
          <input
            type="time"
            defaultValue={meal.time}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Prep Time</label>
          <input
            type="text"
            defaultValue={meal.prepTime}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Calories</label>
          <input
            type="number"
            defaultValue={meal.calories}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Protein (g)</label>
          <input
            type="number"
            defaultValue={meal.protein}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Recipe URL</label>
          <input
            type="url"
            defaultValue={meal.recipeUrl}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Video URL</label>
          <input
            type="url"
            defaultValue={meal.videoUrl}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
          />
        </div>
      </div>
      <div className="flex justify-end space-x-3 pt-4">
        <button
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          onClick={onSave}
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700"
        >
          Save Changes
        </button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold gradient-text">Weekly Meal Plan</h2>
        <div className="flex space-x-4">
          <div className="text-sm px-4 py-2 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm">
            <span className="text-gray-500">Daily Calories Target:</span>
            <span className="ml-1 font-medium text-primary-600">{dailyTargets.calories}</span>
          </div>
          <div className="text-sm px-4 py-2 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm">
            <span className="text-gray-500">Protein Target:</span>
            <span className="ml-1 font-medium text-primary-600">{dailyTargets.protein}g</span>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center space-x-4 bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-sm">
        <button className="p-2 hover:bg-primary-50 rounded-full transition-colors">
          <ChevronLeft className="h-5 w-5 text-primary-600" />
        </button>
        <div className="flex-1 flex justify-between">
          {weekdays.map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedDay === day
                  ? 'bg-primary-50 text-primary-600'
                  : 'text-gray-600 hover:bg-primary-50 hover:text-primary-600'
              }`}
            >
              {day}
            </button>
          ))}
        </div>
        <button className="p-2 hover:bg-primary-50 rounded-full transition-colors">
          <ChevronRight className="h-5 w-5 text-primary-600" />
        </button>
      </div>

      <div className="grid gap-6">
        {weeklyMeals[selectedDay]?.map((meal) => (
          <div key={meal.type} className="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            {editingMeal === meal.type ? (
              <MealEditForm
                meal={meal}
                onSave={() => setEditingMeal(null)}
                onCancel={() => setEditingMeal(null)}
              />
            ) : (
              <div className="flex">
                <div className="w-1/3">
                  <img
                    src={meal.image}
                    alt={meal.recipe}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="w-2/3 p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{meal.type}</h3>
                      <p className="text-sm text-gray-500">{meal.time}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setEditingMeal(meal.type)}
                        className="p-1 hover:bg-primary-50 rounded-full transition-colors"
                      >
                        <Edit2 className="h-4 w-4 text-primary-600" />
                      </button>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary-50 text-secondary-600">
                        Healthy Choice
                      </span>
                    </div>
                  </div>
                  
                  <h4 className="mt-4 text-xl font-medium text-gray-900">{meal.recipe}</h4>
                  
                  <div className="mt-4 grid grid-cols-3 gap-4">
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-accent-500" />
                      <span className="ml-2 text-sm text-gray-600">{meal.prepTime}</span>
                    </div>
                    <div className="flex items-center">
                      <Utensils className="h-5 w-5 text-orange-500" />
                      <span className="ml-2 text-sm text-gray-600">{meal.calories} cal</span>
                    </div>
                    <div className="flex items-center">
                      <AlertCircle className="h-5 w-5 text-secondary-500" />
                      <span className="ml-2 text-sm text-gray-600">{meal.protein}g protein</span>
                    </div>
                  </div>

                  <div className="mt-4 flex space-x-4">
                    <a
                      href={meal.recipeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 border border-primary-600 rounded-md shadow-sm text-sm font-medium text-primary-600 hover:bg-primary-50 transition-colors"
                    >
                      <BookOpen className="h-4 w-4 mr-2" />
                      View Recipe
                    </a>
                    <a
                      href={meal.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 border border-orange-500 rounded-md shadow-sm text-sm font-medium text-orange-500 hover:bg-orange-50 transition-colors"
                    >
                      <Youtube className="h-4 w-4 mr-2" />
                      Watch Video
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
        <button className="flex items-center justify-center p-4 border-2 border-dashed border-primary-300 rounded-lg text-primary-600 hover:border-primary-500 hover:bg-primary-50 transition-colors">
          <Plus className="h-5 w-5 mr-2" />
          Add Custom Meal
        </button>
      </div>
    </div>
  );
};

export default MealPlanDisplay;