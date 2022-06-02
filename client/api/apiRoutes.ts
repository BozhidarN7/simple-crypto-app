export const baseUrl = 'http://localhost:5000';

const cryptocurencies = {
    getCryptocurenciesURL: () => `${baseUrl}/cryptocurencies?limit=10`,
};

const routes = {
    ...cryptocurencies,
};

export default routes;
