/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Podemos añadir colores personalizados si quieres
        brand: '#28a745',
      }
    },
  },
  plugins: [],
}