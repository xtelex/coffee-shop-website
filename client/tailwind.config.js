/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          black: '#000000',
          white: '#FFFFFF',
        },
        dark: {
          900: '#000000',
          800: '#0A0A0A',
          700: '#1A1A1A',
        },
        light: {
          100: '#F5F5F5',
          200: '#E5E5E5',
          300: '#D4D4D4',
        }
      }
    },
  },
  plugins: [],
}
