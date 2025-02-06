from typing import Dict, Any
import os
import openai
from dotenv import load_dotenv
from models import UserPreferences

# Load environment variables
load_dotenv()

# Configure OpenAI
openai.api_key = os.getenv('OPENAI_API_KEY')

def build_prompt(preferences: UserPreferences) -> str:
    time_availability = "\n".join([
        f"{day}:\n    - Breakfast: {times['breakfast']} minutes\n    - Lunch: {times['lunch']} minutes\n    - Dinner: {times['dinner']} minutes"
        for day, times in preferences.time_availability.items()
    ])

    return f"""
Generate a personalized weekly meal plan based on the following preferences:

Daily Targets:
- Calories: {preferences.targets['calories']}
- Protein: {preferences.targets['protein']}g

Health Focus:
- Primary: {preferences.health_focus['primary']}
- Secondary: {preferences.health_focus['secondary']}

Dietary Restrictions: {', '.join(preferences.dietary_restrictions)}

Time Availability:
{time_availability}

Cultural Background: {', '.join(preferences.cultural_background)}
Familiarity Level: {preferences.familiarity_level}% (higher means more adventurous)

Additional Information:
{preferences.about}

Favorite Foods: {preferences.favorite_foods}

Please generate a weekly meal plan in the following JSON format:
{{
  "weeklyPlan": {{
    "Monday": {{
      "breakfast": {{
        "recipe": "Recipe Name",
        "prepTime": "XX mins",
        "calories": XXX,
        "protein": XX,
        "image": "unsplash_url",
        "ayurvedic": "dosha_balance",
        "ingredients": ["ingredient1", "ingredient2"],
        "instructions": ["step1", "step2"]
      }},
      "lunch": {{ ... }},
      "dinner": {{ ... }}
    }},
    "Tuesday": {{ ... }},
    ...
  }}
}}

Ensure all recipes:
1. Meet the daily calorie and protein targets when combined
2. Respect dietary restrictions
3. Can be prepared within the specified time limits
4. Include appropriate Ayurvedic principles
5. Use realistic Unsplash image URLs for food photography
6. Include detailed ingredients and instructions
"""

async def generate_meal_plan(preferences: UserPreferences) -> Dict[str, Any]:
    try:
        response = await openai.ChatCompletion.acreate(
            model="gpt-4",
            messages=[
                {
                    "role": "system",
                    "content": "You are a professional nutritionist and meal planner with expertise in Ayurvedic principles."
                },
                {
                    "role": "user",
                    "content": build_prompt(preferences)
                }
            ],
            temperature=0.7,
            max_tokens=2000
        )
        
        # Parse and return the generated meal plan
        meal_plan = response.choices[0].message.content
        return meal_plan

    except Exception as e:
        print(f"Error generating meal plan: {str(e)}")
        raise