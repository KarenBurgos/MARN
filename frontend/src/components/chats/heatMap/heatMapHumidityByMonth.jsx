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
      colors: ['#F8FEFF', '#80DEFF', '#188FD1', '#005287', '#003354'],
      plotOptions: {
        heatmap: {
          shadeIntensity: 0,
          colorScale: {
            ranges: [
              {
                from: 0,
                to: 19.99,
                color: '#F8FEFF',
                name: "0 - 20 %",
              },
              {
                from: 20,
                to: 39.99,
                color: '#80DEFF',
                name: "20 - 40 %",
              },
              {
                from: 40,
                to: 59.99,
                color: '#188FD1',
                name: '40 - 60 %',
              },
              {
                from: 60,
                to: 79.99,
                color: '#005287',
                name: '60 - 80 %',
              },
              {
                from: 80,
                to: 100,
                color: '#003354',
                name: '90 - 100 %',
              },
            ],
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      title: {
        text: `Cantidad de humedad para ${selectedMonth.format('MMMM YYYY')}`,
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
          text: 'Hora del Día',
          style: {
            color: '#fff',
            fontSize: '12px'
          },
        },
        categories: ['07:00', '14:00', '21:00'],
        labels: {
          style: {
            colors: "#fff",
            fontSize: '12px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 400,
            cssClass: 'apexcharts-xaxis-label',
          },
        },
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
      theme: {
        mode: 'light',
        palette: 'palette1',
        monochrome: {
          enabled: false,
          color: '#303845',
          shadeTo: 'light',
          shadeIntensity: 0.65
        },
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
        colors: ["#303845"],
        width: 2,
        dashArray: 0,
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

export default HeatMapHumidityByMonth;
