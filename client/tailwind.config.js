/** @type {import('tailwindcss').Config} */
module.exports = {
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
      backgroundImage: {

        'newsletter': "url('/newsletter-bg.jpeg')",
    
      },
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
        success: {
          DEFAULT: "hsl(var(--success))",
          bg: "hsl(var(--success-bg))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          bg: "hsl(var(--warning-bg))",
        },
        danger: {
          DEFAULT: "hsl(var(--danger))",
          bg: "hsl(var(--danger-bg))",
        },
        info: {
          DEFAULT: "hsl(var(--info))",
          bg: "hsl(var(--info-bg))",
        },
        surface: {
          DEFAULT: "hsl(var(--surface))",
          beige: "hsl(var(--surface-beige))",
        },
        "text-secondary": "hsl(var(--text-secondary))",
        "text-muted-2": "hsl(var(--text-muted-2))",
        "border-light": "hsl(var(--border-light))",
      },
      boxShadow: {
        soft: "0 1px 2px 0 rgb(23 32 27 / 0.04), 0 1px 3px 0 rgb(23 32 27 / 0.03)",
        card: "0 1px 3px 0 rgb(23 32 27 / 0.05)",
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
        "slide-cart-window": {
          from: { transform: "translateX(100%)" },
          to: { transform: "translateX(0)" },
        },
        "slide-search-window": {
          from: { transform: "translateY(100%)" },
          to: { transform: "translateY(0)" },
        },

   
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "slide-cart-window": "slide-cart-window 0.5s ease forwards",
        "slide-search-window": "slide-search-window 0.7s ease forwards",
    
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}