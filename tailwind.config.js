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
      },
    },
  },
  plugins: [],
} 