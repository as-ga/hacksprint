/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4A90E2',
        'primary-dark': '#357ABD',
        secondary: '#50E3C2',
        accent: '#F5A623',
        background: '#F4F4F4',
        text: '#333333',
      },
    },
  },
  plugins: [],
}