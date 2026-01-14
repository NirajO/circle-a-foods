/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0057B8",
        accent: "#E10600",
        dark: "#1F2937",
      },
    },
  },
  plugins: [],
};
