import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#faf5f1',
        brun: {
          DEFAULT: '#4e3b2c',
          light: '#6b5545',
          dark: '#3a2b1f',
        },
        gris: '#d6d5d3',
      },
      fontFamily: {
        heading: ['var(--font-dm-serif)', 'serif'],
        sans: ['var(--font-dm-sans)', 'sans-serif'],
        artisan: ['var(--font-artisan)', 'cursive'],
      },
    },
  },
  plugins: [],
}

export default config
