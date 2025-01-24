/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Inria Serif"', "serif"], // Add Inria Serif to the serif stack
      },
    },
  },
  plugins: [],
}

