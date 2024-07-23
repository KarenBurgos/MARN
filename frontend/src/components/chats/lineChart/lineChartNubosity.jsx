import dayjs from "dayjs";
import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import FilterDataByMonth from "../../../services/filterDataByMonth";
import { DatePicker, Space } from "antd";

const { MonthPicker } = DatePicker;

function LineChartNubosity({data}){
  const [selectedMonth, setSelectedMonth] = useState(dayjs('2018-05-01'));
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => { 
    const month = selectedMonth.month();
    const year = selectedMonth.year();
    
    // Filtrar los datos según el mes y el año seleccionados
    const filtered = data.filter(item => dayjs(item.fecha).year() === year && dayjs(item.fecha).month() === month);

      // Filtrar y calcular datos para el heatmap
      const heatmapData = FilterDataByMonth(filtered, 'pvp', true);
      setFilteredData(heatmapData);
    }, [data]);
  
    const years = Array.from(new Set(data.map(item => dayjs(item.fecha).year())));
    const months = Array.from({ length: 12 }, (_, i) => dayjs().month(i).format('MMMM'));
  
    const chartData = {
      series: filteredData,
      options: {
        chart: {
          height: 350,
          type: 'line',
          background: '#303845'
        },
        plotOptions: {
          heatmap: {
              
            colorScale: {
              ranges: [
                  {
                    from: 0,
                    to: 0,
                    color: '#FFFFFF',
                    name: "Sin datos",
                  },
                  {
                    from: 1,
                    to: 17.9,
                    color: '#C7F464',
                    name: "0 - 17.9 °c",
                  },
                  {
                    from: 18,
                    to: 29.9,
                    color: '#81D4FA',
                    name: '18 - 29.9 °c',
                  },
                  {
                    from: 30,
                    to: 45,
                    color: '#FD6A6A',
                    name: '30 - 45 °c',
                  },
                ],
            },
          },
        },
        dataLabels: {
          enabled: false,
        },
        title: {
          text: 'Heatmap de nubosidad por Año',
          align: 'left',
        },
        xaxis: {
          categories: months,
          title: {
            text: 'Mes',
          },
        },
        yaxis: {
          categories: years.map(year => year.toString()),
          title: {
            text: 'Año',
          },
        },
        theme: {
          mode: 'dark',
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
            type="line"
            height={350}
          />
        </div>
      </div>
    );
  
}

export default LineChartNubosity;