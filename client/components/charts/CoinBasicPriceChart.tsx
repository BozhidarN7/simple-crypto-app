import { useMemo } from 'react';
import useSWR from 'swr';
import { max, min, extent } from 'd3-array';
import { scaleTime, scaleLinear } from '@visx/scale';

import LinePath from 'components/charts/LineChart/LineChart';
import { getCryptocurrencyLastSevenDaysPrice } from 'services/cryptoService';

type Props = {
    width: number;
    height: number;
    color: string;
    coinId: string;
};

const CoinBasicPriceChart = ({ width, height, color, coinId }: Props) => {
    const { data, error } = useSWR(
        `${coinId}`,
        getCryptocurrencyLastSevenDaysPrice.bind(null, coinId)
    );
    if (error) {
        return (
            <span className="text-right self-end">Loading chart failed!</span>
        );
    }

    const mappedData: any[] = useMemo(() => {
        if (!data) return [];
        return data.data?.length
            ? data.data.map((ele: any) => ({
                  date: new Date(ele[0]),
                  price: ele[1],
              }))
            : [];
    }, [data]);

    const getDate = (d: any) => new Date(d.date);
    const getStockValue = (d: any) => d.price;

    const dateScale = useMemo(() => {
        return scaleTime({
            range: [0, width],
            domain: extent(mappedData, getDate) as [Date, Date],
        });
    }, [mappedData, width]);

    const priceScale = useMemo(() => {
        return scaleLinear({
            range: [height, 0],
            domain: [
                min(mappedData, getStockValue) || 0,
                max(mappedData, getStockValue) || 0,
            ],
            nice: true,
        });
    }, [height, mappedData]);

    return (
        <div className="">
            <svg height={height} width={width}>
                <LinePath
                    data={mappedData}
                    stroke={color}
                    xScale={dateScale}
                    yScale={priceScale}
                    margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                />
            </svg>
        </div>
    );
};

export default CoinBasicPriceChart;
