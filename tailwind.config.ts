import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#5b7cfa",
          dark: "#3b5de6"
        }
      }
    },
  },
  plugins: [],
} satisfies Config;
