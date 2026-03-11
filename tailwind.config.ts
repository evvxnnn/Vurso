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
