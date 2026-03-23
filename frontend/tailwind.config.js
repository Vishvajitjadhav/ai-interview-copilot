/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        night: {
          950: "#030712",
          900: "#0a0a0f",
          800: "#111118",
          700: "#1a1a24",
        },
      },
      backgroundImage: {
        "grid-glow":
          "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(124, 58, 237, 0.25), transparent), radial-gradient(ellipse 60% 40% at 100% 50%, rgba(59, 130, 246, 0.12), transparent)",
      },
    },
  },
  plugins: [],
};
