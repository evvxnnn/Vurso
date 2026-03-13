import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        'primary-navy': '#0A2540',
        'accent-purple': '#6D28D9',
        'accent-purple-light': '#8B5CF6',
        'light-purple': '#F3E8FF',
        'light-gray': '#F8FAFC',
        'dark-gray': '#64748B',
        // ABH demo colors
        rose: {
          DEFAULT: '#b8898a',
          dark: '#9a7071',
          light: '#d4a9aa',
        },
        blush: '#fdf5f5',
        charcoal: '#2d2424',
        cream: '#fffaf9',
        gold: '#c9a96e',
        // Bynums demo colors
        'bn-bg': '#faf6f1',
        'bn-bg-alt': '#f0ebe4',
        'bn-text': '#2c1810',
        'bn-text-mid': '#6b5544',
        'bn-text-light': '#9a8a7a',
        'bn-red': {
          DEFAULT: '#c41e2a',
          dark: '#a01820',
          light: '#e8545d',
        },
        'bn-gold': {
          DEFAULT: '#b9a65c',
          dark: '#9a8340',
          light: '#d4c48a',
        },
        'bn-card': '#ffffff',
        'bn-border': '#e5ded4',
      },
      fontFamily: {
        sans: ['var(--font-geist)', 'system-ui', 'sans-serif'],
        script: ['var(--font-allura)', 'cursive'],
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}

export default config
