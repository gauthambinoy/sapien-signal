import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#1F1E1C",
        surface: "rgba(45, 42, 36, 0.85)",
        border: "rgba(245,240,232,0.09)",
        accent: "#D97757",
        "accent-blue": "#B8A88A",
        "accent-purple": "#C49C8A",
        "accent-cyan": "#D9A574",
        "accent-pink": "#B87B6A",
        paper: {
          50: "#FAF9F5",
          100: "#F5F0E8",
          200: "#EDE6D6",
          300: "#E0D7C2",
        },
        cocoa: {
          900: "#1F1E1C",
          800: "#25241F",
          700: "#2C2B26",
          600: "#3A3630",
        },
        terracotta: {
          400: "#D97757",
          500: "#C96442",
          600: "#B05537",
        },
        aurora: {
          green: "#C96442",
          cyan: "#D9A574",
          blue: "#B8A88A",
          purple: "#C49C8A",
          pink: "#B87B6A",
        },
        neon: {
          cyan: "#D9A574",
          green: "#C96442",
          pink: "#B87B6A",
          purple: "#C49C8A",
        },
        glass: {
          light: "rgba(245, 240, 232, 0.06)",
          medium: "rgba(245, 240, 232, 0.10)",
          heavy: "rgba(245, 240, 232, 0.15)",
          border: "rgba(245, 240, 232, 0.09)",
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', '"Inter"', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'sans-serif'],
        serif: ['var(--font-serif)', '"Source Serif 4"', '"Source Serif Pro"', 'Georgia', '"Times New Roman"', 'serif'],
        mono: ['var(--font-mono)', '"DM Mono"', 'ui-monospace', '"Fira Code"', 'monospace'],
      },
      borderRadius: {
        "2xl": "16px",
        "3xl": "20px",
        "4xl": "24px",
      },
      backdropBlur: {
        xs: "2px",
        "2xl": "40px",
        "3xl": "64px",
      },
      boxShadow: {
        glow: "0 0 20px rgba(201, 100, 66, 0.15)",
        "glow-md": "0 0 30px rgba(201, 100, 66, 0.25)",
        "glow-lg": "0 0 50px rgba(201, 100, 66, 0.35)",
        "glow-cyan": "0 0 30px rgba(217, 165, 116, 0.25)",
        "glow-purple": "0 0 30px rgba(196, 156, 138, 0.25)",
        aurora: "0 0 20px rgba(201, 100, 66,0.2), 0 0 40px rgba(184, 168, 138,0.15), 0 0 60px rgba(196, 156, 138,0.1)",
        "glass-sm": "0 2px 16px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
        "glass-md": "0 4px 30px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.08)",
        "glass-lg": "0 8px 40px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        auroraGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(201, 100, 66,0.2)" },
          "33%": { boxShadow: "0 0 30px rgba(184, 168, 138,0.3)" },
          "66%": { boxShadow: "0 0 25px rgba(196, 156, 138,0.25)" },
        },
        auroraShift: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
        rotateBorder: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        pulseRing: {
          "0%": { transform: "scale(1)", opacity: "0.6" },
          "100%": { transform: "scale(2.5)", opacity: "0" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        waveShimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        glowPulse: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        blink: "blink 1s step-start infinite",
        "aurora-glow": "auroraGlow 4s ease-in-out infinite",
        "aurora-shift": "auroraShift 6s ease-in-out infinite",
        float: "float 4s ease-in-out infinite",
        "float-slow": "float 6s ease-in-out infinite",
        "rotate-border": "rotateBorder 3s linear infinite",
        "pulse-ring": "pulseRing 2s ease-out infinite",
        "slide-up": "slideUp 0.6s ease-out forwards",
        "wave-shimmer": "waveShimmer 2s linear infinite",
        "glow-pulse": "glowPulse 2s ease-in-out infinite",
      },
      transitionTimingFunction: {
        "out-back": "cubic-bezier(0.34, 1.56, 0.64, 1)",
        premium: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
