const config = {
    apiUrl: 'https://api.tip.dev',
    cdnUrl: 'https://cdn.tip.dev/tipdev',
    baseUrl: 'https://tip.dev',

    tailwind: {
        theme: {
            extend: {
                fontFamily: {
                    code: ['JetBrains Mono', 'monospace'],
                },
                colors: {
          
                    "primary": "#ff7ac6",
                    "secondary": "#bf95f9",
                    "accent": "#ffb86b",
                    "neutral": "#414558",
                    "base-100": "#272935",
                    "info": "#8be8fd",
                    "success": "#52fa7c",
                    "warning": "#f1fa89",
                    "error": "#ff5757",

                }
            }
        },
        // plugins: [
        //     require("daisyui"),
        //     require('@tailwindcss/typography'),
        // ],
    }
}

module.exports = config