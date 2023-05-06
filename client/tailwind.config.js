/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    colors: {
      blue: "#007AC9",
      gray: "#999999",
      "light-gray": "#707070",
    },
    textColor: {
      white: "#FFFFFF",
    },
    extend: {},
  },
  plugins: [],
};
