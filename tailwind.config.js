/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        parchment: 'var(--paper)',
        paper: 'var(--paper)',
        panel: 'var(--panel)',
        card: 'var(--card)',
        ink: 'var(--ink)',
        line: 'var(--line)',
        gold: 'var(--gold)',
        green: 'var(--green)',
        accent: 'var(--accent-text)',
        muted: 'var(--muted)',
        headertext: 'var(--header-text)',
      },
      fontFamily: {
        cairo: ['var(--font-cairo)', 'Cairo', 'Segoe UI', 'Tahoma', 'sans-serif'],
        amiri: ['var(--font-amiri)', 'Amiri', 'Traditional Arabic', 'serif'],
      },
    },
  },
  plugins: [],
}
