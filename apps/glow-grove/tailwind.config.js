/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'sunrise-green': '#78C841',
        'sunrise-lime': '#B4E50D', 
        'sunrise-orange': '#FF9B2F',
        'sunrise-red': '#FB4141',
        'pastel-green': '#78C84180',
        'pastel-lime': '#B4E50D80',
        'pastel-orange': '#FF9B2F80',
        'pastel-red': '#FB414180',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

