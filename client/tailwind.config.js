module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            gridTemplateColumns: {
                'crypto-table-row': 'repeat(9, minmax(auto, 1fr))',
            },
        },
    },
    plugins: [],
};
