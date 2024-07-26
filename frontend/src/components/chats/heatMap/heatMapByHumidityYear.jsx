import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import dayjs from 'dayjs';

function calculateMonthlyAverages(data) {
  const years = Array.from(new Set(data.map(item => dayjs(item.fecha).year())));
  const months = Array.from({ length: 12 }, (_, i) => dayjs().month(i).format('MMMM'));

  // Inicializar estructura de datos
  const heatmapData = years.map(year => ({
    name: year.toString(),
    data: months.map((month, index) => {
      const monthlyData = data.filter(item => {
        const itemDate = dayjs(item.fecha);
        return itemDate.year() === year && itemDate.month() === index;
      });

      const average = monthlyData.length > 0
        ? monthlyData.reduce((acc, curr) => acc + (curr.hr || 0), 0) / monthlyData.length
        : 0;

      return { x: month, y: average };
    })
  }));

  return heatmapData;
}

function HeatMapByHumidityYear({ data }) {
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    // Filtrar y calcular datos para el heatmap
    const heatmapData = calculateMonthlyAverages(data);
    setFilteredData(heatmapData);
  }, [data]);

  const years = Array.from(new Set(data.map(item => dayjs(item.fecha).year())));
  const months = Array.from({ length: 12 }, (_, i) => dayjs().month(i).format('MMMM'));

  const chartData = {
    series: filteredData,
    options: {
      chart: {
        height: 350,
        type: 'heatmap',
        background: '#303845'

      },
      colors: ['#D6D7DA', '#80DEFF', '#188FD1', '#005287', '#002C66'],
      plotOptions: {
        heatmap: {
          shadeIntensity: 0.2,
          colorScale: {
            ranges: [
              {
                from: 0,
                to: 19.99,
                color: '#303845',
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
                color: '#002C66',
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
        text: 'Cantidad de humedad media por Año',
        align: 'center',
        style: {
          color: '#C1F0FF',
          fontSize: '16px'
        },
      },
      xaxis: {
        categories: months,
        title: {
          text: 'Mes',
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
        categories: years.map(year => year.toString()),
        title: {
          text: 'Año',
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
      },
      theme: {
        mode: 'light',
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
      tooltip: {
        enabled: true,
        enabledOnSeries: undefined,
        shared: true,
        followCursor: false,
        intersect: false,
        inverseOrder: false,
        custom: undefined,
        hideEmptySeries: true,
        fillSeriesColor: true,
        theme: 'dark',
        style: {
          fontSize: '12px',
          fontFamily: undefined
        },
        onDatasetHover: {
          highlightDataSeries: false,
        },
      }

    },
  };

  return (
    <div>
      <div className="line-chart">
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="heatmap"
          height={350}
        />
      </div>
    </div>
  );
}

export default HeatMapByHumidityYear;
