import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import "../../assets/style/mapDesignCustom.css"

function ChartDashboard({ data }) {
  const actualWeather = data[0];
  const [chartData, setChartData] = useState({
    series: [
      {
        name: 'Temperatura media',
        data: [actualWeather.ts07,actualWeather.ts14, actualWeather.ts21],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: 'area',
        stacked: false,
        zoom: {
          type: 'x',
          enabled: true,
          autoScaleYaxis: true
        },
        toolbar: {
          autoSelected: 'zoom'
        },
        background: '#303845', // Fondo del gráfico
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
      },
      title: {
        text: `Temperatura del dia ${actualWeather.fecha}`,
        align: 'left',
      },
      theme: {
        mode: 'dark',
        palette: 'palette2',
        monochrome: {
          enabled: true,
          color: '#99CEFF', //color del grafico
          shadeTo: 'dark',
          shadeIntensity: 0.65
        },
      },
      grid: {
        borderColor: '#3C4557',
        row: {
          colors: ['#3C4557', '#3C4557'], // alterna colores para las filas
          opacity: 0.5,
          border: 5
        },
      },
      markers: {
        size: 5,
      },
      xaxis: {
        categories: ['7:00', '14:00', '21:00'],
      },
      yaxis: {
        title: {
          text: 'Temperatura °C'
        },
        
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right',
        floating: true,
        offsetY: -25,
        offsetX: -5
      }
    },
  });

  useEffect(() => {
    if (data.length > 0) {
      const actualWeather = data[0];
      setChartData({
        series: [
          {
            name: 'Temperatura',
            data: [actualWeather.ts07, actualWeather.ts14, actualWeather.ts21],
          },
        ],
        options: {
          ...chartData.options,
          xaxis: {
            ...chartData.options.xaxis,
            categories: ['7:00', '14:00', '21:00'], // Puedes ajustar esto según tus datos
          },
        },
      });
    }
  }, [data]);

  return (
    <div className="line-chart">
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="area"
        height={350}
      />
    </div>
  );
}

export default ChartDashboard;