import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: '#2563eb',
        surface: '#111827',
        panel: '#1f2937'
      }
    }
  },
  plugins: []
} satisfies Config
