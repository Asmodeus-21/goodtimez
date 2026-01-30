import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                // Premium brand colors
                brand: {
                    50: "#fdf4ff",
                    100: "#fae8ff",
                    200: "#f5d0fe",
                    300: "#f0abfc",
                    400: "#e879f9",
                    500: "#d946ef",
                    600: "#c026d3",
                    700: "#a21caf",
                    800: "#86198f",
                    900: "#701a75",
                    950: "#4a044e",
                },
                // Vibrant accent colors
                neon: {
                    pink: "#ff006e",
                    purple: "#8338ec",
                    blue: "#3a86ff",
                    cyan: "#06ffa5",
                    yellow: "#ffbe0b",
                    orange: "#fb5607",
                },
                // Dark mode palette
                dark: {
                    bg: "#0a0a0f",
                    surface: "#141419",
                    elevated: "#1c1c24",
                    border: "#2a2a35",
                    text: "#e4e4e7",
                    muted: "#71717a",
                },
                // Glassmorphism
                glass: {
                    light: "rgba(255, 255, 255, 0.1)",
                    medium: "rgba(255, 255, 255, 0.15)",
                    heavy: "rgba(255, 255, 255, 0.25)",
                },
            },
            fontFamily: {
                sans: ["var(--font-inter)", "system-ui", "sans-serif"],
                display: ["var(--font-outfit)", "system-ui", "sans-serif"],
            },
            fontSize: {
                "2xs": ["0.625rem", { lineHeight: "0.75rem" }],
                "3xl": ["2rem", { lineHeight: "2.25rem" }],
                "4xl": ["2.5rem", { lineHeight: "2.75rem" }],
                "5xl": ["3rem", { lineHeight: "3.25rem" }],
                "6xl": ["3.75rem", { lineHeight: "4rem" }],
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
                "gradient-premium": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                "gradient-neon": "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                "gradient-cyber": "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
                "glass-gradient": "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
            },
            backdropBlur: {
                xs: "2px",
            },
            boxShadow: {
                glass: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
                neon: "0 0 20px rgba(217, 70, 239, 0.5)",
                "neon-pink": "0 0 30px rgba(255, 0, 110, 0.6)",
                "neon-blue": "0 0 30px rgba(58, 134, 255, 0.6)",
                premium: "0 20px 60px -15px rgba(0, 0, 0, 0.3)",
            },
            animation: {
                "fade-in": "fadeIn 0.3s ease-in-out",
                "fade-out": "fadeOut 0.3s ease-in-out",
                "slide-up": "slideUp 0.4s ease-out",
                "slide-down": "slideDown 0.4s ease-out",
                "scale-in": "scaleIn 0.2s ease-out",
                shimmer: "shimmer 2s linear infinite",
                float: "float 3s ease-in-out infinite",
                pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                glow: "glow 2s ease-in-out infinite alternate",
            },
            keyframes: {
                fadeIn: {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
                fadeOut: {
                    "0%": { opacity: "1" },
                    "100%": { opacity: "0" },
                },
                slideUp: {
                    "0%": { transform: "translateY(20px)", opacity: "0" },
                    "100%": { transform: "translateY(0)", opacity: "1" },
                },
                slideDown: {
                    "0%": { transform: "translateY(-20px)", opacity: "0" },
                    "100%": { transform: "translateY(0)", opacity: "1" },
                },
                scaleIn: {
                    "0%": { transform: "scale(0.9)", opacity: "0" },
                    "100%": { transform: "scale(1)", opacity: "1" },
                },
                shimmer: {
                    "0%": { backgroundPosition: "-1000px 0" },
                    "100%": { backgroundPosition: "1000px 0" },
                },
                float: {
                    "0%, 100%": { transform: "translateY(0px)" },
                    "50%": { transform: "translateY(-20px)" },
                },
                glow: {
                    "0%": { boxShadow: "0 0 20px rgba(217, 70, 239, 0.5)" },
                    "100%": { boxShadow: "0 0 40px rgba(217, 70, 239, 0.8)" },
                },
            },
            transitionTimingFunction: {
                "bounce-in": "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
                smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
            },
        },
    },
    plugins: [],
};

export default config;
