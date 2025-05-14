/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'sm': '576px',
      // => @media (min-width: 576px) { ... } // Mobile styles will be base, sm effectively becomes the larger end of mobile / start of tablet by convention if needed, though not explicitly asked for.

      'md': '577px',
      // => @media (min-width: 577px) { ... } // Tablet

      'lg': '992px',
      // => @media (min-width: 992px) { ... } // Desktop

      'laptop': '1024px',
      // => @media (min-width: 1024px) { ... } // Laptop

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... } // Large laptop

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... } // Extra large / wide laptop
    },
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