const colors = require("tailwindcss/colors");

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    colors: {
      transparent: "transparent",
      primary: "#f2f5f9",
      secondary: "#4e426d",
      gray: "#aeb5c2",
      white: colors.white,
      red: "#B4161B",
      green: "#3ba58a",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
