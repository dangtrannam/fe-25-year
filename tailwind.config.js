/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        unbounded: ['"Unbounded"', 'sans-serif'],
      },
      textStroke: {
        white: '4px white',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.text-stroke-white': {
          WebkitTextStroke: '0.4px white',
          textStroke: '0.4px white',
          WebkitTextFillColor: 'transparent',
        },
      });
    },
  ],
}