  /** @type {import('tailwindcss').Config} */
  module.exports = {
    content: [
      "./app/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        fontFamily: {
          card: ["var(--font-joker)", "sans-serif"],
          roboto: ["var(--font-roboto)", "sans-serif"],
        },
      },
    },
    plugins: [],
  };
