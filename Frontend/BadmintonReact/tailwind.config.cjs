/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{html,js,jsx,ts,tsx}', // Include your JSX/TSX files
  ],
  theme: {
    extend: {
      colors: {
        'scoreboard-green': '#28a745',
        'scoreboard-red': '#dc3545',
      },
      fontFamily: {
        sans: ['Roboto', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}