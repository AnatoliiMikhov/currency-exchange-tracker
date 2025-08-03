/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './layouts/**/*.{js,ts,jsx,tsx,mdx}', // Додаємо шлях до layouts
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-roboto)'], // Вказуємо Roboto як основний sans-serif шрифт
      },
    },
  },
  plugins: [],
};
