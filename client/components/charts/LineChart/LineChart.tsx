import { Group } from '@visx/group';
import { AxisScale } from '@visx/axis';
import { LinePath } from '@visx/shape';

type Props = {
    data: any;
    xScale: AxisScale<number>;
    yScale: AxisScale<number>;
    stroke: string;
    children?: React.ReactNode;
    margin: { top: number; right: number; bottom: number; left: number };
    top?: number;
    left?: number;
};

const LineChart = ({
    data,
    xScale,
    yScale,
    stroke,
    children,
    margin,
    top,
    left,
}: Props) => {
    const getDate = (d: any) => new Date(d[0]);
    const getStockValue = (d: any) => d.price;
    return (
        <Group left={left || margin.left} top={top || margin.top}>
            <LinePath
                data={data}
                x={(d) => xScale(getDate(d)) || 0}
                y={(d) => yScale(getStockValue(d)) || 0}
                strokeWidth={1.5}
                stroke={stroke}
            />
            {children}
        </Group>
    );
};

export default LineChart;
