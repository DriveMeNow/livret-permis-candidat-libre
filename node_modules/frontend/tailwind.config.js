/** @type {import('tailwindcss').Config} */
export default {
    content: [
      './index.html',
      './src/**/*.{js,ts,jsx,tsx}',
    ],
theme : {
    extend: {
        colors: {
            brand: {
                light: "#FCEEDC",
                DEFAULT: "#F7C06C",
                dark: "#E69B3C",
            },
        },
    },
}
}