import { Select } from 'antd';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import Chart from 'react-apexcharts';

const { Option } = Select;

const WindMonthlyChart = ({ data }) => {
  const [selectedYear, setSelectedYear] = useState(dayjs().year());

  // Obtener años únicos de los datos
  const years = Array.from(new Set(data.map(item => dayjs(item.fecha).year())));

  // Filtrar datos según el año seleccionado
  const filteredData = data.filter(item => dayjs(item.fecha).year() === selectedYear);

  // Calcular la velocidad promedio mensual y la dirección más frecuente
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const barSpeedData = months.map(month => {
    const monthData = filteredData.filter(item => dayjs(item.fecha).month() + 1 === month);
    const averageSpeed = monthData.length > 0
      ? monthData.reduce((acc, curr) => acc + curr.sa, 0) / monthData.length
      : 0;
    return averageSpeed;
  });

  const mostFrequentDirectionData = months.map(month => {
    const monthData = filteredData.filter(item => dayjs(item.fecha).month() + 1 === month);
    const directionCount = monthData.reduce((acc, curr) => {
      acc[curr.rd] = (acc[curr.rd] || 0) + 1;
      return acc;
    }, {});
    const maxDirection = Object.keys(directionCount).reduce((a, b) => directionCount[a] > directionCount[b] ? a : b, '');
    return maxDirection;
  });

  const monthsCategory = months.map(month => dayjs().month(month - 1).format('MMMM'));

  const chartData = {
    series: [{
      name: 'Velocidad del Viento Promedio',
      data: barSpeedData
    }],
    options: {
      chart: {
        type: 'bar'
      },
      title: {
        text: `Velocidad del Viento Promedio por Mes - Año ${selectedYear}`
      },
      xaxis: {
        categories: monthsCategory,
        title: {
          text: 'Mes'
        }
      },
      yaxis: {
        labels: {
          formatter: function (val) {
            return val.toFixed(2);
          }
        },
        title: {
          text: 'Velocidad del Viento (m/s)'
        }
      },
      theme: {
        mode: 'dark'
      },
      dataLabels: {
        enabled: true,
        formatter: function (val, opts) {
          const monthIndex = opts.dataPointIndex;
          const direction = mostFrequentDirectionData[monthIndex];
          return `${val.toFixed(2)} m/s\n ${direction}`;
        },
        style: {
          colors: ['#fff'],
          fontSize: '10px'
        },
        offsetY: -10
      },
      tooltip: {
        shared: true,
        intersect: false,
        y: {
          formatter: function (val, opts) {
            return `${val.toFixed(2)} m/s`;
          }
        }
      }
    },
  };

  return (
    <div>
      <Select
        value={selectedYear}
        style={{ width: 120, marginBottom: 20 }}
        onChange={setSelectedYear}
      >
        {years.map(year => (
          <Option key={year} value={year}>{year}</Option>
        ))}
      </Select>

      <div className="chart-container">
        <Chart
          options={chartData.options}
          series={chartData.series}
          type="bar"
          height={350}
        />
      </div>
    </div>
  );
};

export default WindMonthlyChart;
