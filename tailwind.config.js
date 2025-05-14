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
      fontSize: {
        'fluid-xs': ['clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)', '1.4'],
        'fluid-sm': ['clamp(0.875rem, 0.8rem + 0.375vw, 1rem)', '1.5'],
        'fluid-base': ['clamp(1rem, 0.9rem + 0.5vw, 1.125rem)', '1.6'],
        'fluid-lg': ['clamp(1.125rem, 1rem + 0.625vw, 1.25rem)', '1.6'],
        'fluid-xl': ['clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem)', '1.4'],
        'fluid-2xl': ['clamp(1.5rem, 1.3rem + 1vw, 1.875rem)', '1.3'],
        'fluid-3xl': ['clamp(1.875rem, 1.6rem + 1.375vw, 2.25rem)', '1.2'],
        'fluid-4xl': ['clamp(2.25rem, 1.9rem + 1.75vw, 3rem)', '1.1'],
        'fluid-5xl': ['clamp(3rem, 2.5rem + 2.5vw, 4rem)', '1'],
      },
      screens: {
        'xs': '480px',
        // Default Tailwind breakpoints
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [],
} 