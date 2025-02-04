import React, { useState, useEffect } from 'react';
import { Clock, Utensils, AlertCircle, ChevronLeft, ChevronRight, Youtube, BookOpen, Edit2, Plus } from 'lucide-react';

interface DailyTargets {
  protein: number;
  calories: number;
}

interface MealPlanDisplayProps {
  dailyTargets: DailyTargets;
}

const MealPlanDisplay: React.FC<MealPlanDisplayProps> = ({ dailyTargets }) => {
  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const [selectedDay, setSelectedDay] = useState(weekdays[new Date().getDay()]);
  const [editingMeal, setEditingMeal] = useState<string | null>(null);

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
    Tuesday: [
      {
        type: 'Breakfast',
        time: '7:30 AM',
        recipe: 'Green Smoothie Bowl',
        prepTime: '15 mins',
        image: 'https://images.unsplash.com/photo-1490323914169-0e5a0998e9d5?auto=format&fit=crop&w=600',
        calories: 280,
        protein: 14,
        recipeUrl: 'https://www.example.com/recipe',
        videoUrl: 'https://youtube.com/watch?v=example'
      },
      {
        type: 'Lunch',
        time: '12:30 PM',
        recipe: 'Buddha Bowl with Tofu',
        prepTime: '30 mins',
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600',
        calories: 420,
        protein: 22,
        recipeUrl: 'https://www.example.com/recipe',
        videoUrl: 'https://youtube.com/watch?v=example'
      },
      {
        type: 'Dinner',
        time: '6:30 PM',
        recipe: 'Grilled Salmon with Quinoa',
        prepTime: '35 mins',
        image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=600',
        calories: 460,
        protein: 32,
        recipeUrl: 'https://www.example.com/recipe',
        videoUrl: 'https://youtube.com/watch?v=example'
      }
    ],
    Wednesday: [
      {
        type: 'Breakfast',
        time: '7:30 AM',
        recipe: 'Avocado Toast with Eggs',
        prepTime: '20 mins',
        image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600',
        calories: 350,
        protein: 16,
        recipeUrl: 'https://www.example.com/recipe',
        videoUrl: 'https://youtube.com/watch?v=example'
      },
      {
        type: 'Lunch',
        time: '12:30 PM',
        recipe: 'Chickpea Salad Wrap',
        prepTime: '20 mins',
        image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600',
        calories: 380,
        protein: 15,
        recipeUrl: 'https://www.example.com/recipe',
        videoUrl: 'https://youtube.com/watch?v=example'
      },
      {
        type: 'Dinner',
        time: '6:30 PM',
        recipe: 'Vegetable Stir-Fry',
        prepTime: '30 mins',
        image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=600',
        calories: 320,
        protein: 18,
        recipeUrl: 'https://www.example.com/recipe',
        videoUrl: 'https://youtube.com/watch?v=example'
      }
    ],
    Thursday: [
      {
        type: 'Breakfast',
        time: '7:30 AM',
        recipe: 'Chia Seed Pudding',
        prepTime: '10 mins',
        image: 'https://images.unsplash.com/photo-1490474504059-bf2db5ab2348?auto=format&fit=crop&w=600',
        calories: 290,
        protein: 12,
        recipeUrl: 'https://www.example.com/recipe',
        videoUrl: 'https://youtube.com/watch?v=example'
      },
      {
        type: 'Lunch',
        time: '12:30 PM',
        recipe: 'Lentil Soup',
        prepTime: '40 mins',
        image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=600',
        calories: 340,
        protein: 16,
        recipeUrl: 'https://www.example.com/recipe',
        videoUrl: 'https://youtube.com/watch?v=example'
      },
      {
        type: 'Dinner',
        time: '6:30 PM',
        recipe: 'Black Bean Burrito Bowl',
        prepTime: '35 mins',
        image: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=600',
        calories: 420,
        protein: 22,
        recipeUrl: 'https://www.example.com/recipe',
        videoUrl: 'https://youtube.com/watch?v=example'
      }
    ],
    Friday: [
      {
        type: 'Breakfast',
        time: '7:30 AM',
        recipe: 'Banana Oatmeal Pancakes',
        prepTime: '25 mins',
        image: 'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?auto=format&fit=crop&w=600',
        calories: 380,
        protein: 14,
        recipeUrl: 'https://www.example.com/recipe',
        videoUrl: 'https://youtube.com/watch?v=example'
      },
      {
        type: 'Lunch',
        time: '12:30 PM',
        recipe: 'Greek Salad with Grilled Chicken',
        prepTime: '30 mins',
        image: 'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?auto=format&fit=crop&w=600',
        calories: 420,
        protein: 28,
        recipeUrl: 'https://www.example.com/recipe',
        videoUrl: 'https://youtube.com/watch?v=example'
      },
      {
        type: 'Dinner',
        time: '6:30 PM',
        recipe: 'Baked Sweet Potato with Black Beans',
        prepTime: '50 mins',
        image: 'https://images.unsplash.com/photo-1502004960551-7de5ce10c289?auto=format&fit=crop&w=600',
        calories: 380,
        protein: 16,
        recipeUrl: 'https://www.example.com/recipe',
        videoUrl: 'https://youtube.com/watch?v=example'
      }
    ],
    Saturday: [
      {
        type: 'Breakfast',
        time: '8:30 AM',
        recipe: 'Veggie Breakfast Burrito',
        prepTime: '25 mins',
        image: 'https://images.unsplash.com/photo-1588556008426-af415581d44b?auto=format&fit=crop&w=600',
        calories: 420,
        protein: 18,
        recipeUrl: 'https://www.example.com/recipe',
        videoUrl: 'https://youtube.com/watch?v=example'
      },
      {
        type: 'Lunch',
        time: '1:00 PM',
        recipe: 'Poke Bowl',
        prepTime: '20 mins',
        image: 'https://images.unsplash.com/photo-1546069901-d5bfd2cbfb1f?auto=format&fit=crop&w=600',
        calories: 450,
        protein: 26,
        recipeUrl: 'https://www.example.com/recipe',
        videoUrl: 'https://youtube.com/watch?v=example'
      },
      {
        type: 'Dinner',
        time: '7:00 PM',
        recipe: 'Mushroom and Spinach Risotto',
        prepTime: '45 mins',
        image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&w=600',
        calories: 460,
        protein: 14,
        recipeUrl: 'https://www.example.com/recipe',
        videoUrl: 'https://youtube.com/watch?v=example'
      }
    ],
    Sunday: [
      {
        type: 'Breakfast',
        time: '9:00 AM',
        recipe: 'Acai Bowl',
        prepTime: '15 mins',
        image: 'https://images.unsplash.com/photo-1490885578174-acda8905c2c6?auto=format&fit=crop&w=600',
        calories: 340,
        protein: 12,
        recipeUrl: 'https://www.example.com/recipe',
        videoUrl: 'https://youtube.com/watch?v=example'
      },
      {
        type: 'Lunch',
        time: '1:30 PM',
        recipe: 'Quinoa Stuffed Bell Peppers',
        prepTime: '45 mins',
        image: 'https://images.unsplash.com/photo-1458642849426-cfb724f15ef7?auto=format&fit=crop&w=600',
        calories: 380,
        protein: 16,
        recipeUrl: 'https://www.example.com/recipe',
        videoUrl: 'https://youtube.com/watch?v=example'
      },
      {
        type: 'Dinner',
        time: '7:00 PM',
        recipe: 'Cauliflower Mac and Cheese',
        prepTime: '40 mins',
        image: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=600',
        calories: 420,
        protein: 18,
        recipeUrl: 'https://www.example.com/recipe',
        videoUrl: 'https://youtube.com/watch?v=example'
      }
    ]
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

  const handlePreviousDay = () => {
    const currentIndex = weekdays.indexOf(selectedDay);
    const previousIndex = currentIndex === 0 ? weekdays.length - 1 : currentIndex - 1;
    setSelectedDay(weekdays[previousIndex]);
  };

  const handleNextDay = () => {
    const currentIndex = weekdays.indexOf(selectedDay);
    const nextIndex = currentIndex === weekdays.length - 1 ? 0 : currentIndex + 1;
    setSelectedDay(weekdays[nextIndex]);
  };

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
        <button 
          onClick={handlePreviousDay}
          className="p-2 hover:bg-primary-50 rounded-full transition-colors"
        >
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
        <button 
          onClick={handleNextDay}
          className="p-2 hover:bg-primary-50 rounded-full transition-colors"
        >
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