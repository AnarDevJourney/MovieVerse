/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        'darker-gray': '#14171C',
        'dark-gray': '#2C343F',
        'soft-gray':'#556678',
        'custom-green':'#00B021',
        'custom-orange':'#F27405',
        'custom-blue':'#40bcf4',
      },
    },
  },
  plugins: [],
};
