import routes from 'api/apiRoutes';
import * as requester from 'api/crud';

export const getCryptocurrencies = async (pageNumber: number) => {
    return await requester.get(routes.getCryptocurrenciesURL(pageNumber));
};

export const getCryptocurrencyLastSevenDaysPrice = async (id: string) => {
    return await requester.get(
        routes.getCryptocurrencyLastSevenDaysPriceURL(id)
    );
};
