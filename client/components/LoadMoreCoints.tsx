import CryptoTableRow from 'components/CryptoTableRow';

type Props = {
    loading: boolean;
    newCryptocurrencies: any;
    lastCryptoTableRowRef: null | ((node: HTMLDivElement) => void);
};

const LoadMoreCoins = ({
    newCryptocurrencies,
    lastCryptoTableRowRef,
    loading,
}: Props) => {
    if (loading) {
        return (
            <div className="fixed z-10 top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.4)]"></div>
        );
    }

    return newCryptocurrencies.map((coin: any, index: number) => {
        if (index === newCryptocurrencies.length - 1) {
            return (
                <CryptoTableRow
                    key={coin.id}
                    coin={coin}
                    lastCryptoTableRowRef={lastCryptoTableRowRef}
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
    });
};

export default LoadMoreCoins;
