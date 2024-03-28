/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      //default size 320px
      'xsm': '375px',
      'sm': '425px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1440px',
      '2xl': '1920px',
    },
    extend: {
      boxShadow: {
        '3xl': '0px 4px 5px 5px',
      },
      fontFamily: {
        poppins:['Poppins', 'sans-serif'],
        satisfy:['Satisfy', 'cursive'],

      },
    },
  },
  plugins: [require("daisyui")],
}

