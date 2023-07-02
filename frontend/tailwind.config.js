/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        "twitter-blue": "#4A99E9",
        "twitter-gray": "#566370"
      },
    },
  },
  plugins: [],
}

