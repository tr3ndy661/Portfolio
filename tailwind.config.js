/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        '128': '70rem',
        '78': '300px',
        '100': '1040px',
      },
      fontFamily: {
        sans: ['Roboto Flex', 'sans-serif'],
      },
      animation: {
        'typing': 'typing 3.5s steps(40, end)',
      },
      keyframes: {
        typing: {
          'from': { width: '0' },
          'to': { width: '100%' },
        }
      }
    },
  },
  plugins: [],
}
