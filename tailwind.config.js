module.exports = {
  purge: {
    enabled: true,
    content: ["src/**/*.js", "src/**/*.jsx", "public/**/*.html"],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
