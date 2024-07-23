import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { DatePicker, Space } from 'antd';
import dayjs from 'dayjs';
import "../../../assets/style/antDesignCustom.css"
import FilterDataByMonth from "../../../services/filterDataByMonth";
import { ImTextColor } from "react-icons/im";

const { MonthPicker } = DatePicker;

function HeatMapHumidityByMonth({ data }) {
  const [selectedMonth, setSelectedMonth] = useState(dayjs('2018-05-01'));
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const month = selectedMonth.month();
    const year = selectedMonth.year();

    // Filtrar los datos según el mes y el año seleccionados
    const filtered = data.filter(item => dayjs(item.fecha).year() === year && dayjs(item.fecha).month() === month);

    // Formatear datos para el heatmap
    const heatmapData = FilterDataByMonth(filtered, 'hr');
    

    setFilteredData(heatmapData);
  }, [selectedMonth, data]);

  const chartData = {
    series: filteredData,
    options: {
      chart: {
        height: 350,
        type: 'heatmap',
        background: '#303845'
      },
      plotOptions: {
        heatmap: {
          shadeIntensity: 1,
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
                to: 19.99,
                color: '#FFFFFF',
                name: "0 - 50.99 %",
              },
              {
                from: 20,
                to: 39.99,
                color: '#C7F464',
                name: "0 - 17.9 °c",
              },
              {
                from: 40,
                to: 59.99,
                color: '#81D4FA',
                name: '18 - 29.9 °c',
              },
              {
                from: 60,
                to: 79.99,
                color: '#FD6A6A',
                name: '30 - 45 °c',
              },
              {
                from: 80,
                to: 100,
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
        text: `Heatmap de humedad para ${selectedMonth.format('MMMM YYYY')}`,
        align: 'left',
      },
      xaxis: {
        title: {
          text: 'Día del Mes',
        },
      },
      yaxis: {
        title: {
          text: 'Hora del Día',
        },
        categories: ['07:00', '14:00', '21:00'],
      },
      theme: {
        mode: 'light',
        palette: 'palette1',
        monochrome: {
          enabled: false,
          color: '#95FAFF', //color del grafico
          shadeTo: 'light',
          shadeIntensity: 0.65
        },
      },
      tooltip: {
        enabled: true,
        enabledOnSeries: undefined,
        shared: true,
        followCursor: false,
        intersect: false,
        inverseOrder: false,
        custom: undefined,
        hideEmptySeries: true,
        fillSeriesColor: false,
        theme: 'dark',
        style: {
          fontSize: '12px',
          fontFamily: undefined,
          ImTextColor: "#000"
        },
        onDatasetHover: {
            highlightDataSeries: false,
        },}
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

export default HeatMapHumidityByMonth;
