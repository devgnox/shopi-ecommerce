/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  mode: "jit",
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)'],
        montserrat: ['var(--font-montserrat)'],
      },
      colors: {
        "background":"var(--background)",
        "black-100": "var(--black-100)",
        "primary-blue": {
          DEFAULT: "var(--primary-blue)",
          100: "var(--white)",
        },
        "secondary-orange": "var(--secondary-orange)",
        "light-white": {
          DEFAULT: "var(--light-white)",
          100: "var(--light-white-100)",
        },
        grey: "var(--grey)",
        "border-accent": "var(--border-accent)",
        text:"var(--text)"
      },
    },
  },
  plugins: [],
};