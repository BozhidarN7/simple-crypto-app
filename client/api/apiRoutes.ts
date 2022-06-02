export const baseUrl = 'http://localhost:5000';

const cryptocurencies = {
    getCryptocurrenciesURL: (pageNumber: number) =>
        `${baseUrl}/cryptocurencies?limit=${pageNumber * 10}`,
};

const routes = {
    ...cryptocurencies,
};

export default routes;
