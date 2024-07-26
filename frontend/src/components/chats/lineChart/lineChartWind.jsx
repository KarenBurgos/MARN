import React, { useState } from 'react';
import Chart from 'react-apexcharts';
import { Select } from 'antd';
import dayjs from 'dayjs';

// Función para convertir m/s a km/h
const convertToKmh = (mps) => mps * 3.6;

// Función para obtener el índice de Beaufort basado en km/h
const getBeaufortIndex = (kmh) => {
  if (kmh <= 1) return 0;
  if (kmh <= 5) return 1;
  if (kmh <= 11) return 2;
  if (kmh <= 19) return 3;
  if (kmh <= 29) return 4;
  if (kmh <= 39) return 5;
  if (kmh <= 50) return 6;
  if (kmh <= 62) return 7;
  if (kmh <= 75) return 8;
  if (kmh <= 89) return 9;
  if (kmh <= 103) return 10;
  if (kmh <= 118) return 11;
  return 12;
};

// Define colores para cada índice de la escala Beaufort
const beaufortColors = [
  '#00BFFF', // Calma
  '#87CEEB', // Ventolina
  '#32CD32', // Brisa ligera
  '#FFD700', // Brisa suave
  '#FF8C00', // Brisa moderada
  '#FF4500', // Brisa fresca
  '#FF6347', // Brisa fuerte
  '#FF1493', // Viento fuerte
  '#FF00FF', // Temporal fuerte
  '#8A2BE2', // Temporal duro
  '#4B0082', // Tempestad
  '#6A5ACD', // Tormenta
  '#8B0000'  // Huracán
];

const { Option } = Select;

const WindBeaufortChart = ({ data }) => {
  const [selectedYear, setSelectedYear] = useState(2018);

  // Verificar que data es un array
  if (!Array.isArray(data)) {
    console.error("Data must be an array");
    return null;
  }

  // Obtener años únicos de los datos
  const years = Array.from(new Set(data.map(item => dayjs(item.fecha).year())));

  // Filtrar datos según el año seleccionado
  const filteredData = data.filter(item => dayjs(item.fecha).year() === selectedYear);

  // Calcular la velocidad promedio mensual en km/h
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const barSpeedData = months.map(month => {
    const monthData = filteredData.filter(item => dayjs(item.fecha).month() + 1 === month);
    const averageSpeed = monthData.length > 0
      ? Math.floor(monthData.reduce((acc, curr) => acc + curr.sa, 0) / monthData.length * 3.6) // Convertir a km/h
      : 0;
    return averageSpeed;
  });

  // Convertir las velocidades promedio a la escala de Beaufort
  const beaufortIndexes = barSpeedData.map(speed => getBeaufortIndex(speed));

  // Crear una lista de colores basada en el índice de Beaufort
  const chartColors = beaufortIndexes.map(index => beaufortColors[index]);

  const monthsCategory = months.map(month => dayjs().month(month - 1).format('MMMM'));

  const chartData = {
    series: [{
      name: 'Velocidad del Viento (km/h)',
      data: barSpeedData
    }],
    options: {
      chart: {
        type: 'bar',
        height: 350,
        background: '#303845'
      },
      title: {
        text: `Velocidad del Viento Promedio por Mes - Año ${selectedYear}`,
        align:'center',
        style: {
          color: '#C1F0FF',
          fontSize: '16px'
        },
      },
      xaxis: {
        categories: monthsCategory,
        title: {
          text: 'Mes',
          align: 'center',
          style: {
            color: '#fff',
            fontSize: '12px',
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
        labels: {
          formatter: function (val) {
            return `${val}`; // Mostrar solo la velocidad en el eje Y
          },
          style: {
            colors: "#fff",
            fontSize: '12px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 400,
          },
        },

        title: {
          text: 'Velocidad del Viento (km/h)',
          style: {
            color: '#fff',
            fontSize: '12px'
          },

        }
      },
      theme: {
        mode: 'dark'
      },
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return `${val} km/h`; // Mostrar solo la velocidad en las etiquetas de datos
        },
        style: {
          colors: ['#fff'],
          fontSize: '10px'
        },
        offsetY: -10
      },
      legend: {
        show: false,
      },
      tooltip: {
        shared: true,
        intersect: false,
        y: {
          formatter: function (val) {
            const beaufortIndex = getBeaufortIndex(val);
            return `${val} km/h (escala ${beaufortIndex})`; // Mostrar valor y índice de Beaufort en el tooltip
          }
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
      plotOptions: {
        bar: {
          distributed: true,
          colors: {
            ranges: barSpeedData.map((speed, index) => ({
              from: speed,
              to: speed,
              color: beaufortColors[getBeaufortIndex(speed)]
            }))
          }
        }
      },
      fill: {
        colors: chartColors // Asignar colores personalizados a las barras
      }
    }
  };

  return (
    <div className=' py-5'>
      <span className="flex w-full py-3">
        <p className="text-nowrap pr-3 text-center self-center">Escoger Año:</p>
        <Select
          value={selectedYear}
          style={{ width: '100%' }}
          onChange={setSelectedYear}
        >
          {years.map(year => (
            <Option key={year} value={year}>{year}</Option>
          ))}
        </Select>
      </span>
      <div className="chart-container">
        <Chart
          options={chartData.options}
          series={chartData.series}
          type="bar"
          height={400}
        />
      </div>
    </div>
  );
};

export default WindBeaufortChart;
