/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        washu: {
          green: '#007360',
          red: '#A51417',
          dark: '#1a1f1d',
          accent: '#10B981',
          card: '#161e1b',
        }
      }
    },
  },
  plugins: [],
}

