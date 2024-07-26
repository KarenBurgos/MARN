import { DatePicker, Space } from "antd";
import ReactApexChart from "react-apexcharts";
import FilterDataByMonth from "../../../services/filterDataByMonth";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import SoilConditionCategory from "../../../services/soilConditionCategory";

const { MonthPicker } = DatePicker;

function HeatMapSoil({ data }) {
    const [selectedMonth, setSelectedMonth] = useState(dayjs('2018-05-01'));
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        const month = selectedMonth.month();
        const year = selectedMonth.year();

        // Filtrar los datos según el mes y el año seleccionados
        const filtered = data.filter(item => dayjs(item.fecha).year() === year && dayjs(item.fecha).month() === month);

        // Formatear datos para el heatmap
        const heatmapData = FilterDataByMonth(filtered, 'es');

        setFilteredData(heatmapData);
    }, [selectedMonth, data]);

    const chartData = {
        series: filteredData,
        options: {
            chart: {
                height: 350,
                width: 50,
                type: 'heatmap',
                background: '#303845'
            },
            colors: ['#F1AE89', '#AEDADD', '#34626C'],
            plotOptions: {
                heatmap: {
                    useFillColorAsStroke: false,
                    shadeIntensity: 0.6,
                    colorScale: {
                        ranges: [
                            {
                                from: 0,
                                to: 0,
                                color: '#F1AE89',
                                name: "seco",
                            },
                            {
                                from: 1,
                                to: 1,
                                color: '#AEDADD',
                                name: 'humedo',
                            },
                            {
                                from: 2,
                                to: 2,
                                color: '#34626C',
                                name: 'muy humedo',
                            },
                        ],
                    },
                },
            },
            dataLabels: {
                enabled: false,
            },
            tooltip: {
                y: {
                    formatter: (value) => SoilConditionCategory(value)
                }
            },
            noData: {
                text: "vacio",
                align: 'center',
                verticalAlign: 'middle',
                offsetX: 0,
                offsetY: 0,
                style: {
                    color: "#000",
                    fontSize: '14px',
                    fontFamily: undefined
                }
            },
            title: {
                text: `Condición del suelo el ${selectedMonth.format('MMMM YYYY')}`,
                align: 'center',
                style: {
                    color: '#C1F0FF',
                    fontSize: '16px'
                },
            },
            xaxis: {
                title: {
                    text: 'Día del Mes',
                    style: {
                        color: '#fff',
                        fontSize: '12px'
                    },
                },
                labels: {
                    style: {
                        colors: "#fff",
                        fontSize: '12px',
                        fontFamily: 'Helvetica, Arial, sans-serif',
                        fontWeight: 400,
                    },
                }
            },
            yaxis: {
                title: {
                    text: 'Hora',
                    style: {
                        color: '#fff',
                        fontSize: '12px'
                    },
                },
                labels: {
                    style: {
                        colors: "#fff",
                        fontSize: '12px',
                        fontFamily: 'Helvetica, Arial, sans-serif',
                        fontWeight: 400,
                        cssClass: 'apexcharts-xaxis-label',
                    },
                },
                categories: ['07:00', '14:00', '21:00'],
            },
            theme: {
                mode: 'light',
            },
            legend: {
                show: true,
                labels: {
                    colors: "#fff",
                    useSeriesColors: false,
                    width: 550,
                },
                itemMargin: {
                    horizontal: 20,
                },
            },
            stroke: {
                show: true,
                colors: ["#364963"],
                width: 2,
                dashArray: 0,
            }
        },
    };

    return (
        <div>
            <div className="flex w-full pb-5">
                <p className="text-nowrap pr-3 text-center self-center">Escoger Mes:</p>
                <Space direction="vertical" style={{ width: "100%" }} size={12}>
                    <MonthPicker
                        defaultValue={dayjs('2018-05-01')}
                        onChange={(date) => setSelectedMonth(date)}
                        picker="month"
                    />
                </Space>
            </div>
            <div className="line-chart">
                <ReactApexChart
                    options={chartData.options}
                    series={chartData.series}
                    type="heatmap"
                    height={300}
                />
            </div>
        </div>
    );
}

export default HeatMapSoil;
