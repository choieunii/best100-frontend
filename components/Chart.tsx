// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/line
import styled from '@emotion/styled';
import { Line, ResponsiveLine } from '@nivo/line';
import { AxisProps } from '@nivo/axes';

type DataProps = {
    itemInfoId: string;
    ranking?: number;
    price?: number;
    currentUpdate?: Date;
};
type Props = {
    data: DataProps[];
    chartType: string;
    itemInfoId: string;
};
// const data = [
//     {
//         id: 'fake corp. A',
//         data: [
//             { x: '2018-01-01', y: 7 },
//             { x: '2018-01-02', y: 5 },
//             { x: '2018-01-03', y: 11 },
//             { x: '2018-01-04', y: 9 },
//             { x: '2018-01-05', y: 12 },
//         ],
//     },
// ];
const commonProperties = {
    width: 450,
    height: 400,
    margin: { top: 20, right: 30, bottom: 30, left: 30 },
    animate: true,
    enableSlices: 'x',
};
const formatX = (date?: Date) => {
    if (!date) return;
    return date.toString().slice(0, 10);
};

const formatY = (data?: DataProps, type?: string) => {
    if (type === "price") {
        return data?.price;
    }
    return data?.ranking;
};

const CustomSymbol = ({
    size,
    color,
    borderWidth,
    borderColor,
}: {
    size: number;
    color: string;
    borderWidth: number;
    borderColor: string;
}) => (
    <g>
        <circle
            fill="#fff"
            r={size / 2}
            strokeWidth={borderWidth}
            stroke={borderColor}
        />
        <circle
            r={size / 5}
            strokeWidth={borderWidth}
            stroke={borderColor}
            fill={color}
            fillOpacity={0.35}
        />
    </g>
);

const Component: React.FunctionComponent<Props> = (props: Props) => {
    const reFormatData = props?.data?.map((p) => {
        return {
            x: formatX(p?.currentUpdate),
            y: formatY(p, props?.chartType),
        };
    });
    const data = [{ id: props.itemInfoId, data: reFormatData }];
    return (
        <Wrapper>
            <ResponsiveLine
                {...commonProperties}
                xScale={{
                    type: 'time',
                    format: '%Y-%m-%d',
                    useUTC: false,
                    precision: 'day',
                }}
                data={data}
                curve="cardinal"
                xFormat="time:%Y-%m-%d"
                yScale={{
                    type: 'linear',
                }}
                axisLeft={null}
                axisBottom={{
                    format: '%b %d',
                    tickValues: 'every 1 days',
                    legendPosition: 'middle',
                }}
                lineWidth={5}
                enablePointLabel={true}
                pointSymbol={CustomSymbol}
                colors={'purple'}
                pointSize={16}
                pointBorderWidth={1}
                enableGridX={false}
                enableGridY={false}
                pointBorderColor={{
                    from: 'color',
                    modifiers: [['darker', 0.3]],
                }}
                useMesh={true}
                enableSlices={false}
            />
        </Wrapper>
    );
};

const Wrapper = styled('div')`
    width: 450px;
    height: 400px;
    margin-right: 20px;
    margin-left: 20px;
`;

export default Component;
