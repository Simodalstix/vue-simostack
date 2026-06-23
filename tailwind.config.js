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
    // LP badge border — violet doesn't appear in committed files so JIT misses it
    'border-violet-500/40',
  ],
  theme: {
    extend: {
      // Obsidian design uses low alphas (0.08–0.18) for hairline borders that
      // aren't in Tailwind's default opacity scale. Without these, the slash
      // modifier generates no class and borders fall back to currentColor.
      opacity: {
        8: '0.08',
        14: '0.14',
        16: '0.16',
        18: '0.18',
        45: '0.45',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        // Obsidian theme (Home / About / Projects). Scoped via the App.vue
        // wrapper so Prep/Clearance keep their existing fonts.
        display: ['Archivo', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        // Obsidian palette (design_handoff_portfolio). Single source of truth
        // for the warm-brown theme; reskins happen here.
        ob: {
          bg: '#16120B',
          surface: '#1E1810',
          surface2: '#241D13',
          text: '#F0E7D7',
          bright: '#F4ECDD',
          muted: '#CDBFA6',
          muted2: '#D8CCB4',
          dim: '#9E927C',
          faint: '#8A7B62',
          soft: '#B8A98F',
          sand: '#DDC29A',
          bronze: '#BC9163',
          teal: '#4A8B7F',
          'teal-bright': '#6FB3A6',
        },
      },
    },
  },
  plugins: [],
}
