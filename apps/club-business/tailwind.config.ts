import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
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
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
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
        // Palette 600415 shade scales
        iris: {
          50: "#F9F7FD",
          100: "#EEE7F9",
          200: "#DCCFF3",
          300: "#C5AFEB",
          400: "#A887E1",
          500: "#895CD7",
          600: "#6931C9",
          700: "#5427A1",
          800: "#3F1E78",
          900: "#2A1450",
          950: "#150A28",
        },
        indigo: {
          50: "#F9F7FD",
          100: "#ECE6FA",
          200: "#DACDF5",
          300: "#C1ABEF",
          400: "#A281E7",
          500: "#7D4FDD",
          600: "#7747DC",
          700: "#5F28D2",
          800: "#4C20A8",
          900: "#39187E",
          950: "#261054",
        },
        oxblood: {
          50: "#FDF7F7",
          100: "#F9E7E7",
          200: "#F4CECE",
          300: "#EAA6A6",
          400: "#DA5C5C",
          500: "#CB2F2F",
          600: "#A32626",
          700: "#7A1C1C",
          800: "#511313",
          900: "#340C0C",
          950: "#180606",
        },
        wine: {
          50: "#FDF7FA",
          100: "#F9E7F0",
          200: "#F4CEE0",
          300: "#EAA6C6",
          400: "#DA5C98",
          500: "#CB2F79",
          600: "#A32661",
          700: "#7A1C49",
          800: "#511330",
          900: "#340C1F",
          950: "#18060F",
        },
        plum: {
          50: "#FBF9FB",
          100: "#F4ECF3",
          200: "#E5D3E2",
          300: "#D3B3CD",
          400: "#B581AC",
          500: "#9E5C93",
          600: "#7E4A75",
          700: "#74446C",
          800: "#5F3758",
          900: "#3F253B",
          950: "#20121D",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["Lato", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["Lora", "ui-serif", "Georgia", "serif"],
        mono: ["Space Mono", "ui-monospace", "monospace"],
        display: ["Mimosa", "ui-serif", "Georgia", "serif"],
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.6s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;
