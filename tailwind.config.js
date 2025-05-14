module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        web3blue: "#0F172A",
        web3white: "#F1F5F9",
        accent: "#3B82F6",
      },
      animation: {
        "fade-in": "fadeIn 1s ease-out",
        "pulse-slow": "pulse 3s ease-in-out infinite",
        "glow-ring": "glow 4s ease-in-out infinite",
        "spin-slow": "spin 20s linear infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0, transform: "translateY(10px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        glow: {
          "0%, 100%": { transform: "scale(1)", opacity: 0.2 },
          "50%": { transform: "scale(1.15)", opacity: 0.4 },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
