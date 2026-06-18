import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#101216",
        midnight: "#0b1e3a",
        ocean: "#123d6a",
        gold: "#d7a93b",
        sand: "#f8f4ea"
      },
      boxShadow: {
        soft: "0 18px 45px rgba(11, 30, 58, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
