import ReactApexChart from "react-apexcharts";
import {useTheme} from "@emotion/react";
import {useThemeStore} from "@store/useThemeStore.ts";
import {Container} from "./style.ts";


interface IChartProps {
    containerWidth?: string;
    containerHeight?: string;
    colors?: ("primary" | "green" | "danger" | "orange" | "purple")[];
    labels: string[];
    values: number[];
    type: "radialBar" | "line" | "bar" | "area" | "rangeArea" | "rangeBar" | "pie" | "donut" | "scatter" | "bubble" | "heatmap" | "candlestick" | "boxPlot" | "radar" | "polarArea" | "treemap" | undefined;
    startAngle?: number;
    endAngle?: number;
    labelOffset?: number;
    valueOffset?: number;
}


const Chart = (
    {
        containerWidth = "8rem",
        containerHeight = "8rem",
        type,
        colors = ["primary"],
        labels,
        values,
        startAngle = 0,
        endAngle = 360,
        labelOffset,
        valueOffset
    }: IChartProps) => {
    const theme = useTheme();
    const {lang} = useThemeStore();

    return (
        <Container containerWidth={containerWidth} containerHeight={containerHeight}>
            <ReactApexChart
                type={type}
                series={values}
                options={{
                    chart: {
                        type: type,
                    },
                    plotOptions: {
                        radialBar: {
                            startAngle: startAngle,
                            endAngle: endAngle,
                            offsetY: 12,
                            hollow: {
                                size: '65%',
                            },
                            track: {
                                background: theme.colors.button.third,
                                strokeWidth: "100%",
                            },
                            dataLabels: {
                                name: {
                                    show: true,
                                    color: theme.colors.font.main,
                                    offsetY: labelOffset,
                                    fontSize: lang === "en" ? '12px' : '16px',
                                    fontWeight: '400',
                                },
                                value: {
                                    show: true,
                                    color: theme.colors.font.sub,
                                    offsetY: valueOffset,
                                    fontSize: '22px',
                                }
                            }
                        },
                    },
                    stroke: {
                        lineCap: 'round',
                        width: -25,
                    },
                    fill: {
                        type: "solid",
                        colors: colors.map((color) => theme.colors.chart[color]),
                    },
                    states: {
                        hover: {
                            filter: {
                                type: 'none',
                            },
                        },
                    },
                    labels: labels,
                }}
            />
        </Container>
    );
};

export default Chart;