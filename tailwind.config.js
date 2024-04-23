const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    // fontFamily: {
    //   poppins: ['Poppins', 'sans-serif'],
    // },
    // colors: {
    //   blue: '#002B93',
    //   white: '#ffffff',
    // },
    extend: {},
  },
  plugins: [
      flowbite.plugin(),
      require('tailwind-scrollbar'),
  ],
}