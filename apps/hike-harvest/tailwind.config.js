import { defineConfig } from '@tailwindcss/vite'

export default defineConfig({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Custom hiking palette
        'earth': {
          50: '#f5f3f1',
          100: '#e8e2dd',
          200: '#d4c7bc',
          300: '#b8a595',
          400: '#9d856b',
          500: '#8a6f56',
          600: '#7a5f4a',
          700: '#4B352A', // Main earth color
          800: '#3d2a22',
          900: '#2f1f1a',
        },
        'sunset': {
          50: '#fef7f0',
          100: '#fdeee0',
          200: '#fbd9c0',
          300: '#f8c095',
          400: '#f5a068',
          500: '#CA7842', // Main sunset color
          600: '#b86a3a',
          700: '#9d5a32',
          800: '#824a2a',
          900: '#6b3d22',
        },
        'sage': {
          50: '#f7f9f4',
          100: '#eef2e8',
          200: '#dde5d1',
          300: '#c5d2b4',
          400: '#B2CD9C', // Main sage color
          500: '#9bb885',
          600: '#7fa36b',
          700: '#6b8a58',
          800: '#576e49',
          900: '#485a3d',
        },
        'cream': {
          50: '#F0F2BD', // Main cream color
          100: '#e8eb9f',
          200: '#dde281',
          300: '#d2d863',
          400: '#c7ce45',
          500: '#bcc427',
          600: '#a7b023',
          700: '#929c1f',
          800: '#7d881b',
          900: '#687417',
        }
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
})
