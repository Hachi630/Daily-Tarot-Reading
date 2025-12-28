/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mystical: {
          purple: '#4a148c',
          dark: '#1a0a2e',
          gold: '#d4af37',
          light: '#6a1b9a',
        },
      },
    },
  },
  plugins: [],
}

