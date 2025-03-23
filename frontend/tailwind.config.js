/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // Ensure dark mode is based on class
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: "#121212",
        light: "#FFFFFF",
      },
    },
  },
  plugins: [],
};
