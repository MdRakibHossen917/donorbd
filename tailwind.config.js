/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9f4',
          100: '#dcf2e5',
          500: '#006A4E', // Bangladesh Green
          600: '#00563e',
          700: '#00422e',
          900: '#002218',
        },
        secondary: {
          500: '#F42A41', // Bangladesh Red
          600: '#d92339',
        },
        accent: {
          gold: '#FFD700',
        }
      },
      fontFamily: {
        bangla: ['"Noto Sans Bengali"', 'sans-serif'],
        english: ['Inter', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}

