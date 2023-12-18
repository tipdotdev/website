/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './comps/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--gradient-color-stops))',
      },
      fontFamily: {
        code: ['JetBrains Mono', 'monospace'],
      },
      dropShadow: {
        glow: [
          "0 0px 10px rgba(0,0, 0, 0.35)",
          "0 0px 20px rgba(0,0, 0, 0.35)",
          "0 0px 30px rgba(0, 0,0, 0.35)",
          "0 0px 40px rgba(0, 0,0, 0.35)",
          "0 0px 50px rgba(0, 0,0, 0.35)"
        ]
      },
      keyframes: {
        blob: {
          // make the blob rotate 360 degrees
          '0%, 100%': { transform: 'rotate(0deg)' },
          '50%': { transform: 'rotate(360deg)' },
        },
        nod: {
          '0%, 50%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(20deg)' },
          '75%': { transform: 'rotate(-10deg)' },
        }
      },
      animation: {
        blob: 'blob 20s infinite',
        nod: 'nod 2s infinite',
      },
      aspectRatio: {
        "banner": "16/3",
      },
      colors: {
        "gold": "#fdd111",
        "gold-active": "#caa70d"
      }
    },
  },
  plugins: [
    require("daisyui"),
    require('@tailwindcss/typography'),
    require("@igorkowalczyk/is-browser"),
  ],

  daisyui: {
    themes: [
      // "light",
      // "dark",
      // "cupcake",
      // "bumblebee",
      // "emerald",
      // "corporate",
      // "synthwave",
      // "retro",
      // "cyberpunk",
      // "valentine",
      // "halloween",
      // "garden",
      // "forest",
      // "aqua",
      // "lofi",
      // "pastel",
      // "fantasy",
      // "wireframe",
      // "black",
      // "luxury",
      "dracula",
      // "cmyk",
      // "autumn",
      // "business",
      // "acid",
      // "lemonade",
      // "night",
      // "coffee",
      // "winter",
    ],
  }
}