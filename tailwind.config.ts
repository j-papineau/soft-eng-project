import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      textColor: {
        base: "var(--color-text)",
        x: "var(--color-x)",
        o: "var(--color-o)",
        warning: "var(--color-warning)",
        button: "var(--color-button-text)",
        input: "var(--color-input-text)",
      },
      backgroundColor: {
        base: "var(--color-bg)",
        grid: "var(--color-grid)",
        button: "var(--color-button)",
        tile: "var(--color-tile)",
        warning: "var(--color-warning)",
        modal: "var(--color-modal)",
        input: "var(--color-input)",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
} satisfies Config;
