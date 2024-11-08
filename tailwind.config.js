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
        white: '14px white',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.text-stroke-white': {
          WebkitTextStroke: '1.2px white',
          textStroke: '0.9px white',
          WebkitTextFillColor: 'transparent',
        },
      });
    },
  ],
}