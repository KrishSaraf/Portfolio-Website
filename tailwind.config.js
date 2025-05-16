/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs': '375px',
      // => @media (min-width: 375px) { ... } // Small mobile devices (iPhone SE, etc.)
      
      'sm': '480px',
      // => @media (min-width: 480px) { ... } // Medium/large mobile devices in portrait
      
      'md': '768px',
      // => @media (min-width: 768px) { ... } // iPad Mini, iPad, iPad Air in portrait
      
      'lg': '992px',
      // => @media (min-width: 992px) { ... } // Small desktops and iPad Pro in landscape
      
      'xl': '1200px',
      // => @media (min-width: 1200px) { ... } // Larger desktops
      
      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... } // Extra large screens
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