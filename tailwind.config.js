/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        _blue: "#052559",
        _yellow: "#f5d922",
        _white: "#f5f5f5",
        _black: "#171717",
        _gray: "#525252"
      },
    },
    fontFamily: {
      primary: ["Nunito", "sans-serif"]
    }
  },
  plugins: [],
}
