/**
 * Typography system
 *
 * Three roles, never mixed arbitrarily:
 *   display (Space Grotesk) — headings and the hero name
 *   sans    (Inter)         — everything you actually read
 *   mono    (JetBrains Mono)— eyebrows, metadata, tech chips, numbers
 *
 * The scale is deliberately compact: a recruiter scanning this page should see
 * as much as possible without scrolling. Sizes come in pairs (size, leading)
 * so line-height can never drift per component.
 */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk Variable"', "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ['"Inter Variable"', "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono Variable"', "ui-monospace", "SFMono-Regular", "monospace"],
      },
      fontSize: {
        // label / metadata
        "2xs": ["0.6875rem", { lineHeight: "1rem", letterSpacing: "0.08em" }], // 11px
        xs: ["0.75rem", { lineHeight: "1.125rem", letterSpacing: "0.06em" }], // 12px
        sm: ["0.8125rem", { lineHeight: "1.25rem" }], // 13px
        // body
        base: ["0.9375rem", { lineHeight: "1.6rem" }], // 15px
        lg: ["1rem", { lineHeight: "1.7rem" }], // 16px
        // headings
        xl: ["1.0625rem", { lineHeight: "1.5rem", letterSpacing: "-0.01em" }], // 17px
        "2xl": ["1.25rem", { lineHeight: "1.75rem", letterSpacing: "-0.015em" }], // 20px
        "3xl": ["1.5rem", { lineHeight: "2rem", letterSpacing: "-0.02em" }], // 24px
        "4xl": ["1.875rem", { lineHeight: "2.25rem", letterSpacing: "-0.025em" }], // 30px
        "5xl": ["2.5rem", { lineHeight: "2.75rem", letterSpacing: "-0.03em" }], // 40px
        "6xl": ["3.25rem", { lineHeight: "3.5rem", letterSpacing: "-0.035em" }], // 52px
      },
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
  plugins: [],
};
