import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#07090a", // page background
          900: "#0c100c", // deep section background
          800: "#12160f", // card background
          700: "#1a1f17", // card hover / border-adjacent
          600: "#262c22", // borders
          500: "#3a4133", // subtle borders / dividers
        },
        lime: {
          DEFAULT: "#c8f31d",
          400: "#d4f74c",
          500: "#c8f31d",
          600: "#aad916",
        },
        amber: {
          DEFAULT: "#d9a55a",
          400: "#e3b877",
          500: "#d9a55a",
          600: "#c28f45",
        },
        mist: {
          100: "#f4f6f0",
          300: "#c9d0c1",
          400: "#a5ac9c",
          500: "#828a78",
          600: "#646b5c",
        },
        danger: {
          bg: "#3a1414",
          border: "#5c2020",
          text: "#f0b4ae",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        sans: ["var(--font-sans)", "sans-serif"],
      },
      letterSpacing: {
        widest2: "0.18em",
      },
      maxWidth: {
        content: "1280px",
      },
    },
  },
  plugins: [],
};

export default config;
