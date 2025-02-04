import React, { useState, useEffect } from 'react';
import { Routes, Route, NavLink, useNavigate, Link } from 'react-router-dom';
import { Settings, Clock, Apple, BookOpen, Heart, Calendar, ChefHat, ShoppingCart, LogOut, ChevronDown } from 'lucide-react';
import PreferencesForm from '../components/PreferencesForm';
import MealPlanDisplay from '../components/MealPlanDisplay';
import AyurvedicTips from '../components/AyurvedicTips';
import RecipeList from '../components/RecipeList';
import ShoppingList from '../components/ShoppingList';
import { auth } from '../lib/auth';

function Dashboard() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState<string>('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [dailyTargets, setDailyTargets] = useState({
    protein: 60,
    calories: 2000
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await auth.getCurrentUser();
        if (user) {
          setUserName(user.name);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      auth.logout();
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Logout error:', error);
      auth.logout();
      navigate('/', { replace: true });
    }
  };

  const handleTargetsChange = (newTargets: { protein: number; calories: number }) => {
    setDailyTargets(newTargets);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const userMenu = document.getElementById('user-menu');
      if (userMenu && !userMenu.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50">
      <nav className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <Link 
              to="/" 
              className="flex items-center hover:opacity-80 transition-opacity"
            >
              <ChefHat className="h-8 w-8 text-primary-500" />
              <span className="ml-2 text-xl font-semibold gradient-text">Vital Bites</span>
            </Link>
            <div className="flex items-center space-x-8">
              <NavLink
                to="/dashboard"
                end
                className={({ isActive }) =>
                  `flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-gray-500 hover:text-primary-600 hover:bg-primary-50'
                  }`
                }
              >
                <Apple className="h-5 w-5 mr-2" />
                Meal Plan
              </NavLink>
              <NavLink
                to="/dashboard/recipes"
                className={({ isActive }) =>
                  `flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-gray-500 hover:text-primary-600 hover:bg-primary-50'
                  }`
                }
              >
                <BookOpen className="h-5 w-5 mr-2" />
                Recipes
              </NavLink>
              <NavLink
                to="/dashboard/shopping"
                className={({ isActive }) =>
                  `flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-gray-500 hover:text-primary-600 hover:bg-primary-50'
                  }`
                }
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Shopping List
              </NavLink>

              {/* User Menu */}
              <div className="relative" id="user-menu">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <span>Hi, {userName}</span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                      <NavLink
                        to="/dashboard/preferences"
                        className={({ isActive }) =>
                          `flex items-center px-4 py-2 text-sm ${
                            isActive
                              ? 'text-primary-600 bg-primary-50'
                              : 'text-gray-700 hover:bg-gray-50'
                          }`
                        }
                      >
                        <Settings className="h-4 w-4 mr-2" />
                        Preferences
                      </NavLink>
                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-radial from-primary-50/50 via-transparent to-transparent" />
          <Routes>
            <Route 
              path="/" 
              element={
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <MealPlanDisplay dailyTargets={dailyTargets} />
                  </div>
                  <div>
                    <AyurvedicTips />
                  </div>
                </div>
              } 
            />
            <Route 
              path="/preferences" 
              element={
                <PreferencesForm 
                  initialTargets={dailyTargets}
                  onTargetsChange={handleTargetsChange}
                />
              } 
            />
            <Route path="/recipes" element={<RecipeList />} />
            <Route path="/shopping" element={<ShoppingList />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;