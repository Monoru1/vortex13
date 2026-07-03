import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "rgb(var(--bg) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        raised: "rgb(var(--raised) / <alpha-value>)",
        ink: "rgb(var(--ink) / <alpha-value>)",
        smoke: "rgb(var(--smoke) / <alpha-value>)",
        vortex: "#E10600",
      },
      fontFamily: {
        display: ['"Archivo"', "system-ui", "sans-serif"],
        sans: ['"Instrument Sans"', "system-ui", "sans-serif"],
        mono: ['"IBM Plex Mono"', "ui-monospace", "monospace"],
      },
      borderColor: { line: "var(--line)" },
      transitionTimingFunction: {
        vortex: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      maxWidth: { shell: "88rem" },
    },
  },
  plugins: [],
} satisfies Config;
