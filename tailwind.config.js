/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Creepster"', "system-ui", "ui-sans-serif"],
        sans: ["Inter", "system-ui", "ui-sans-serif"]
      },
      colors: {
        ink: "#e7e7f2",
        muted: "#a2a2b8",
        panel: "#11121a",
        bg: "#0b0b10",
        accent: "#ff6b00",
        accent2: "#7c3aed",
        good: "#3ddc97",
        bad: "#ff4d4f"
      },
      // ⬆️ ensanchamos el contenedor del calendario
      maxWidth: {
        grid: "1680px" // prueba 1680px; si aún no cabe, sube a 1760 o 1800
      },
      boxShadow: {
        ring: "0 0 0 3px rgba(255,107,0,.2), 0 10px 30px rgba(0,0,0,.5)"
      }
    }
  },
  plugins: []
};
