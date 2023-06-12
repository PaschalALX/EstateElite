/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
    ],
  theme: {
    extend: {
      backgroundSize: {
        'big': '1000px'
      },
      height: {
        'dash': 'calc(100vh - 120px)'
      }
    },
  },
  plugins: [],
}

