/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Main colors
        darkPink: "#970747",
        white: "#FFFFFF",
        // Theme colors
        primary: "#FFFFFF", // White
        secondary: "#970747", // Dark pink
        textPrimary: "#970747", // Dark pink
        textSecondary: "#970747", // Dark pink with opacity
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
} 