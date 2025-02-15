/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "#222222",
          dark: "#222222",
          light: "#FFFFFF",
        },
        foreground: {
          DEFAULT: "#FFFFFF",
          dark: "#FFFFFF",
          light: "#222222",
        },
        primary: {
          DEFAULT: "#FFFC54",
          dark: "#FFFC54",
          light: "#FFFC54",
          disable: "#6d6d32",
        },
        secondary: {
          DEFAULT: "#2B2B2A",
          dark: "#2B2B2A",
          light: "#2B2B2A",
        },
        tertiary: {
          DEFAULT: "#9E9E9B",
          dark: "#9E9E9B",
          light: "#9E9E9B",
        },
        quaternary: {
          DEFAULT: "#D8D8D8",
          dark: "#D8D8D8",
          light: "#D8D8D8",
        },
      },
    },
  },
  plugins: [],
};
