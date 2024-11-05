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
        nav:"#F3F8F7",
        border:"#C3DED8"
        
      },
      fontFamily: {
        inter: ["Inter", "serif"],
      },
    },
  },
  plugins: [],
}