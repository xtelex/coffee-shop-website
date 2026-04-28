/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        coffee: {
          black: '#000000',
          white: '#FFFFFF',
          gray: '#1A1A1A',
          'light-gray': '#F5F5F5',
          'medium-gray': '#808080',
        }
      }
    },
  },
  plugins: [],
}
