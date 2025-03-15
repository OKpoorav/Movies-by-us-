/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'script': ['"Dancing Script"', 'cursive'],
        'satisfy': ['Satisfy', 'cursive'],
        'sans': ['Quicksand', 'sans-serif'],
      },
      animation: {
        'fadeIn': 'fadeIn 0.5s ease forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
} 