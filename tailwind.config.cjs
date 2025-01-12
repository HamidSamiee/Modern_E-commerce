// tailwind.config.cjs
const formsPlugin = require('@tailwindcss/forms');
const typographyPlugin = require('@tailwindcss/typography');
const tailwindScrollbar = require('tailwind-scrollbar');
const daisyui = require('daisyui');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    container: {
      center: true,
    },
    fontFamily: {
      sans: ['iranYekan'],
    },
    extend: {
      screens: {
        'sm-custom': { 'max': '480px' },
        'sm-custom2': { 'max': '550px' },
        'sm-custom3': { 'max': '639px', 'min': '550px' },
      },
    },
  },
  plugins: [
    formsPlugin({ strategy: "class" }),
    typographyPlugin,
    daisyui,
    tailwindScrollbar,
  ],
};
