/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "bg-body": "#3C4557",
        "primary-dark": "#303845",
        "lightblue-active": "#567796",
        "title-blue": "#99CEFF"
      },
      theme: {
        screens: {
          '2xl': '1800px',
        }
      },
    },
    plugins: [],
  }
}

