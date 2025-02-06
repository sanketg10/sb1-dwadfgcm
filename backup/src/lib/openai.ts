import axios from 'axios';
import { UserPreferences } from '../types/api';

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

export const generateMealPlan = async (preferences: UserPreferences) => {
  const prompt = buildPrompt(preferences);
  
  try {
    const response = await axios.post(
      OPENAI_API_URL,
      {
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are a professional nutritionist and meal planner with expertise in Ayurvedic principles.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000
      },
      {
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return JSON.parse(response.data.choices[0].message.content);
  } catch (error) {
    console.error('Error generating meal plan:', error);
    throw error;
  }
};

const buildPrompt = (preferences: UserPreferences): string => {
  return `
Generate a personalized weekly meal plan based on the following preferences:

Daily Targets:
- Calories: ${preferences.targets.calories}
- Protein: ${preferences.targets.protein}g

Health Focus:
- Primary: ${preferences.healthFocus.primary}
- Secondary: ${preferences.healthFocus.secondary}

Dietary Restrictions: ${preferences.dietaryRestrictions.join(', ')}

Time Availability:
${Object.entries(preferences.timeAvailability)
  .map(([day, times]) => 
    `${day}:
    - Breakfast: ${times.breakfast} minutes
    - Lunch: ${times.lunch} minutes
    - Dinner: ${times.dinner} minutes`
  ).join('\n')}

Cultural Background: ${preferences.culturalBackground.join(', ')}
Familiarity Level: ${preferences.familiarityLevel}% (higher means more adventurous)

Additional Information:
${preferences.about}

Favorite Foods: ${preferences.favoriteFoods}

Please generate a weekly meal plan in the following JSON format:
{
  "weeklyPlan": {
    "Monday": {
      "breakfast": {
        "recipe": "Recipe Name",
        "prepTime": "XX mins",
        "calories": XXX,
        "protein": XX,
        "image": "unsplash_url",
        "ayurvedic": "dosha_balance",
        "ingredients": ["ingredient1", "ingredient2"],
        "instructions": ["step1", "step2"]
      },
      "lunch": { ... },
      "dinner": { ... }
    },
    "Tuesday": { ... },
    ...
  }
}

Ensure all recipes:
1. Meet the daily calorie and protein targets when combined
2. Respect dietary restrictions
3. Can be prepared within the specified time limits
4. Include appropriate Ayurvedic principles
5. Use realistic Unsplash image URLs for food photography
6. Include detailed ingredients and instructions
`;
};