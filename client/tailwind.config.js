module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            gridTemplateColumns: {
                'crypto-table': 'repeat(9, minmax(max-content, 1fr))',
            },
        },
    },
    plugins: [],
};
