import Head from 'next/head';
import { useRef, useCallback, useState, useEffect } from 'react';

import { getCryptocurrencies } from 'services/cryptoService';
import { useAppDispatch } from 'app/hooks';
import { cryptocurrenciesAdded } from 'features/cryptocurrenciesSlice';
import CryptoTable from 'components/CryptoTable';
import CryptoTableRow from 'components/CryptoTableRow';
import useFetchCrypto from 'hooks/useFetchCrypto';
import LoadMoreCoins from 'components/LoadMoreCoints';

type Props = {
    cryptocurrencies: any;
};

const Home = ({ cryptocurrencies }: Props) => {
    const dispatch = useAppDispatch();
    const [pageNumber, setPageNumber] = useState(0);

    const { newCryptocurrencies, hasMore, loading, error } =
        useFetchCrypto(pageNumber);

    const observer = useRef<IntersectionObserver>();
    const lastCryptoTableRowRef = useCallback(
        (node: HTMLDivElement) => {
            if (loading) return;
            if (observer.current) observer.current.disconnect();

            observer.current = new IntersectionObserver(
                (entries) => {
                    if (entries[0].isIntersecting && hasMore) {
                        setPageNumber((prev) => prev + 1);
                    }
                },
                { rootMargin: '0px' }
            );

            if (node) observer.current.observe(node);
        },
        [loading, hasMore]
    );

    useEffect(() => {
        dispatch(cryptocurrenciesAdded(cryptocurrencies));
    }, []);

    if (!cryptocurrencies)
        return (
            <div className="flex min-h-screen flex-col items-center py-2">
                <Head>
                    <title>Crypto app</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>

                <h1 className="w-10/12 text-3xl font-bold mb-10">
                    Today's Cryptocurrency Prices by Market Cap
                </h1>
                <p className="text-xl w-10/12">
                    Something went wrong trying to get data. Please try again
                    later.
                </p>
            </div>
        );

    return (
        <div className="flex min-h-screen flex-col items-center py-2">
            <Head>
                <title>Crypto app</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <h1 className="w-10/12 text-3xl font-bold mb-10">
                Today's Cryptocurrency Prices by Market Cap
            </h1>
            <CryptoTable>
                {pageNumber === 0 ? (
                    cryptocurrencies.map((coin: any, index: number) => {
                        if (index === cryptocurrencies.length - 1) {
                            return (
                                <CryptoTableRow
                                    key={coin.id}
                                    coin={coin}
                                    lastCryptoTableRowRef={
                                        lastCryptoTableRowRef
                                    }
                                />
                            );
                        }
                        return (
                            <CryptoTableRow
                                key={coin.id}
                                coin={coin}
                                lastCryptoTableRowRef={null}
                            />
                        );
                    })
                ) : (
                    <LoadMoreCoins
                        newCryptocurrencies={newCryptocurrencies}
                        lastCryptoTableRowRef={lastCryptoTableRowRef}
                        loading={loading}
                    />
                )}
            </CryptoTable>
        </div>
    );
};

export async function getStaticProps() {
    try {
        const pageNumber = 0;
        const data = await getCryptocurrencies(pageNumber);

        return {
            props: {
                cryptocurrencies: data.data ? data.data : null,
            },
        };
    } catch (err) {
        return {
            props: {
                cryptocurrencies: [],
            },
        };
    }
}

export default Home;
