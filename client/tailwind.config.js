/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "480px",
      md: "960px",
      lg: "1440px",
    },
    container: {
      center: true,
      padding: "1rem",
    },
    colors: {
      white: "#FFFFFF",
      blue: "#007AC9",
      gray: "#999999",
      "light-gray": {
        50: "#F7F7F7",
        100: "#D6D1D3",
      },
    },
    textColor: {
      white: "#FFFFFF",
      blue: "#007AC9",
    },
    extend: {},
  },
  plugins: [],
};
