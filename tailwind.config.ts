import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          950: "#070d0a",
          900: "#0d1712",
          800: "#132219"
        },
        gold: {
          500: "#d8b372",
          600: "#be9552"
        }
      },
      boxShadow: {
        aura: "0 24px 48px rgba(0, 0, 0, 0.35)"
      }
    }
  },
  plugins: []
};

export default config;
