import CryptoTableRow from 'components/CryptoTableRow';
import LoadingOverlay from 'components/LoadingOverlay';

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
    return (
        <>
            {newCryptocurrencies.map((coin: any, index: number) => {
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
            })}
            {loading ? <LoadingOverlay /> : null}
        </>
    );
};

export default LoadMoreCoins;
