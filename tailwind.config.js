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
            gridTemplateColumns: {
                'list': 'repeat(auto-fill,minmax(min(15rem,100%),1fr))',
            }
        },
    },
    plugins: [
        require('@tailwindcss/container-queries')
    ],
}