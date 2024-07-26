import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { DatePicker, Space } from 'antd';
import dayjs from 'dayjs';
import "../../../assets/style/antDesignCustom.css"
import FilterDataByMonth from "../../../services/filterDataByMonth";

const { MonthPicker } = DatePicker;

function HeatMapByMonth({ data }) {
  const [selectedMonth, setSelectedMonth] = useState(dayjs('2018-05-01'));
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const month = selectedMonth.month();
    const year = selectedMonth.year();

    // Filtrar los datos según el mes y el año seleccionados
    const filtered = data.filter(item => dayjs(item.fecha).year() === year && dayjs(item.fecha).month() === month);

    // Formatear datos para el heatmap
    const heatmapData = FilterDataByMonth(filtered, 'ts');
    setFilteredData(heatmapData);
  }, [selectedMonth, data]);

  const chartData = {
    series: filteredData,
    options: {
      chart: {
        height: 350,
        type: 'heatmap',
        background: '#303845',

      },
      colors: ['#7CD9FD', '#ACFED8', '#F9EE92', '#F09B59', '#E6817E'],
      plotOptions: {
        heatmap: {
          useFillColorAsStroke: false,
          shadeIntensity: 0,

          stacked: false,
          colorScale: {
            ranges: [
              {
                from: 0,
                to: 20.99,
                color: '#7CD9FD',
                name: "Frío: <br> 0°C a 21°C",
              },
              {
                from: 21,
                to: 25.99,
                color: '#ACFED8',
                name: 'Templado <br> 21°C a 26°C',
              },
              {
                from: 26,
                to: 31.99,
                color: '#F9EE92',
                name: 'Cálido: <br> 26°C a 32°C',
              },
              {
                from: 30,
                to: 36.99,
                color: '#F09B59',
                name: 'Caliente: <br> 30°C a 37°C',
              },
              {
                from: 37,
                to: 45,
                color: '#E6817E',
                name: 'Muy caliente: <br>37°C a 45°C',
              },
            ],
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      noData: {
        text: "No se regristraron datos en esta fecha",
        align: 'center',
        verticalAlign: 'middle',
        offsetX: 0,
        offsetY: 0,
        style: {
          color: "#fff",
          fontSize: '14px',
          fontFamily: undefined
        }
      },
      title: {
        text: `Temperatura media para ${selectedMonth.format('MMMM YYYY')}`,
        align: 'left',
        style: {
          fontSize: '14px',
          fontFamily: undefined,
          color: '#fff'
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
          text: 'Hora del Día',
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
        mode: 'dark',
      },
      legend: {
        show: true,
        labels: {
          colors: "#fff",
          useSeriesColors: false,
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
            allowClear={false}
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

export default HeatMapByMonth;
