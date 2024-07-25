import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import dayjs from 'dayjs';
import filterDataByYear from "../../../services/filterDataByYear";

function HeatMapByYear({ data }) {
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = () => {
      setIsLoading(true);
      try {
        const heatmapData = filterDataByYear(data, 'ts');
        setFilteredData(heatmapData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [data]);

  const chartData = {
    series: filteredData,
    options: {
      chart: {
        height: 350,
        type: 'heatmap',
        background: '#303845',
        
        stacked: false,
      },
      colors: ['#A8B1BD', '#7CD9FD', '#ACFED8', '#F9DC51', '#FB7A2C', '#FE0000'],
      plotOptions: {
        heatmap: {
          useFillColorAsStroke: false,
          shadeIntensity: 0.8,
          colorScale: {
            ranges: [
              {
                from: 0,
                to: 0,
                color: '#50637A',
                name: "No hay datos",
              },
              {
                from: 1.99,
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
                color: '#F9CD1F',
                name: 'Cálido: <br> 26°C a 32°C',
              },
              {
                from: 32,
                to: 36.99,
                color: '#FB7A2C',
                name: 'Caliente: <br> 32°C a 37°C',
              },
              {
                from: 37,
                to: 45,
                color: '#FE0000',
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
        text: "vacio",
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
        text: 'Heatmap de Temperatura por Año',
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
          colors: '#fff'
        },
        labels: {
          style: {
            colors: '#fff',
            fontSize: '12px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 400,
          },
        }
      },
      yaxis: {
        title: {
          text: 'Hora del Día',
          colors: '#fff'
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
        showForZeroSeries: true,
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
      <div className="line-chart">
        {isLoading ? (
          <p>Cargando datos...</p>
        ) : (
          <ReactApexChart
            options={chartData.options}
            series={chartData.series}
            type="heatmap"
            height={350}
          />
        )}
      </div>
    </div>
  );
}

export default HeatMapByYear;