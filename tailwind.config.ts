import type { Config } from 'tailwindcss';

// Hexagon Brand Guidelines — colours sourced verbatim from brand palette docs.
const config: Config = {
  darkMode: 'class',
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        hexagon: {
          // Primary
          sky: '#01ADFF',
          skyDark: '#005198',
          land: '#83C410',
          landDark: '#28721E',
          sea: '#04D0E6',
          seaDark: '#106B73',
          // Accents
          accentSky: '#99D6FF',
          accentLand: '#DFF73F',
          accentSea: '#7DFFFC',
          // Backgrounds
          white: '#FFFFFF',
          coolGrey1: '#E7E8E9',
          darkBlue: '#00284C',
          // Neutrals (web/template use only)
          coolGrey4: '#B9B9BD',
          coolGrey9: '#71737B',
          coolGrey11: '#41454F',
          black: '#000000',
          // Special use — warnings/errors only, never decorative
          warningYellow: '#FFC505',
          errorRed: '#FA4C40',
        },
        // Semantic aliases used throughout the app
        background: '#00284C',
        surface: '#0B3358',
        surfaceMuted: '#0F3D66',
        border: '#173F63',
        primary: '#01ADFF',
        'primary-dark': '#005198',
      },
      fontFamily: {
        sans: ['var(--font-geist)', 'Inter', 'Arial', 'sans-serif'],
      },
      // Perfect-fourth (1.333) type scale, base = 16px, per Hexagon typography spec
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1.1rem' }],
        sm: ['0.9375rem', { lineHeight: '1.35rem' }],
        base: ['1rem', { lineHeight: '1.5rem' }],
        lg: ['1.333rem', { lineHeight: '1.8rem' }],
        xl: ['1.777rem', { lineHeight: '2.2rem' }],
        '2xl': ['2.369rem', { lineHeight: '2.8rem' }],
        '3xl': ['3.157rem', { lineHeight: '3.6rem' }],
      },
      borderRadius: {
        lg: '0.75rem',
        md: '0.5rem',
        sm: '0.375rem',
      },
      boxShadow: {
        panel: '0 1px 2px rgba(0,0,0,0.24), 0 8px 24px rgba(0,0,0,0.28)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
