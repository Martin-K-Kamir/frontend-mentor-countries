/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                shark: {
                    '50': 'hsl(197, 37%, 96%)',
                    '100': 'hsl(196, 31%, 90%)',
                    '200': 'hsl(197, 31%, 82%)',
                    '300': 'hsl(198, 30%, 69%)',
                    '400': 'hsl(198, 28%, 53%)',
                    '500': 'hsl(198, 30%, 43%)',
                    '600': 'hsl(203, 30%, 36%)',
                    '700': 'hsl(203, 27%, 31%)',
                    '800': 'hsl(204, 23%, 27%)',
                    '900': 'hsl(209, 23%, 22%)',
                    '950': 'hsl(207, 26%, 17%)',
                },

            },
            screens: {
                'xs': '30em', // 480px
                'sm': '40em', // 640px
                'md': '48em', // 768px
                'lg': '64em', // 1024px
                'xl': '80em', // 1280px
                '2xl': '96em', // 1536px
            },
        },
    },
    plugins: [
        require('@tailwindcss/container-queries')
    ],
}