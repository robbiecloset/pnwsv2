/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}",
  ],
  darkMode: ["class"],
  theme: {
    extend: {
      colors: {
        felt: {
          blue: 'hsl(224, 87%, 55%)',
          orange: 'hsl(31, 100%, 50%)',
          green: 'hsl(126, 100%, 16%)',
          'blue-dark': 'hsl(224, 87%, 45%)',
          'orange-light': 'hsl(31, 100%, 60%)',
        },
      },
      spacing: {
        '4vw': '4vw',
        '6vw': '6vw',
      },
      maxWidth: {
        '1500': '1500px',
        '1600': '1600px',
      },
      backdropBlur: {
        '12': '12px',
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
}
