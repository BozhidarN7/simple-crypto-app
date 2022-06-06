import Image from 'next/image';
import ParentSize from '@visx/responsive/lib/components/ParentSize';

import CoinBasicPriceChart from 'components/charts/CoinBasicPriceChart';

type Props = {
    coin: any;
    lastCryptoTableRowRef: null | ((node: HTMLDivElement) => void);
};

const CryptoTableRow = ({ coin, lastCryptoTableRowRef }: Props) => {
    const formatter = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

    const calculateSupplyPercentage = (coin: any) => {
        return (
            Number(
                (
                    coin.circulating_supply / coin.max_supply +
                    Number.EPSILON
                ).toFixed(2)
            ) * 100
        );
    };

    return (
        <div
            ref={lastCryptoTableRowRef}
            className="grid grid-cols-crypto-table-row justify-center items-center gap-x-5 py-4 px-2 hover:bg-gray-50 cursor-pointer"
        >
            <div className="flex flex-row">
                <span className="hover:text-orange-400">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                        />
                    </svg>
                </span>
                <span className="ml-auto">{coin['cmc_rank']}</span>
            </div>
            <div className="justify-self-start flex items-center">
                <span className="mr-2 mt-2">
                    <Image
                        src={`https://cdn.jsdelivr.net/npm/cryptocurrency-icons@0.18.0/svg/icon/${coin.symbol.toLowerCase()}.svg`}
                        width={32}
                        height={32}
                    />
                </span>
                <span className="font-bold">
                    {coin.name}{' '}
                    <span className="font-normal">{coin.symbol}</span>
                </span>
            </div>
            <div className="justify-self-end cursor-text">
                <span>${formatter.format(coin.quote.USD.price)}</span>
            </div>
            <div className="justify-self-end flex cursor-text">
                {coin.quote.USD.percent_change_24h < 0 ? (
                    <span className="self-center text-red-500">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </span>
                ) : (
                    <span className="text-green-500 self-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </span>
                )}

                <span
                    className={`font-bold inline ${
                        coin.quote.USD.percent_change_24h < 0
                            ? 'text-red-500'
                            : 'text-green-400'
                    }`}
                >
                    {formatter.format(
                        Math.abs(coin.quote.USD.percent_change_24h)
                    )}
                    %
                </span>
            </div>
            <div className="justify-self-end flex cursor-text">
                {coin.quote.USD.percent_change_7d < 0 ? (
                    <span className="self-center text-red-500">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </span>
                ) : (
                    <span className="text-green-500 self-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </span>
                )}
                <span
                    className={`${
                        coin.quote.USD.percent_change_7d < 0
                            ? 'text-red-500'
                            : 'text-green-500'
                    }`}
                >
                    {formatter.format(
                        Math.abs(coin.quote.USD.percent_change_7d)
                    )}
                    %
                </span>
            </div>
            <div className="justify-self-end cursor-text">
                <span>${formatter.format(coin.quote.USD.market_cap)}</span>
            </div>
            <div className="flex flex-col justify-self-end cursor-text">
                <span>${formatter.format(coin.quote.USD.volume_24h)}</span>
            </div>
            <div className="justify-self-end">
                <span className="flex text-right">
                    {formatter.format(coin.circulating_supply).split('.')[0]}{' '}
                    {coin.symbol}
                </span>

                {coin.max_supply ? (
                    <div className="mt-2 w-full bg-gray-100 rounded-full h-2.5">
                        <div
                            className="bg-gray-300 h-2.5 rounded-full"
                            style={{
                                width: `${calculateSupplyPercentage(coin)}%`,
                            }}
                        ></div>
                    </div>
                ) : null}
            </div>
            <div className="h-10">
                <ParentSize>
                    {({ width, height }) => (
                        <CoinBasicPriceChart width={width} height={height} />
                    )}
                </ParentSize>
            </div>
        </div>
    );
};

export default CryptoTableRow;
