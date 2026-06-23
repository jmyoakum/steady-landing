import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#F5F1E9",
        paperDeep: "#EFE9DD",
        ink: "#211C17",
        inkSoft: "#5A5147",
        inkFaint: "#8C8275",
        clay: "#A8694C",
        clayDeep: "#8F5238",
        sage: "#8B9A86",
        line: "#DAD2C2",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        body: ["var(--font-newsreader)", "Georgia", "serif"],
      },
      maxWidth: {
        read: "38rem",
      },
    },
  },
  plugins: [],
};

export default config;
