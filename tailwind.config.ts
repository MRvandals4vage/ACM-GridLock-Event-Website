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
                primary: "#00E5FF",
                secondary: "#FF1744",
                accent: "#FF9100",
                "background-light": "#0B0F1A",
                "background-dark": "#05070D",
                "surface-dark": "#161B2E",
                background: "var(--background)",
                foreground: "var(--foreground)",
            },
            fontFamily: {
                display: ['Orbitron', 'sans-serif'],
                body: ['Rajdhani', 'sans-serif'],
            },
            animation: {
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'glitch': 'glitch 1s infinite linear alternate-reverse',
            },
        },
    },
    plugins: [],
};
export default config;
