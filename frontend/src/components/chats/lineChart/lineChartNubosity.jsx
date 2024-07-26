import { DatePicker, Space } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import FilterDataByMonth from "../../../services/filterDataByMonth";

const { MonthPicker } = DatePicker;

function BarChartAverageHumidity({ data }) {
    const [selectedMonth, setSelectedMonth] = useState(dayjs('2018-05-01'));
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        const month = selectedMonth.month();
        const year = selectedMonth.year();

        // Filtrar los datos según el mes y el año seleccionados
        const filtered = data.filter(item => dayjs(item.fecha).year() === year && dayjs(item.fecha).month() === month);

        // Formatear datos para el gráfico de barras (solo promedio)
        const barData = FilterDataByMonth(filtered, 'hr', true);
        setFilteredData(barData);
    }, [selectedMonth, data]);

    // Extraer los datos del promedio
    const averageData = filteredData.find(d => d.name === 'Promedio')?.data || [];

    const chartData = {
        series: [{
            name: 'Promedio',
            data: averageData
        }],
        options: {
            chart: {
                height: 350,
                type: 'bar',
                background: '#303845'
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '60%',
                }
            },
            dataLabels: {
                enabled: false, // Habilitar datos en las barras
            },
            title: {
                text: `Promedio de nubosidad para ${selectedMonth.format('MMMM YYYY')}`,
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
                type: 'category',
                labels: {
                    formatter: (value) => `${value}` // Formato del texto en el eje X
                }
            },
            yaxis: {
                title: {
                    text: 'Nubosidad ()',
                    style: {
                      color: '#fff',
                      fontSize: '12px'
                    },
                },
                labels: {
                    formatter: (value) => `${value}%` // Formato del texto en el eje Y
                }
            },
            theme: {
                mode: 'dark',
                palette: 'palette1',
                monochrome: {
                    enabled: true,
                    color: '#C2DFE0', // color del gráfico
                    shadeTo: 'light',
                    shadeIntensity: 0.65
                },
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
                        allowClear={false}
                    />
                </Space>
            </div>
            <div className="bar-chart">
                <ReactApexChart
                    options={chartData.options}
                    series={chartData.series}
                    type="bar"
                    height={300}
                />
            </div>
        </div>
    );
}

export default BarChartAverageHumidity;
