/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryText: "#000000",
        secondaryText: "#3f3f3f",
        accent1: "#4ba9fd",
        accent2: "#0f64f4",
        accent3: "#008cff",
      },
    },
  },
  plugins: [],
};
