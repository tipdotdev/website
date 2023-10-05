/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './comps/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
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
        }
      },
      animation: {
        blob: 'blob 20s infinite',
      },
      aspectRatio: {
        "banner": "16/3",
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