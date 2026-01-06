/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        border: 'var(--border)',
        ring: 'var(--ring)',
        // Add other custom colors as needed
      },
      fontFamily: {
        card: ["var(--font-card)"],
        joker: ["var(--font-joker)"],
        poppins: ["var(--font-poppins)"],
        roboto: ["var(--font-roboto)"],
        'jqka': ['var(--font-jqka)', 'sans-serif'],
      },
    },
  },
  // ...other config...
}