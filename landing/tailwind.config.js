/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        main: "#0D8267",
        purple: "#818CF8",
        darkColor: "#F3F8F7",
        nav: "#F3F8F7",
        border: "#C3DED8",
      },
      fontFamily: {
        inter: ["Inter", "serif"],
      },
      screens: {
        xs: "480px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        '2xl': "1440px",
        '3xl': "1920px",
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        float: {
          '0%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' },
          '100%': { transform: 'translateY(0px)' },
        },
      },
      animation: {
        slideUp: 'slideUp 0.9s ease-in-out',
        slideDown: 'slideDown 0.9s ease-in-out',
        fadeIn: 'fadeIn 0.8s ease-in-out',
        float: 'float 5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
