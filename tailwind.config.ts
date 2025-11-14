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
          50: '#FEF9E7',
          100: '#FEF5CD',
          200: '#FDEB9B',
          300: '#FDE169',
          400: '#FCD34D', // ADONIS brand yellow
          500: '#FCD34D', // ADONIS brand yellow
          600: '#FCD34D', // ADONIS brand yellow (keep consistent)
          700: '#D4A72C',
          800: '#9C7A1F',
          900: '#6B5415',
          950: '#3D2F0B',
        }
      },
    },
  },
  plugins: [],
};
export default config;
