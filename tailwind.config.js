/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: { 50: '#f5f4f0', 100: '#eceae6', 200: '#dedbd6', 300: '#cdc9c3', 400: '#b6b2ac' },
        wood: { 300: '#a8a49e', 400: '#949088', 500: '#7a7670', 600: '#5e5c58' },
        sage: { 300: '#b0c4be', 400: '#8aaea8', 500: '#6b8e8a', 600: '#527a76' },
        slate2: { 400: '#9aa0a8', 500: '#7b8087', 600: '#565a63', 700: '#3f434a' },
        terra: { 400: '#7a9e9a', 500: '#6b8e8a', 600: '#527a76' },
        ink: { 700: '#6a6660', 800: '#3a3835', 900: '#2a2825' }
      },
      fontFamily: {
        serif: ['"Instrument Serif"', 'ui-serif', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'ui-sans-serif', 'system-ui'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace']
      }
    }
  },
  plugins: []
};

