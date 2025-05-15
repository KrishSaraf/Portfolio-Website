/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs': '480px',
      // => @media (min-width: 480px) { ... }

      'sm': '576px',
      // => @media (min-width: 576px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '992px',
      // => @media (min-width: 992px) { ... }

      'xl': '1200px',
      // => @media (min-width: 1200px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
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
      fontSize: {
        'fluid-xs': 'clamp(0.75rem, 1vw, 0.875rem)',
        'fluid-sm': 'clamp(0.875rem, 1.2vw, 1rem)',
        'fluid-base': 'clamp(1rem, 1.5vw, 1.125rem)',
        'fluid-lg': 'clamp(1.125rem, 1.8vw, 1.25rem)',
        'fluid-xl': 'clamp(1.25rem, 2.1vw, 1.5rem)',
        'fluid-2xl': 'clamp(1.5rem, 2.5vw, 1.875rem)',
        'fluid-3xl': 'clamp(1.875rem, 3vw, 2.25rem)',
        'fluid-4xl': 'clamp(2.25rem, 4vw, 3rem)',
        'fluid-5xl': 'clamp(3rem, 5vw, 4rem)',
      },
      spacing: {
        'fluid-1': 'clamp(0.25rem, 0.5vw, 0.5rem)',
        'fluid-2': 'clamp(0.5rem, 1vw, 0.75rem)',
        'fluid-3': 'clamp(0.75rem, 1.5vw, 1rem)',
        'fluid-4': 'clamp(1rem, 2vw, 1.5rem)',
        'fluid-5': 'clamp(1.25rem, 2.5vw, 1.75rem)',
        'fluid-6': 'clamp(1.5rem, 3vw, 2rem)',
        'fluid-8': 'clamp(2rem, 4vw, 3rem)',
        'fluid-10': 'clamp(2.5rem, 5vw, 4rem)',
        'fluid-12': 'clamp(3rem, 6vw, 5rem)',
        'fluid-16': 'clamp(4rem, 8vw, 6rem)',
        'fluid-20': 'clamp(5rem, 10vw, 8rem)',
        'fluid-24': 'clamp(6rem, 12vw, 10rem)',
      },
      maxWidth: {
        'fluid-xs': 'min(100%, 20rem)',
        'fluid-sm': 'min(100%, 24rem)',
        'fluid-md': 'min(100%, 28rem)',
        'fluid-lg': 'min(100%, 32rem)',
        'fluid-xl': 'min(100%, 36rem)',
        'fluid-2xl': 'min(100%, 42rem)',
        'fluid-3xl': 'min(100%, 48rem)',
        'fluid-4xl': 'min(100%, 56rem)',
        'fluid-5xl': 'min(100%, 64rem)',
        'fluid-6xl': 'min(100%, 72rem)',
        'fluid-7xl': 'min(100%, 80rem)',
      },
      height: {
        'screen-dynamic': ['100vh', '100dvh'],
      },
      aspectRatio: {
        'portrait': '3/4',
        'landscape': '4/3',
        'widescreen': '16/9',
        'ultrawide': '21/9',
        'square': '1/1',
      },
    },
  },
  plugins: [],
} 