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
        // Portfolio theme (Home / About / Projects). Scoped via the App.vue
        // wrapper so Prep/Clearance keep their existing fonts.
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
        display: ['"DM Sans"', 'system-ui', 'sans-serif'],
        // The `mono` key is the technical-label face (uppercase, wide tracking),
        // not actually monospace. Space Grotesk per the design handoff.
        mono: ['"Space Grotesk"', 'ui-sans-serif', 'sans-serif'],
      },
      colors: {
        // Portfolio palette (design_handoff_portfolio). Single source of truth
        // for the theme; reskins happen here. Near-black canvas with dual
        // accents: amber (sand/bronze) for identity/section-numbers/in-progress,
        // teal for live-status/CTAs/nav-underline.
        ob: {
          bg: '#111418',
          surface: '#181C21',
          surface2: '#14181C',
          text: '#F5F2EC',
          bright: '#FAF8F3',
          muted: '#94A4B2',
          muted2: '#A6B4C0',
          dim: '#7A8A99',
          faint: '#66757F',
          soft: '#8A98A6',
          sand: '#D4903A',
          bronze: '#D4903A',
          teal: '#3DB8A0',
          'teal-bright': '#4FCBB3',
          ink: '#0C0F12',
        },
      },
    },
  },
  plugins: [],
}
