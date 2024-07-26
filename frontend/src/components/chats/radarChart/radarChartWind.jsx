import { Select } from 'antd';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import Chart from 'react-apexcharts';

const { Option } = Select;

const RadarChartWind = ({ data }) => {
  const [selectedYear, setSelectedYear] = useState(2018);
  const [selectedMonth, setSelectedMonth] = useState(5);

  // Obtener años únicos de los datos
  const years = Array.from(new Set(data.map(item => dayjs(item.fecha).year())));

  // Obtener meses
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  // Filtrar datos según el año y mes seleccionados
  const filteredData = data.filter(
    item => dayjs(item.fecha).year() === selectedYear && dayjs(item.fecha).month() + 1 === selectedMonth
  );

  // Direcciones del viento posibles
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW', 'C'];

  // Verificar que los datos filtrados tengan la propiedad 'rd'
  const validData = filteredData.filter(item => item.rd !== undefined);

  // Calcular la velocidad promedio para cada dirección
  const speedData = directions.map(dir => {
    const dirData = validData.filter(item => item.rd === dir);
    const averageSpeed = dirData.length > 0
      ? dirData.reduce((acc, curr) => acc + curr.sa, 0) / dirData.length
      : 0;
    return averageSpeed;
  });

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

  const chartData = {
    series: [{
      name: 'Velocidad del Viento',
      data: speedData
    }],
    options: {
      chart: {
        type: 'radar',
        background: '#303845'
      },
      title: {
        text: `Velocidad del Viento y Dirección - ${dayjs().month(selectedMonth - 1).format('MMMM')} ${selectedYear}`,
        align: 'center',
        style: {
          color: '#C1F0FF',
          fontSize: '16px'
        },
      },
      xaxis: {
        categories: directions,
        labels: {
          style: {
            colors: '#fff'
          }
        }
      },
      yaxis: {
        labels: {
          formatter: function (val) {
            return val.toFixed(2);
          },
          style: {
            colors: '#fff'
          }
        }
      },
      theme: {
        mode: 'dark'
      },
      fill: {
        opacity: 0.8,
        colors: ['#A09FFF'] // Color de relleno del área del gráfico
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['#fff'], // Color de las líneas del gráfico
        dashArray: 0
      },
      markers: {
        size: 4,
        colors: ['#fff'],
        strokeColors: '#A09FFF',
        strokeWidth: 2,
        hover: {
          size: 7
        }
      },
      tooltip: {
        theme: 'dark',
        y: {
          formatter: function (val) {
            const beaufortIndex = getBeaufortIndex(Math.floor(val));
            return `${val.toFixed(2)} km/h (escala ${beaufortIndex})`;
          }
        }
      },
      plotOptions: {
        radar: {
          polygons: {
            strokeColors: '#fff',
            connectorColors: '#fff',
            fill: {
              colors: ['#303845'] // Color de fondo dentro del gráfico
            }
          }
        }
      }
    },
  };

  return (
    <div className='py-5'>
      <span className="flex w-full py-3">
        <p className="text-nowrap pr-3 text-center self-center">Escoger Año:</p>
        <Select
          value={selectedYear}
          style={{ width: '45%', marginRight: 20 }}
          onChange={setSelectedYear}
        >
          {years.map(year => (
            <Option key={year} value={year}>{year}</Option>
          ))}
        </Select>
        <p className="text-nowrap pr-3 text-center self-center">Escoger Mes:</p>
        <Select
          value={selectedMonth}
          style={{ width: '45%' }}
          onChange={setSelectedMonth}
        >
          {months.map(month => (
            <Option key={month} value={month}>{dayjs().month(month - 1).format('MMMM')}</Option>
          ))}
        </Select>
      </span>
      <div className="line-chart">
        <Chart
          options={chartData.options}
          series={chartData.series}
          type="radar"
          height={350}
        />
      </div>
    </div>
  );
};

export default RadarChartWind;
