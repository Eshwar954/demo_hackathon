/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#047857", // emerald-700 (reduced saturation, minimalistic)
        "on-primary": "#ffffff",
        "primary-fixed": "#d1fae5", 
        "primary-fixed-dim": "#a7f3d0", 
        "primary-container": "#064e3b", 
        "on-primary-container": "#ffffff",
        
        "surface": "#f8fafc",
        "on-surface": "#0f172a",
        "surface-variant": "#f1f5f9",
        "on-surface-variant": "#64748b",
        
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#f8fafc",
        "surface-container": "#f1f5f9",
        "surface-container-high": "#e2e8f0",
        
        "outline": "#94a3b8",
        "outline-variant": "#e2e8f0",
        
        "error": "#ef4444",
        "on-error": "#ffffff",
        "error-container": "#fee2e2",
        "on-error-container": "#991b1b",
      },
      fontFamily: {
        "headline": ["Inter", "sans-serif"],
        "body": ["Inter", "sans-serif"],
        "label": ["Inter", "sans-serif"]
      }
    },
  },
  plugins: [],
}
