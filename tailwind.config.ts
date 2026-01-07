import type { Config } from "tailwindcss"

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        github: {
          bg: "#0d1117",
          surface: "#161b22",
          border: "#30363d",
          text: "#c9d1d9",
          muted: "#8b949e",
          accent: "#58a6ff",
          success: "#3fb950",
          danger: "#f85149",
        },
      },
    },
  },
  plugins: [],
}

export default config
