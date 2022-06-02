import routes from 'api/apiRoutes';
import * as requester from 'api/crud';

export const getCryptocurencies = async () => {
    return await requester.get(routes.getCryptocurenciesURL());
};
