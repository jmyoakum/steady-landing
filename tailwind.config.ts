import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#FBF8F2",
        paper: "#F5F1E9",
        paperDeep: "#EFE7D9",
        ink: "#241F1A",
        inkSoft: "#574E44",
        inkFaint: "#8C8275",
        clay: "#C06B4A",
        clayDeep: "#9F4F2E",
        sage: "#8B9A86",
        line: "#E4DCCC",
        lavender: "#8E83C7",
        coral: "#E2917E",
        gold: "#E6B450",
      },
      fontFamily: {
        display: ["var(--font-jakarta)", "ui-sans-serif", "system-ui", "sans-serif"],
        body: ["var(--font-jakarta)", "ui-sans-serif", "system-ui", "sans-serif"],
        hand: ["var(--font-caveat)", "ui-serif", "cursive"],
      },
      maxWidth: {
        read: "40rem",
      },
    },
  },
  plugins: [],
};

export default config;
