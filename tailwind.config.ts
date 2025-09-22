import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        gray: {
          800: '#1f2937',
          900: '#111827',
        },
        'brand-dark': '#121212',
        'brand-secondary': '#1E1E1E',
        'brand-accent': '#FBBF24',
        'brand-text': '#E5E7EB',
        'brand-subtext': '#9CA3AF',
      },
      fontFamily: {
        'vazir-matn': ['Vazirmatn', 'sans-serif'],
      },
      boxShadow: {
        'top-lg': '0 -10px 15px -3px rgba(0, 0, 0, 0.1), 0 -4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      spacing: {
        '16': '4rem',
        '20': '5rem',
      }
    },
  },
  plugins: [],
};
export default config;
