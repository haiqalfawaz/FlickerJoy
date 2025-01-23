/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "anastasia-1": "#FFFBE0",
        "anastasia-2": "#FCDA05",
        "anastasia-3": "#393E46",
        "anastasia-4": "#222831",
        "anastasia-5": "#D9D9D9",
      },
    },
  },
  plugins: [],
};
