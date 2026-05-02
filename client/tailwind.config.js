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
          red: '#DC143C',      // Crimson red
          'dark-red': '#8B0000', // Dark red
          'light-red': '#FF6B6B', // Light red for accents
        },
        dark: {
          900: '#000000',      // Pure black
          800: '#0A0A0A',      // Almost black
          700: '#1A1A1A',      // Dark gray
        }
      }
    },
  },
  plugins: [],
}
