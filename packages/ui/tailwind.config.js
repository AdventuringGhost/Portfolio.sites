/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "../../apps/**/src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        sunrise: {
          cyan: '#59D5E0',
          yellow: '#F5DD61',
          orange: '#FAA300',
          pink: '#F4538A',
        },
        custom: {
          green: '#78C841',
          cream: '#B4E50D',
          orange: '#FF9B2F',
          burgundy: '#FB4141',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
