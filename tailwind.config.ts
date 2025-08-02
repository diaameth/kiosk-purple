import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
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
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "#F4F4F5", // gris perle
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#0D9488", // menthe foncée
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "#111827", // gris graphite
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "#F87171", // rouge pastel
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        violet: {
          50: "#ECFDFE",
          600: "#0D9488",
          700: "#0F766E",
        },
        gray: {
          100: "#F4F4F5", // fond
          900: "#111827",
        },
        green: {
          600: "#4ADE80", // vert mousse
        },
        yellow: {
          600: "#FBBF24", // saumon doux
        },
        red: {
          600: "#F87171", // rouge pastel
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
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      fontSize: {
        title: "24px",
        subtitle: "18px",
        body: "14px",
      },
      maxHeight: {
        mobile: "932px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
