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
      maxWidth: {
        grid: "1680px"
      },
      boxShadow: {
        ring: "0 0 0 3px rgba(255,107,0,.2), 0 10px 30px rgba(0,0,0,.5)"
      },

      /* ========= Animación 'intento de abrir' para el candado =========
         - Amplitud más ancha (más desplazamiento y rotación)
         - Más lenta (~0.8s)
         - Una sola vez (sin bucle)
         - Easing elástico (parece que intenta abrir y se vuelve a cerrar)
      */
      keyframes: {
        lockJiggle: {
          "0%":   { transform: "translate3d(0,0,0) rotate(0deg)" },
          "10%":  { transform: "translate3d(-3px, 1px, 0) rotate(-6deg)" },
          "25%":  { transform: "translate3d(4px, -2px, 0) rotate(6deg)" },
          "40%":  { transform: "translate3d(-5px, 2px, 0) rotate(-8deg)" },
          "55%":  { transform: "translate3d(5px, -3px, 0) rotate(8deg)" },
          "70%":  { transform: "translate3d(-3px, 1px, 0) rotate(-5deg)" },
          "85%":  { transform: "translate3d(2px, -1px, 0) rotate(3deg)" },
          "100%": { transform: "translate3d(0,0,0) rotate(0deg)" }
        }
      },
      animation: {
        // Desktop (hover): más lento y marcado
        "lock-jiggle": "lockJiggle .85s cubic-bezier(.36,.07,.19,.97) 1 both",
        // Móvil (tap/active): un pelín más corto
        "lock-jiggle-active": "lockJiggle .70s cubic-bezier(.36,.07,.19,.97) 1 both"
      }
    }
  },
  plugins: []
};
