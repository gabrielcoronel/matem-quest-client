/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        _black: "#262626",
        _white: "#f5f5f5",
        _purple: "#4c1d95",
        _yellow: "#f5d922"
      },
    },
    fontFamily: {
      primary: ["Nunito", "sans-serif"]
    }
  },
  plugins: [],
}
