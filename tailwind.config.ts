import type { Config } from "tailwindcss";

// All brand colors live here in one place.
// If the owner ever wants to tweak the palette, this is the only file to touch.
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        obsidian: "#08090D", // primary background
        "night-blue": "#172A46", // secondary / cards / gradients
        violet: {
          DEFAULT: "#7C3AED", // accent / CTAs / active states
          light: "#9B65F0",
          dark: "#5B21B6",
        },
        ink: "#18181B", // dark gray, neutral surfaces
        mist: "#A1A1AA", // light gray, secondary text
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        "violet-glow":
          "radial-gradient(circle at 50% 0%, rgba(124,58,237,0.25), transparent 60%)",
        "night-gradient":
          "linear-gradient(180deg, #08090D 0%, #10131C 50%, #172A46 100%)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        drift: {
          "0%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
          "100%": { transform: "translateY(0px)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s ease-out both",
        "fade-in": "fade-in 0.6s ease-out both",
        drift: "drift 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
