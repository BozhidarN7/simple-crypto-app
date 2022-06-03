export const baseUrl = 'http://localhost:5000';

const cryptocurencies = {
    getCryptocurrenciesURL: (pageNumber: number) =>
        `${baseUrl}/cryptocurencies?start=${pageNumber * 10 + 1}&limit=10`,
};

const routes = {
    ...cryptocurencies,
};

export default routes;
