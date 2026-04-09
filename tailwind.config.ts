import type {Config} from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        background: '#0A0A0F',
        surface: '#111118',
        card: '#16161F',
        accent: {
          violet: '#6C63FF',
          cyan: '#00D4FF',
        },
        text: {
          primary: '#F0F0FF',
          muted: '#6B7280',
        },
        alert: {
          red: '#FF3B3B',
        },
        category: {
          ai: '#6C63FF',
          crypto: '#00D4FF',
          startups: '#10B981',
          bigtech: '#F97316',
          marketing: '#EC4899',
        },
        border: '#1E1E28',
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "1rem",
        "2xl": "1.5rem",
        "full": "9999px"
      },
      fontFamily: {
        headline: ["Playfair Display", "serif"],
        body: ["Inter", "sans-serif"],
        label: ["Inter", "sans-serif"]
      },
      fontSize: {
        'hero': ['56px', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'section': ['24px', { lineHeight: '1.3', fontWeight: '600' }],
        'card-title': ['18px', { lineHeight: '1.4', fontWeight: '500' }],
        'body-base': ['14px', { lineHeight: '1.6', fontWeight: '400' }],
        'meta': ['12px', { fontWeight: '400' }],
      },
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(1)', opacity: '1', boxShadow: '0 0 0 0 rgba(255, 59, 59, 0.7)' },
          '70%': { transform: 'scale(1.1)', opacity: '0.8', boxShadow: '0 0 0 10px rgba(255, 59, 59, 0)' },
          '100%': { transform: 'scale(1)', opacity: '1', boxShadow: '0 0 0 0 rgba(255, 59, 59, 0)' },
        },
        'scroll-x': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        }
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
        'shimmer': 'shimmer 3s infinite linear',
        'pulse-ring': 'pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scroll-x': 'scroll-x 20s linear infinite',
      }
    },
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/forms'), require('@tailwindcss/container-queries')],
} satisfies Config;
