/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
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
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#0d78f2",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#00b2ff",
          foreground: "#ffffff",
        },
        accent: {
          DEFAULT: "#09f6b7",
          foreground: "#023125",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        "oxford-navy": {
          50: "#e7f1fe",
          100: "#cfe4fc",
          200: "#9ec9fa",
          300: "#6eaef7",
          400: "#3d93f5",
          500: "#0d78f2",
          600: "#0a60c2",
          700: "#084891",
          800: "#053061",
          900: "#031830",
          950: "#021122"
        },
        "yale-blue": {
          50: "#e5f7ff",
          100: "#ccf0ff",
          200: "#99e0ff",
          300: "#66d1ff",
          400: "#33c2ff",
          500: "#00b2ff",
          600: "#008fcc",
          700: "#006b99",
          800: "#004766",
          900: "#002433",
          950: "#001924"
        },
        "seaweed": {
          50: "#e6fef8",
          100: "#cefdf1",
          200: "#9dfbe2",
          300: "#6bfad4",
          400: "#3af8c5",
          500: "#09f6b7",
          600: "#07c592",
          700: "#05946e",
          800: "#046249",
          900: "#023125",
          950: "#01221a"
        },
        "golden-sand": {
          50: "#f9f7ec",
          100: "#f3eed8",
          200: "#e7deb1",
          300: "#dacd8b",
          400: "#cebc64",
          500: "#c2ac3d",
          600: "#9b8931",
          700: "#746725",
          800: "#4e4518",
          900: "#27220c",
          950: "#1b1809"
        },
        "golden-orange": {
          50: "#fef6e6",
          100: "#fdedce",
          200: "#fcdc9c",
          300: "#faca6b",
          400: "#f9b939",
          500: "#f7a708",
          600: "#c68606",
          700: "#946405",
          800: "#634303",
          900: "#312102",
          950: "#231701"
        }
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
}
