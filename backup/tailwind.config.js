/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          500: '#16a34a',
          600: '#15803d',
          700: '#166534',
        },
        secondary: {
          50: '#ecfdf5',
          500: '#10b981',
          600: '#059669',
        },
        accent: {
          50: '#ecfeff',
          500: '#06b6d4',
          600: '#0891b2',
        },
        orange: {
          50: '#fff7ed',
          500: '#f97316',
          600: '#ea580c',
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
};