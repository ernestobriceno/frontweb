/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'D9D9D9': '#D9D9D9',
        '006de2': '#006de2',
      },
    },
  },
  plugins: [],
}