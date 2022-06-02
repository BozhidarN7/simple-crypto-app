import Head from 'next/head';
import { useRef, useCallback, useState } from 'react';

import { getCryptocurrencies } from 'services/cryptoService';

import CryptoTable from 'components/CryptoTable';
import CryptoTableRow from 'components/CryptoTableRow';
import useFetchCrypto from 'hooks/useFetchCrypto';

type Props = {
    cryptocurrencies: any;
};

const Home = ({ cryptocurrencies }: Props) => {
    const [pageNumber, setPageNumber] = useState(1);

    const { newCryptocurrencies, hasMore, loading, error } =
        useFetchCrypto(pageNumber);

    const observer = useRef<IntersectionObserver>();
    const lastCryptoTableRowRef = useCallback(
        (node: HTMLDivElement) => {
            if (loading) return;
            if (observer.current) observer.current.disconnect();

            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    setPageNumber((prev) => prev + 1);
                }
            });

            if (node) observer.current.observe(node);
        },
        [loading, hasMore]
    );

    if (!cryptocurrencies) return;

    return (
        <div className="flex min-h-screen flex-col items-center justify-center py-2">
            <Head>
                <title>Crypto app</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <h1 className="w-10/12 text-3xl font-bold mb-10">
                Today's Cryptocurrency Prices by Market Cap
            </h1>
            <CryptoTable>
                {pageNumber === 1
                    ? cryptocurrencies.map((coin: any, index: number) => {
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
                          return <CryptoTableRow key={coin.id} coin={coin} />;
                      })
                    : newCryptocurrencies.map((coin: any, index: number) => {
                          if (index === newCryptocurrencies.length - 1) {
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
                          return <CryptoTableRow key={coin.id} coin={coin} />;
                      })}
            </CryptoTable>
        </div>
    );
};

export async function getStaticProps() {
    try {
        const pageNumber = 1;
        const data = await getCryptocurrencies(pageNumber);

        return {
            props: {
                cryptocurrencies: data.data,
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
