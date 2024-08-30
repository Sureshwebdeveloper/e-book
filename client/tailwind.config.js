/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        btn: "#425eff",
      },
      fontFamily: {
        libre: ["Libre Franklin", "sans-serif"],
        popins: ["Poppins", "system-ui"],
        cabin: ["Cabin", "sans-serif"],
      },
    },
  },
  plugins: [],
};
