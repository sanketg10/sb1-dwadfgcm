import React from 'react';
import { Leaf, Sun, Moon, Clock } from 'lucide-react';

function AyurvedicTips() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Health & Wellness Tips</h2>
      
      <div className="space-y-6">
        <div className="p-4 bg-emerald-50 rounded-lg">
          <div className="flex items-center mb-2">
            <Leaf className="h-5 w-5 text-emerald-600" />
            <h3 className="ml-2 font-medium text-gray-900">Nutrient-Rich Foods</h3>
          </div>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>• Leafy greens - rich in vitamins and minerals</li>
            <li>• Berries - high in antioxidants</li>
            <li>• Legumes - excellent protein source</li>
            <li>• Whole grains - sustained energy</li>
          </ul>
        </div>

        <div>
          <h3 className="font-medium text-gray-900 mb-3">Daily Wellness Practices</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-center">
              <Sun className="h-4 w-4 text-emerald-600 mr-2" />
              Start with a glass of water
            </li>
            <li className="flex items-center">
              <Clock className="h-4 w-4 text-emerald-600 mr-2" />
              Regular meal timings
            </li>
            <li className="flex items-center">
              <Moon className="h-4 w-4 text-emerald-600 mr-2" />
              7-8 hours of quality sleep
            </li>
          </ul>
        </div>

        <div className="p-4 bg-blue-50 rounded-lg">
          <h3 className="font-medium text-blue-800 mb-2">Lifestyle Tips</h3>
          <ul className="text-sm text-blue-600 space-y-1">
            <li>• Regular physical activity</li>
            <li>• Mindful eating practices</li>
            <li>• Stress management</li>
            <li>• Proper hydration</li>
          </ul>
        </div>

        <div className="border-t pt-4">
          <h3 className="font-medium text-gray-900 mb-3">Weekly Goals</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="text-sm px-3 py-2 bg-gray-50 rounded-md text-gray-700">
              30 mins exercise daily
            </div>
            <div className="text-sm px-3 py-2 bg-gray-50 rounded-md text-gray-700">
              2L water daily
            </div>
            <div className="text-sm px-3 py-2 bg-gray-50 rounded-md text-gray-700">
              5 servings vegetables
            </div>
            <div className="text-sm px-3 py-2 bg-gray-50 rounded-md text-gray-700">
              Meditation practice
            </div>
          </div>
        </div>

        <div className="text-xs text-gray-500">
          Note: These are general wellness guidelines. Adjust based on your personal needs and consult healthcare providers when needed.
        </div>
      </div>
    </div>
  );
}

export default AyurvedicTips;