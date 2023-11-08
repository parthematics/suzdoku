/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // Include your React components
    "./public/index.html", // Include your HTML file
  ],
  theme: {
    extend: {
      fontFamily: {
        urbanist: ["Urbanist", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        green: "#90EE90",
        red: "#FFC0CB",
      },
    },
  },
  plugins: [],
};
