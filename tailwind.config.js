const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: 'rgb(var(--color-primary) / <alpha-value>)',
            },
            fontFamily: {
                'sans': ['Proxima Nova', ...defaultTheme.fontFamily.sans],
            },
            borderRadius: {
                DEFAULT: "20px"
            }
        }
    },
    plugins: [],
};
