/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  safelist: [
    // Card base (in template literal so should be fine, but belt-and-braces)
    'bg-slate-700/80', 'from-slate-700', 'to-slate-800',
    // AWS card hover (cyan)
    'hover:bg-cyan-900/40', 'hover:border-cyan-500/70', 'hover:shadow-cyan-500/25',
    'group-hover:text-cyan-100',
    // Azure card hover
    'hover:bg-indigo-900/60', 'hover:border-indigo-500/60', 'hover:shadow-indigo-500/20',
    // Neutral card hover
    'hover:bg-zinc-700/60', 'hover:border-slate-400/60', 'hover:shadow-zinc-500/10',
    // Shared hover
    'hover:shadow-lg',
    // Title hover colours
    'group-hover:text-cyan-100', 'group-hover:text-indigo-100', 'group-hover:text-slate-100',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
