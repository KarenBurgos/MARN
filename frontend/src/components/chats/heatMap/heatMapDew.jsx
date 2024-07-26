import { DatePicker, Space } from "antd";
import ReactApexChart from "react-apexcharts";
import FilterDataByMonth from "../../../services/filterDataByMonth";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import DewConditionCategory from "../../../services/dewConditionCategory";

const { MonthPicker } = DatePicker;

function HeatMapDew({data}) {

    const [selectedMonth, setSelectedMonth] = useState(dayjs('2018-05-01'));
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        const month = selectedMonth.month();
        const year = selectedMonth.year();
    
        // Filtrar los datos según el mes y el año seleccionados
        const filtered = data.filter(item => dayjs(item.fecha).year() === year && dayjs(item.fecha).month() === month);
    
        // Formatear datos para el heatmap
        const heatmapData = FilterDataByMonth(filtered, 'er');
        
        setFilteredData(heatmapData);
      }, [selectedMonth, data]);

      const transformData = (data) => {
        return data.map(row => {
            if (!row || typeof row !== 'object') {
                return row;
            }
    
            const transformedData = row.data.map(item => ({
                ...item,
                y: item.y === "." ? -1 : item.y
            }));
    
            return {
                ...row,
                data: transformedData
            };
        });
    };
   

      const chartData = {
        series: transformData(filteredData),
        options: {
            chart: {
                height: 350,
                width: '100%', // Ajusta al tamaño del contenedor
                type: 'heatmap',
                background: '#303845'
            },
            colors: ['#fff', '#DFD4FB', '#AE88FF', '#7855F1'],
            plotOptions: {
                heatmap: {
                    useFillColorAsStroke: false,
                    shadeIntensity: 0.3,
                    colorScale: {
                        ranges: [
                            {
                                from: -1,
                                to: -1,
                                color: '#7E84F7', // Color para los valores "no hay"
                                name: DewConditionCategory("."),
                            },
                            {
                                from: 0,
                                to: 0,
                                color: '#9370F1',
                                name: DewConditionCategory(0),
                            },
                            {
                                from: 1,
                                to: 1,
                                color: '#AE88FF',
                                name: DewConditionCategory(1),
                            },
                            {
                                from: 2,
                                to: 2,
                                color: '#7855F1',
                                name: DewConditionCategory(2),
                            },
                            
                        ],
                    },
                },
            },
            dataLabels: {
                enabled: false,
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
                    fontFamily: undefined,
                },
            },
            title: {
                text: `Cantidad de rocio en ${selectedMonth.format('MMMM YYYY')}`,
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
                },
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
                    },
                    categories: ['07:00', '14:00', '21:00'],
                },
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
            },
        },
    };
    
    return(
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
    )
}

export default HeatMapDew;