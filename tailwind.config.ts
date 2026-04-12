import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "Palatino Linotype", "Book Antiqua", "Georgia", "serif"],
        sans:    ["var(--font-body)", "Segoe UI", "system-ui", "sans-serif"]
      },
      colors: {
        forest: {
          950: "#030905",
          900: "#060d08",
          800: "#0c1610",
          700: "#0e1c12",
          600: "#1e3825"
        },
        gold: {
          200: "#f0d898",
          300: "#e4b668",
          400: "#c9922a",
          500: "#a87520",
          600: "#8a6220"
        },
        ember: {
          900: "#1a0d06",
          800: "#3a1e0e"
        }
      },
      boxShadow: {
        aura:    "0 24px 64px rgba(0, 0, 0, 0.55)",
        "aura-gold": "0 0 48px rgba(201, 146, 42, 0.18)",
        panel:   "0 40px 100px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255,255,255,0.06)",
        glow:    "0 0 60px rgba(30, 56, 37, 0.4)"
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
        "6xl": "3rem"
      },
      backdropBlur: {
        "2xs": "2px",
        xs:    "4px"
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        "in-out-custom": "cubic-bezier(0.76, 0, 0.24, 1)",
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)"
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to:   { opacity: "1", transform: "translateY(0)" }
        },
        "fade-in": {
          from: { opacity: "0" },
          to:   { opacity: "1" }
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.95)" },
          to:   { opacity: "1", transform: "scale(1)" }
        },
        shimmer: {
          from: { backgroundPosition: "-200% center" },
          to:   { backgroundPosition: "200% center" }
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to:   { transform: "rotate(360deg)" }
        }
      },
      animation: {
        "fade-up":  "fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) both",
        "fade-in":  "fade-in 0.6s ease both",
        "scale-in": "scale-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) both",
        shimmer:    "shimmer 3.5s linear infinite",
        "spin-slow": "spin-slow 20s linear infinite"
      }
    }
  },
  plugins: []
};

export default config;
