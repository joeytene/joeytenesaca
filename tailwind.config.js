/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Plaster / paper off-whites — cooler & greyer, like bare studio walls
        cream: { 50: '#eeeeea', 100: '#e6e5df', 200: '#d8d7d0', 300: '#c7c6bf', 400: '#aeada6' },
        // Wood / metal-desk neutrals
        wood: { 300: '#a3a09a', 400: '#8d8a83', 500: '#73716b', 600: '#565450' },
        // Dusty grey-green (primary cool accent) — desaturated, foggy-forest
        sage: { 300: '#9fb0ab', 400: '#7d938d', 500: '#637c76', 600: '#4d635d' },
        slate2: { 400: '#969a9c', 500: '#777b7d', 600: '#54585b', 700: '#3c4044' },
        // Muted clay (rare warm accent) — the wood desk / leather bench
        terra: { 400: '#a17e64', 500: '#866850', 600: '#6c513d' },
        ink: { 700: '#65615b', 800: '#332f2c', 900: '#211f1c' }
      },
      boxShadow: {
        // Brutalist hard offset — no blur
        hard: '4px 4px 0 #211f1c',
        'hard-sm': '3px 3px 0 #211f1c',
        'hard-accent': '4px 4px 0 #4d635d'
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
