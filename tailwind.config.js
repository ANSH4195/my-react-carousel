/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            animation: {
                'fade-up': 'fadeUp 400ms ease forwards',
                'fade-left': 'fadeLeft 400ms ease backwards'
            },
            keyframes: {
                fadeUp: {
                    "0%": {
                        opacity: 0,
                        "transform": "translateY(10px)"
                    },
                    "100%": {
                        opacity: 1,
                        "transform": "translateY(0)"
                    }
                },
                fadeLeft: {
                    "0%": {
                        opacity: 0.5,
                        "transform": "translateX(2rem)"
                    },
                    "100%": {
                        opacity: 1,
                        "transform": "translateX(0)"
                    }
                },
            }
        },
    },
    plugins: [],
}

