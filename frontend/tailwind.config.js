/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        "gradient-slow": "gradient 8s linear infinite",
        "glow-line-1": "glow-line-1 4s ease-in-out infinite",
        "glow-line-2": "glow-line-2 4s ease-in-out infinite",
        "glow-line-3": "glow-line-3 4s ease-in-out infinite",
        "moving-light-1": "moving-light-1 8s infinite",
        "moving-light-2": "moving-light-2 8s infinite",
      },
      keyframes: {
        gradient: {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
        "glow-line-1": {
          "0%, 100%": { transform: "translateY(-100%)" },
          "50%": { transform: "translateY(100%)" },
        },
        "glow-line-2": {
          "0%, 100%": { transform: "translateY(100%)" },
          "50%": { transform: "translateY(-100%)" },
        },
        "glow-line-3": {
          "0%, 100%": { transform: "translateY(-100%)" },
          "50%": { transform: "translateY(100%)" },
        },
        "moving-light-1": {
          "0%": {
            transform: "translate(-50%, -50%) rotate(0deg)",
            left: "0%",
            top: "0%",
          },
          "25%": {
            transform: "translate(-50%, -50%) rotate(90deg)",
            left: "100%",
            top: "0%",
          },
          "50%": {
            transform: "translate(-50%, -50%) rotate(180deg)",
            left: "100%",
            top: "100%",
          },
          "75%": {
            transform: "translate(-50%, -50%) rotate(270deg)",
            left: "0%",
            top: "100%",
          },
          "100%": {
            transform: "translate(-50%, -50%) rotate(360deg)",
            left: "0%",
            top: "0%",
          },
        },
        "moving-light-2": {
          "0%": {
            transform: "translate(-50%, -50%) rotate(0deg)",
            left: "100%",
            top: "100%",
          },
          "25%": {
            transform: "translate(-50%, -50%) rotate(90deg)",
            left: "0%",
            top: "100%",
          },
          "50%": {
            transform: "translate(-50%, -50%) rotate(180deg)",
            left: "0%",
            top: "0%",
          },
          "75%": {
            transform: "translate(-50%, -50%) rotate(270deg)",
            left: "100%",
            top: "0%",
          },
          "100%": {
            transform: "translate(-50%, -50%) rotate(360deg)",
            left: "100%",
            top: "100%",
          },
        },
      },
    },
  },
  plugins: [],
}