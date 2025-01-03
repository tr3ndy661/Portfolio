/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html",
            "./src/**/*.{js,ts,jsx,tsx}",
          ],
  theme: {
    extend: {
      spacing: {
        '128': '70rem', // following the standard of 128 / 4 = 32
        '78': '300px',
        '100': '1080px',
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

