export const baseUrl = 'http://localhost:5000';

const cryptocurencies = {
    getCryptocurrenciesURL: (pageNumber: number) =>
        `${baseUrl}/cryptocurrencies?start=${pageNumber * 10 + 1}&limit=1`,
    getCryptocurrencyLastSevenDaysPriceURL: (id: string) =>
        `${baseUrl}/cryptocurrency/${id}/market_chart/last_seven_days`,
};

const routes = {
    ...cryptocurencies,
};

export default routes;
