/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      //default size 360px
      'xsm': '425px',
      'sm': '768px',
      'md': '1024px',
      'lg': '1200px',
      'xl': '1440px',
      '2xl': '1600px',
      '3xl': '1920px',
    },
    extend: {
      boxShadow: {
        '3xl': '0px 4px 5px 5px',
      },
      fontFamily: {
        poppins:['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

