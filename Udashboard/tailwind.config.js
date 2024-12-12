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
        darkBg: "#121212", 
        darkText: "#E4E4E7", 
      },
      fontFamily: {
        poppins: ["Poppins", "serif"],
      },
    },
  },
  darkMode: "class", 
  plugins: [],
}
