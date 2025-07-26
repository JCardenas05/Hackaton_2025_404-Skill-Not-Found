/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],                         // 1️⃣  modo oscuro por clase
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      sans: ['"SF Pro"', 'Inter', 'sans-serif'],
      mono: ['"SF Mono"', 'Menlo', 'monospace'],
    },
    extend: {
      borderRadius: {
        lg: 'var(--radius)',                  // 16 px por defecto
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      boxShadow: {
        kpi: '0 6px 18px rgba(0,0,0,.06)',    // sombra suave para tarjetas
      },
      colors: {
        /* superficies */
        background: 'hsl(var(--bg) / <alpha-value>)',
        card:       'hsl(var(--card) / <alpha-value>)',
        foreground: 'hsl(var(--fg) / <alpha-value>)',

        /* acento naranja corporativo */
        primary: {
          DEFAULT:    'hsl(var(--primary) / <alpha-value>)',
          foreground: 'hsl(var(--primary-fg) / <alpha-value>)',
        },

        /* secundarios */
        secondary: {
          DEFAULT:    'hsl(var(--secondary) / <alpha-value>)',
          foreground: 'hsl(var(--secondary-fg) / <alpha-value>)',
        },
        muted: {
          DEFAULT:    'hsl(var(--muted) / <alpha-value>)',
          foreground: 'hsl(var(--muted-fg) / <alpha-value>)',
        },

        /* utilitarios */
        border: 'hsl(var(--border) / <alpha-value>)',
        ring:   'hsl(var(--ring) / <alpha-value>)',

        /* paleta para gráficos (TOP 5) */
        chart: {
          1: 'hsl(var(--chart-1) / <alpha-value>)',
          2: 'hsl(var(--chart-2) / <alpha-value>)',
          3: 'hsl(var(--chart-3) / <alpha-value>)',
          4: 'hsl(var(--chart-4) / <alpha-value>)',
          5: 'hsl(var(--chart-5) / <alpha-value>)',
        },
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    require('@tailwindcss/typography'),
  ],
};
