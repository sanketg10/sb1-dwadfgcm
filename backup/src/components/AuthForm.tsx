import React, { useState, useRef } from 'react';
import { Mail, Lock, User, LogIn, UserPlus, Clock, Heart, ShoppingCart, ChefHat, Leaf, ArrowRight } from 'lucide-react';
import { authService } from '../lib/auth';

interface AuthFormProps {
  onAuthSuccess: () => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const authFormRef = useRef<HTMLDivElement>(null);

  const handleGetStarted = () => {
    setIsLogin(false);
    authFormRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await authService.login(formData.email, formData.password);
      } else {
        await authService.register({
          email: formData.email,
          password: formData.password,
          name: formData.name
        });
      }
      onAuthSuccess();
    } catch (err: any) {
      console.error('Auth error:', err);
      setError(err.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const features = [
    {
      icon: <ChefHat className="h-8 w-8 text-primary-500" />,
      title: "Personalized Meal Planning",
      description: "Get customized weekly meal plans based on your preferences and dietary needs"
    },
    {
      icon: <Leaf className="h-8 w-8 text-primary-500" />,
      title: "Ayurvedic Wisdom",
      description: "Discover recipes aligned with ancient Ayurvedic principles for optimal health"
    },
    {
      icon: <Clock className="h-8 w-8 text-primary-500" />,
      title: "Time-Saving Solutions",
      description: "Efficient meal prep and cooking instructions to fit your busy schedule"
    },
    {
      icon: <ShoppingCart className="h-8 w-8 text-primary-500" />,
      title: "Smart Shopping Lists",
      description: "Automatically generated grocery lists organized by category"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <ChefHat className="h-8 w-8 text-primary-500" />
              <span className="ml-2 text-xl font-semibold gradient-text">Vital Bites</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 lg:mt-16 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block">Transform Your Health</span>
                  <span className="block gradient-text">with Holistic Nutrition</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Vital Bites blends the power of modern nutrition science with the timeless wisdom of Ayurveda to craft personalized meal plans that fuel your body, balance your mind, and nourish your soul.
                </p>
                <div className="mt-8 sm:flex sm:justify-center lg:justify-start">
                  <button
                    onClick={handleGetStarted}
                    className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 transition-colors duration-150 ease-in-out shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
            src="https://images.unsplash.com/photo-1543352634-a1c51d9f1fa7?auto=format&fit=crop&w=1920&q=80"
            alt="Colorful vegetarian food bowl"
          />
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div key={index} className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-50 mx-auto">
                {feature.icon}
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900 text-center">{feature.title}</h3>
              <p className="mt-2 text-sm text-gray-500 text-center">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Auth Form */}
      <div ref={authFormRef} className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-8">
          <div className="text-center">
            <div className="flex justify-center">
              <ChefHat className="h-12 w-12 text-primary-600" />
            </div>
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              {isLogin ? 'Welcome back!' : 'Start your journey'}
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="font-medium text-primary-600 hover:text-primary-500"
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>

          {error && (
            <div className="mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm space-y-4">
              {!isLogin && (
                <div>
                  <label htmlFor="name" className="sr-only">Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required={!isLogin}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="appearance-none rounded-md relative block w-full pl-10 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                      placeholder="Full name"
                    />
                  </div>
                </div>
              )}
              
              <div>
                <label htmlFor="email" className="sr-only">Email address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="appearance-none rounded-md relative block w-full pl-10 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                    placeholder="Email address"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="appearance-none rounded-md relative block w-full pl-10 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                    placeholder="Password"
                  />
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                  loading
                    ? 'bg-primary-400 cursor-not-allowed'
                    : 'bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500'
                }`}
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  {isLogin ? (
                    <LogIn className="h-5 w-5 text-primary-500 group-hover:text-primary-400" />
                  ) : (
                    <UserPlus className="h-5 w-5 text-primary-500 group-hover:text-primary-400" />
                  )}
                </span>
                {loading ? 'Please wait...' : (isLogin ? 'Sign in' : 'Sign up')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;