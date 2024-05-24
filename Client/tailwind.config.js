/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        red:'#ff00ff',
        purple:'#4B367C',
        blue:'#56F1FF',
        white:'#FEFCFD',
        neon: { 
          100: '#ccff00', 
          200: '#00ff66', 
          300: '#00ffff', 
          400: '#ff00ff', 
        },
        gray: { 
          850: '#1E1B18', 
        },
      },
      dropShadow: {
        '3': '0 5px 5px #111',
        '4xl': [
            '0 35px 35px rgba(0, 0, 0, 0.25)',
            '0 45px 65px rgba(0, 0, 0, 0.15)'
        ]
      }

    },
  },
  plugins: [],
}