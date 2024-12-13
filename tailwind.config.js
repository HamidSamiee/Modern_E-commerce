import formsPlugin from '@tailwindcss/forms'
import typographyPlugin from '@tailwindcss/typography'
import daisyui from "daisyui"
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    container: {
      center: true,
    },
    fontFamily:{
      sans:['iranYekan']
    },
    extend: {
      screens:{
        'sm-custom':{'max':'470px'},
      }
    },
  },
  plugins: [
    formsPlugin({strategy:"class"}),
    typographyPlugin,
    daisyui,
  ],
}

