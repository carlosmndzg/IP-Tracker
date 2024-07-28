/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "pattern-bg-desktop": "url('/pattern-bg-desktop.png')",
        "pattern-bg-mobile": "url('/pattern-bg-mobile.png')",
      },
      colors: {
        very_dark_grey: "hsl(0, 0%, 17%)",
        dark_grey: "hsl(0, 0%, 59%)",
      },
    },
  },
  plugins: [],
};
