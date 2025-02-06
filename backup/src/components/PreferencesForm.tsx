import React, { useState } from 'react';
import { Clock, Heart, AlertCircle, User, Utensils, Youtube, Globe2 } from 'lucide-react';

interface PreferencesFormProps {
  initialTargets: {
    protein: number;
    calories: number;
  };
  onTargetsChange: (targets: { protein: number; calories: number }) => void;
}

const PreferencesForm: React.FC<PreferencesFormProps> = ({ initialTargets, onTargetsChange }) => {
  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const [targets, setTargets] = useState(initialTargets);
  const [healthFocus, setHealthFocus] = useState({
    primary: '',
    secondary: ''
  });
  const [dietaryRestrictions, setDietaryRestrictions] = useState<string[]>([]);
  const [about, setAbout] = useState('');
  const [favoriteFoods, setFavoriteFoods] = useState('');
  const [sampleMealPlan, setSampleMealPlan] = useState('');
  const [socialMediaFavorites, setSocialMediaFavorites] = useState('');
  const [familiarityLevel, setFamiliarityLevel] = useState(50);
  const [culturalBackground, setCulturalBackground] = useState<string[]>([]);
  const [timeAvailability, setTimeAvailability] = useState(
    weekdays.reduce((acc, day) => ({
      ...acc,
      [day]: { breakfast: '20', lunch: '25', dinner: '45' }
    }), {})
  );

  const cuisineTypes = [
    'Indian',
    'Mediterranean',
    'Mexican',
    'Italian',
    'Chinese',
    'Japanese',
    'Thai',
    'Korean',
    'Middle Eastern',
    'Greek',
    'Vietnamese',
    'French',
    'Spanish',
    'American',
    'Brazilian'
  ];

  const handleTargetChange = (key: 'protein' | 'calories', value: number) => {
    const newTargets = { ...targets, [key]: value };
    setTargets(newTargets);
    onTargetsChange(newTargets);
  };

  const handleHealthFocusChange = (key: 'primary' | 'secondary', value: string) => {
    setHealthFocus(prev => ({ ...prev, [key]: value }));
  };

  const handleDietaryRestrictionToggle = (restriction: string) => {
    setDietaryRestrictions(prev => 
      prev.includes(restriction)
        ? prev.filter(r => r !== restriction)
        : [...prev, restriction]
    );
  };

  const handleCulturalBackgroundToggle = (cuisine: string) => {
    setCulturalBackground(prev =>
      prev.includes(cuisine)
        ? prev.filter(c => c !== cuisine)
        : [...prev, cuisine]
    );
  };

  const handleTimeChange = (day: string, meal: string, value: string) => {
    setTimeAvailability(prev => ({
      ...prev,
      [day]: { ...prev[day], [meal]: value }
    }));
  };

  const getFamiliarityDescription = (value: number) => {
    if (value <= 25) return "Mostly familiar favorites";
    if (value <= 50) return "Balanced mix";
    if (value <= 75) return "More new recipes";
    return "Adventurous discovery";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = {
      targets,
      healthFocus,
      dietaryRestrictions,
      timeAvailability,
      about,
      favoriteFoods,
      sampleMealPlan,
      socialMediaFavorites,
      familiarityLevel,
      culturalBackground
    };
    console.log('Form submitted:', formData);
    alert('Weekly plan generated! Check the Meal Plan tab to see your personalized schedule.');
  };

  const proteinOptions = Array.from({ length: 35 }, (_, i) => (i + 6) * 5);
  const calorieOptions = Array.from({ length: 31 }, (_, i) => (i + 10) * 100);

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Personalize Your Weekly Plan</h2>
      
      <div className="space-y-8">
        <section>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Nutrition Goals</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Daily Protein Target (g)
              </label>
              <div className="relative">
                <Utensils className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                <select
                  value={targets.protein}
                  onChange={(e) => handleTargetChange('protein', parseInt(e.target.value))}
                  className="form-select pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                >
                  {proteinOptions.map((value) => (
                    <option key={value} value={value}>{value}g</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Daily Calorie Target
              </label>
              <div className="relative">
                <AlertCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                <select
                  value={targets.calories}
                  onChange={(e) => handleTargetChange('calories', parseInt(e.target.value))}
                  className="form-select pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                >
                  {calorieOptions.map((value) => (
                    <option key={value} value={value}>{value} cal</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Dietary Restrictions</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              'Vegetarian',
              'Vegan',
              'No Eggs',
              'Gluten Free',
              'Dairy Free',
              'Low Carb',
              'No Nuts',
              'No Soy',
              'Low FODMAP'
            ].map((restriction) => (
              <label key={restriction} className="relative flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={dietaryRestrictions.includes(restriction)}
                  onChange={() => handleDietaryRestrictionToggle(restriction)}
                  className="form-checkbox h-4 w-4"
                />
                <span className="text-sm text-gray-700">{restriction}</span>
              </label>
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Health Condition</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Primary Health Focus
              </label>
              <div className="relative">
                <Heart className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                <select
                  value={healthFocus.primary}
                  onChange={(e) => handleHealthFocusChange('primary', e.target.value)}
                  className="form-select pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                >
                  <option value="">None</option>
                  <option value="fatty-liver">Fatty Liver</option>
                  <option value="heart-health">Heart Health</option>
                  <option value="diabetes">Diabetes Management</option>
                  <option value="weight-loss">Weight Loss</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Secondary Health Focus (optional)
              </label>
              <div className="relative">
                <Heart className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                <select
                  value={healthFocus.secondary}
                  onChange={(e) => handleHealthFocusChange('secondary', e.target.value)}
                  className="form-select pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                >
                  <option value="">None</option>
                  <option value="fatty-liver">Fatty Liver</option>
                  <option value="heart-health">Heart Health</option>
                  <option value="diabetes">Diabetes Management</option>
                  <option value="weight-loss">Weight Loss</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Weekly Time Availability</h3>
          <div className="grid grid-cols-1 gap-6">
            {weekdays.map((day) => (
              <div key={day} className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  {day}
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                    <select 
                      value={timeAvailability[day].breakfast}
                      onChange={(e) => handleTimeChange(day, 'breakfast', e.target.value)}
                      className="form-select pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                    >
                      <option value="10">10 minutes</option>
                      <option value="20">20 minutes</option>
                      <option value="30">30 minutes</option>
                      <option value="45">45 minutes</option>
                    </select>
                  </div>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                    <select 
                      value={timeAvailability[day].lunch}
                      onChange={(e) => handleTimeChange(day, 'lunch', e.target.value)}
                      className="form-select pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                    >
                      <option value="15">15 minutes</option>
                      <option value="25">25 minutes</option>
                      <option value="35">35 minutes</option>
                      <option value="45">45 minutes</option>
                    </select>
                  </div>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                    <select 
                      value={timeAvailability[day].dinner}
                      onChange={(e) => handleTimeChange(day, 'dinner', e.target.value)}
                      className="form-select pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                    >
                      <option value="30">30 minutes</option>
                      <option value="45">45 minutes</option>
                      <option value="60">60 minutes</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Meal Preferences</h3>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Familiarity vs. Discovery
                <span className="block text-sm font-normal text-gray-500 mt-1">
                  {getFamiliarityDescription(familiarityLevel)}
                </span>
              </label>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500">Familiar</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={familiarityLevel}
                  onChange={(e) => setFamiliarityLevel(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-sm text-gray-500">Adventurous</span>
              </div>
            </div>

            <div>
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-4">
                <Globe2 className="h-5 w-5 text-primary-500" />
                <span>Cultural Background & Preferences</span>
                <span className="text-sm font-normal text-gray-500">(Select all that apply)</span>
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {cuisineTypes.map((cuisine) => (
                  <label
                    key={cuisine}
                    className={`relative flex items-center justify-center px-4 py-2 rounded-lg cursor-pointer text-sm transition-colors ${
                      culturalBackground.includes(cuisine)
                        ? 'bg-primary-50 text-primary-700 ring-2 ring-primary-500'
                        : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="absolute opacity-0"
                      checked={culturalBackground.includes(cuisine)}
                      onChange={() => handleCulturalBackgroundToggle(cuisine)}
                    />
                    {cuisine}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Your Profile</h3>
          <div className="space-y-6">
            <div>
              <label htmlFor="about" className="block text-sm font-medium text-gray-700 mb-2">
                About You
              </label>
              <textarea
                id="about"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                rows={4}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500 focus:ring-opacity-50"
                placeholder="Tell us about yourself, your fitness goals, favorite cuisines, and any specific dietary preferences..."
              />
            </div>
            <div>
              <label htmlFor="favoriteFoods" className="block text-sm font-medium text-gray-700 mb-2">
                Favorite Foods
              </label>
              <textarea
                id="favoriteFoods"
                value={favoriteFoods}
                onChange={(e) => setFavoriteFoods(e.target.value)}
                rows={2}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500 focus:ring-opacity-50"
                placeholder="List your favorite healthy foods and ingredients..."
              />
            </div>
            <div>
              <label htmlFor="sampleMealPlan" className="block text-sm font-medium text-gray-700 mb-2">
                Sample Week Plan
              </label>
              <textarea
                id="sampleMealPlan"
                value={sampleMealPlan}
                onChange={(e) => setSampleMealPlan(e.target.value)}
                rows={6}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500 focus:ring-opacity-50"
                placeholder="Share a sample of your typical weekly meal plan to help us understand your preferences better...
Example:
Monday: Oatmeal (B), Quinoa Bowl (L), Lentil Curry (D)
Tuesday: Smoothie (B), Salad (L), Stir-fry (D)
..."
              />
            </div>
            <div>
              <label htmlFor="socialMediaFavorites" className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center space-x-2">
                  <Youtube className="h-5 w-5 text-red-500" />
                  <span>Favorite Food Content</span>
                </div>
              </label>
              <textarea
                id="socialMediaFavorites"
                value={socialMediaFavorites}
                onChange={(e) => setSocialMediaFavorites(e.target.value)}
                rows={3}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500 focus:ring-opacity-50"
                placeholder="Share your favorite YouTube channels, Instagram accounts, or food blogs that inspire your cooking...
Example:
@healthyeating (Instagram)
Cooking with Plants (YouTube)
www.veggierecipes.com"
              />
            </div>
          </div>
        </section>

        <div className="mt-8">
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
          >
            Generate Weekly Plan
          </button>
        </div>
      </div>
    </form>
  );
};

export default PreferencesForm;