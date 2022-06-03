import { useEffect, useState } from 'react';

import { getCryptocurrencies } from 'services/cryptoService';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { cryptocurrenciesAdded } from 'features/cryptocurrenciesSlice';

const useFetchCrypto = (pageNumber: number) => {
    const dispatch = useAppDispatch();

    const newCryptocurrencies = useAppSelector(
        (state) => state.cryptocurrencies.cryptocurrencies
    );

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        if (pageNumber === 0) {
            return;
        }
        (async () => {
            try {
                setLoading(true);
                setError(false);
                const data = await getCryptocurrencies(pageNumber);
                dispatch(cryptocurrenciesAdded(data.data));
                setLoading(false);
                setHasMore(data.status.total_count > pageNumber * 10);
            } catch (err) {
                console.log(err);
                setError(true);
                setLoading(false);
            }
        })();
    }, [pageNumber]);

    return { newCryptocurrencies, loading, error, hasMore };
};

export default useFetchCrypto;
