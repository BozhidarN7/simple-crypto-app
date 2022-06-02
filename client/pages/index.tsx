import Head from 'next/head';

import { getCryptocurencies } from 'services/cryptoService';

import CryptoTable from 'components/CryptoTable';
import CryptoTableRow from 'components/CryptoTableRow';

type Props = {
    cryptocurencies: any;
};

const Home = ({ cryptocurencies }: Props) => {
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
                {cryptocurencies.map((coin: any) => (
                    <CryptoTableRow key={coin.id} coin={coin} />
                ))}
            </CryptoTable>
        </div>
    );
};

export async function getStaticProps() {
    try {
        const data = await getCryptocurencies();
        return {
            props: {
                cryptocurencies: data.data,
            },
        };
    } catch (err) {
        return {
            props: {
                cryptocurencies: [],
            },
        };
    }
}

export default Home;
