module.exports = {
  important: true,
  purge: {
    enabled: process.env.NODE_ENV === "production",
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
