import colors from 'tailwindcss/colors'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Premium Medical Blue Theme
        primary: {
          50: '#eef8ff',
          100: '#d8eeff',
          200: '#b9e0ff',
          300: '#89cfff',
          400: '#52b4ff',
          500: '#2a91ff',
          600: '#0d6efd',
          700: '#0c5ae9',
          800: '#1149bc',
          900: '#144094',
          950: '#11285a',
        },
        // Accent Teal for Medical
        accent: {
          50: '#effefb',
          100: '#c7fff4',
          200: '#90ffea',
          300: '#51f7dc',
          400: '#1de4c9',
          500: '#05c8b0',
          600: '#00a291',
          700: '#058176',
          800: '#0a665f',
          900: '#0d544e',
          950: '#003433',
        },
        // Warm Purple for AI Highlights
        ai: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7c3aed',
          800: '#6b21a8',
          900: '#581c87',
          950: '#3b0764',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'mesh-gradient': 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 1024 1024\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cdefs%3E%3ClinearGradient id=\'a\' x1=\'0%25\' y1=\'0%25\' x2=\'100%25\' y2=\'100%25\'%3E%3Cstop offset=\'0%25\' stop-color=\'%230d6efd\' stop-opacity=\'0.05\'/%3E%3Cstop offset=\'100%25\' stop-color=\'%239333ea\' stop-opacity=\'0.05\'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill=\'url(%23a)\' width=\'1024\' height=\'1024\'/%3E%3C/svg%3E")',
      },
      animation: {
        // Entrance animations
        'fade-in': 'fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        'fade-in-up': 'fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1)',
        'fade-in-down': 'fadeInDown 1s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-up': 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-down': 'slideDown 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-in-right': 'slideInRight 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
        'scale-in': 'scaleIn 0.5s cubic-bezier(0.16, 1, 0.3, 1)',

        // Physics-based
        'bounce-soft': 'bounceSoft 2s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 4s ease-in-out infinite',
        'spring-in': 'springIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',

        // Float animations
        'float': 'float 7s ease-in-out infinite',
        'float-slow': 'float 10s ease-in-out infinite',
        'float-delayed': 'float 9s ease-in-out 1s infinite',

        // Effects
        'glow': 'glow 2s ease-in-out infinite alternate',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'aurora': 'aurora 20s ease infinite',
        'gradient-x': 'gradientX 15s ease infinite',
        'gradient-y': 'gradientY 15s ease infinite',
        'gradient-shift': 'gradientShift 8s ease infinite',

        // Rotations
        'spin-slow': 'spin 8s linear infinite',
        'spin-slower': 'spin 12s linear infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',

        // Morph
        'morph': 'morph 12s ease-in-out infinite',
        'heartbeat': 'heartbeat 1.5s ease-in-out infinite',

        // Micro-interactions
        'tilt': 'tilt 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        bounceSoft: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(2deg)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(13, 110, 253, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(147, 51, 234, 0.4)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        aurora: {
          '0%, 100%': {
            backgroundPosition: '50% 50%, 50% 50%',
          },
          '50%': {
            backgroundPosition: '350% 50%, 350% 50%',
          },
        },
        gradientX: {
          '0%, 100%': {
            backgroundSize: '200% 200%',
            backgroundPosition: 'left center',
          },
          '50%': {
            backgroundSize: '200% 200%',
            backgroundPosition: 'right center',
          },
        },
        gradientY: {
          '0%, 100%': {
            backgroundSize: '400% 400%',
            backgroundPosition: 'center top',
          },
          '50%': {
            backgroundSize: '400% 400%',
            backgroundPosition: 'center bottom',
          },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(13, 110, 253, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(124, 58, 237, 0.5)' },
        },
        springIn: {
          '0%': { transform: 'scale(0.8)' },
          '50%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1)' },
        },
        tilt: {
          '0%': { transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)' },
          '100%': { transform: 'perspective(1000px) rotateX(2deg) rotateY(-2deg)' },
        },
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '14%': { transform: 'scale(1.1)' },
          '28%': { transform: 'scale(1)' },
          '42%': { transform: 'scale(1.1)' },
          '70%': { transform: 'scale(1)' },
        },
        morph: {
          '0%, 100%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
          '25%': { borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%' },
          '50%': { borderRadius: '50% 60% 30% 60% / 30% 60% 70% 40%' },
          '75%': { borderRadius: '60% 40% 60% 30% / 70% 30% 50% 60%' },
        },
      },
      boxShadow: {
        // Glow effects
        'glow-sm': '0 0 15px -3px rgba(13, 110, 253, 0.3)',
        'glow': '0 0 25px -5px rgba(13, 110, 253, 0.4)',
        'glow-lg': '0 0 50px -12px rgba(13, 110, 253, 0.5)',
        'glow-xl': '0 0 80px -15px rgba(13, 110, 253, 0.6)',
        'glow-purple': '0 0 25px -5px rgba(147, 51, 234, 0.4)',
        'glow-purple-lg': '0 0 50px -10px rgba(147, 51, 234, 0.5)',
        'glow-teal': '0 0 25px -5px rgba(5, 200, 176, 0.4)',
        'glow-emerald': '0 0 25px -5px rgba(16, 185, 129, 0.4)',

        // Inner effects
        'inner-glow': 'inset 0 2px 20px 0 rgba(13, 110, 253, 0.1)',
        'inner-glow-lg': 'inset 0 4px 30px 0 rgba(13, 110, 253, 0.15)',

        // Glass effects
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
        'glass-lg': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        'glass-xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',

        // Elevated
        'elevated': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
        'elevated-lg': '0 25px 40px -8px rgba(0, 0, 0, 0.12), 0 10px 15px -8px rgba(0, 0, 0, 0.08)',

        // Card
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(0, 0, 0, 0.02)',
        'card-hover': '0 8px 16px -4px rgba(0, 0, 0, 0.08), 0 4px 8px -4px rgba(0, 0, 0, 0.06)',
      },
      backdropBlur: {
        xs: '2px',
      },
      transitionTimingFunction: {
        'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      scale: {
        '102': '1.02',
        '103': '1.03',
      },
    },
  },
  plugins: [],
}
