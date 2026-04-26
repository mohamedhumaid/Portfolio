import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        heading: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
      },
      colors: {
        // Override violet → cobalt blue palette
        violet: {
          300: "#7ab0e8",
          400: "#4d8fe0",
          500: "#0047AB",
          600: "#003d96",
          700: "#002d70",
          800: "#001f4d",
          900: "#001033",
          950: "#00081a",
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "spin-slow": "spin 30s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-16px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
