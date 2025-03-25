/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", //  告訴 Tailwind 掃描這些檔案
  ],
  theme: {
    extend: {
      fontFamily:{
        sans: ["Yuji Boku", "sans-serif"]
      }
    },
  },
  plugins: [],
}

