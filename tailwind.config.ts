import type { Config } from "tailwindcss"

const config = {
  darkMode: "class",
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)"],
        mono: ["var(--font-geist-mono)"],
        serif: ["var(--font-cinzel)"],
      },
      colors: {
        border: '#284B28',
        input: '#284B28',
        ring: '#FFD700',
        background: '#0D1A0D',
        foreground: '#EAE8D8',
        primary: {
          DEFAULT: '#FFD700',
          foreground: '#0D1A0D',
        },
        secondary: {
          DEFAULT: '#800000',
          foreground: '#EAE8D8',
        },
        destructive: {
          DEFAULT: '#A52A2A',
          foreground: '#EAE8D8',
        },
        muted: {
          DEFAULT: '#284B28',
          foreground: '#9E9D8F', // Muted version of foreground
        },
        accent: {
          DEFAULT: '#F0E68C',
          foreground: '#0D1A0D',
        },
        popover: {
          DEFAULT: '#0D1A0D',
          foreground: '#EAE8D8',
        },
        card: {
          DEFAULT: '#142514',
          foreground: '#EAE8D8',
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
