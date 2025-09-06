// tailwind.config.js
/** @type {import('tailwindcss').Config} */
import typography from "@tailwindcss/typography";
import scrollbar from "tailwind-scrollbar"; // usa ^3.1.0 con Tailwind v3
import daisyui from "daisyui";

const config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Metal Mania"', "system-ui", "ui-sans-serif"],
        sans: ['"Metal Mania"', "Inter", "system-ui", "ui-sans-serif"]
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
      maxWidth: { grid: "1680px" },
      boxShadow: { ring: "0 0 0 3px rgba(255,107,0,.2), 0 10px 30px rgba(0,0,0,.5)" },
      keyframes: {
        lockJiggle: {
          "0%": { transform: "translate3d(0,0,0) rotate(0deg)" },
          "10%": { transform: "translate3d(-3px, 1px, 0) rotate(-6deg)" },
          "25%": { transform: "translate3d(4px, -2px, 0) rotate(6deg)" },
          "40%": { transform: "translate3d(-5px, 2px, 0) rotate(-8deg)" },
          "55%": { transform: "translate3d(5px, -3px, 0) rotate(8deg)" },
          "70%": { transform: "translate3d(-3px, 1px, 0) rotate(-5deg)" },
          "85%": { transform: "translate3d(2px, -1px, 0) rotate(3deg)" },
          "100%": { transform: "translate3d(0,0,0) rotate(0deg)" }
        },
        fogMove: {
          from: { transform: "translateY(-6px)", opacity: ".75" },
          to:   { transform: "translateY(8px)",  opacity: ".95" }
        },
        embersScroll: {
          from: { backgroundPosition: "0 0, 0 0, 0 0, 0 0, 0 0" },
          to:   { backgroundPosition: "0 -1200px, 0 -800px, 0 -1000px, 0 -700px, 0 -900px" }
        },
        floatY: { from: { transform: "translateY(-6px)" }, to: { transform: "translateY(6px)" } }
      },
      animation: {
        "lock-jiggle": "lockJiggle .85s cubic-bezier(.36,.07,.19,.97) 1 both",
        "lock-jiggle-active": "lockJiggle .70s cubic-bezier(.36,.07,.19,.97) 1 both",
        fog: "fogMove 18s ease-in-out infinite alternate",
        embers: "embersScroll 12s linear infinite",
        floaty: "floatY 6s ease-in-out infinite alternate"
      }
    }
  },
  plugins: [typography, scrollbar, daisyui],
  daisyui: { themes: ["halloween"] }
};

export default config;
