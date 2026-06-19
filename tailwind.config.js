/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        forest: '#0D1F12',
        green: {
          DEFAULT: '#007925',
          hover: '#006A20',
          press: '#014C1B',
          bright: '#39B54A',
        },
        sage: {
          50: '#EAF3EE',
          100: '#D7E8DD',
          200: '#B6D0C0',
        },
        cream: '#F5F5F5',
        paper: '#FFFFFF',
        ink: '#0D1F12',
        muted: '#4A5E50',
        faint: '#7A8C82',
        gold: '#FCBD16',
        danger: '#B43A2B',
        success: '#0E7A3A',
      },
      fontFamily: {
        display: ['"Schibsted Grotesk"', 'system-ui', 'sans-serif'],
        body: ['"Hanken Grotesk"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"Space Mono"', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        sm: '10px',
        md: '16px',
        lg: '22px',
        xl: '28px',
        pill: '999px',
      },
      boxShadow: {
        sm: '0 2px 8px rgba(13,31,18,0.06)',
        md: '0 10px 30px rgba(13,31,18,0.08)',
        lg: '0 22px 55px rgba(13,31,18,0.12)',
        cta: '0 8px 22px rgba(0,121,37,0.24)',
        'cta-h': '0 12px 30px rgba(0,121,37,0.32)',
      },
      transitionTimingFunction: {
        site: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      transitionDuration: {
        site: '420ms',
      },
      maxWidth: {
        site: '1440px',
        wide: '1640px',
        wider: '1760px',
      },
      keyframes: {
        pulse: {
          '0%, 100%': { opacity: 1, transform: 'scale(1)' },
          '50%': { opacity: 0.5, transform: 'scale(0.85)' },
        },
      },
      animation: {
        pulse: 'pulse 2s cubic-bezier(0.16,1,0.3,1) infinite',
      },
      backgroundImage: {
        'grad-hero': 'linear-gradient(150deg, #0D1F12 0%, #11331C 45%, #0B4A22 100%)',
        'grad-logo': 'linear-gradient(135deg, #39B54A 0%, #007925 100%)',
        'grad-logo-dark': 'linear-gradient(135deg, #D7FFF3 0%, #39B54A 100%)',
      },
    },
  },
  plugins: [],
};
