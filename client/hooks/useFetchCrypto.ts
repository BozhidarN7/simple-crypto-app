import { useEffect, useState } from 'react';

import { getCryptocurrencies } from 'services/cryptoService';

const useFetchCrypto = (pageNumber: number) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [newCryptocurrencies, setNewCryptocurrencies] = useState<any>();
    const [hasMore, setHasMore] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                setError(false);

                const data = await getCryptocurrencies(pageNumber);
                setNewCryptocurrencies(data.data);
                setLoading(false);
                setHasMore(data.status.total_count > pageNumber * 10);
            } catch (err) {
                console.log(err);
                setError(true);
            }
        })();
    }, [pageNumber]);

    return { loading, error, newCryptocurrencies, hasMore };
};

export default useFetchCrypto;
