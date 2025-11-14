import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        yellow: {
          50: '#FEFCE8',
          100: '#FEF9C3',
          200: '#FEF08A',
          300: '#FDE047',
          400: '#FCD34D', // ADONIS brand yellow
          500: '#FCD34D', // Keep consistent
          600: '#F59E0B',
          700: '#D97706',
          800: '#B45309',
          900: '#92400E',
          950: '#78350F',
        }
      },
    },
  },
  plugins: [],
};
export default config;
