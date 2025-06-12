/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        roobert: ['"Roobert"', "sans-serif"],
      },
      colors: {
         eerie: {
          DEFAULT: '#1A1B1C',           
          60: 'rgba(26, 27, 28, 0.6)',  
          40: 'rgba(26, 27, 28, 0.4)', 
        },
        bluegray: {
          DEFAULT: '#A0A4AB',
          60: 'rgba(160, 164, 171, 0.6)',
          40: 'rgba(160, 164, 171, 0.4)',
        },
        lotion: {
          DEFAULT: "#FCFCFC",
          hover: "#E1E1E2",
        },
        antiflash: {
          DEFAULT: "#F3F3F4",
        },
      },
       keyframes: {
        dotFlash: {
          '0%': { opacity: '0.2', transform: 'scale(1)' },
          '100%': { opacity: '1', transform: 'scale(1.3)' },
        },
        rotateClockwise: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        rotateCounterClockwise: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(-360deg)' },
        },
      },
      animation: {
        dotFlash: 'dotFlash 1s infinite alternate',
        spinSlow: 'rotateClockwise 20s linear infinite',
        spinSlowReverse: 'rotateCounterClockwise 20s linear infinite',
      },
    },
  },
  plugins: [],
};
