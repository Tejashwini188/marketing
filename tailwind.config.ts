import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // CSP Matrimony palette — deep maroon on warm ivory.
        maroon: {
          DEFAULT: "#6B1F33",
          dark: "#521626",
          light: "#8A3349",
          50: "#FBF1F3",
          100: "#F5DFE4",
        },
        ivory: {
          DEFAULT: "#F8F4EE",
          dark: "#EFE8DE",
        },
        ink: {
          DEFAULT: "#1F1A1C",
          soft: "#5E5558",
        },
        blush: "#F3E6E8",
        plum: "#3A1B28",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ['"Playfair Display"', "Georgia", "Cambria", "serif"],
      },
      boxShadow: {
        card: "0 18px 50px -24px rgba(60, 20, 32, 0.28)",
      },
    },
  },
  plugins: [],
} satisfies Config;
