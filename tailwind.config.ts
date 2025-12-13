import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-dark': '#252423',
        'accent-primary': '#ff4b4b', // Warm Red
        'accent-secondary': '#ffa828', // Warm Orange
        'accent-tertiary': '#c678dd', // Warm Purple
        'accent-red': '#ff4b4b', // Kept for backward compatibility if needed, but primary is preferred
        'accent-orange': '#ffa828',
        'accent-green': '#6aff65', // Keeping for now to avoid breaking existing components immediately, will be phased out or used sparingly
        'accent-cyan': '#05dbe9',  // Keeping for now
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      fontFamily: {
        sans: ['var(--font-poppins)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
