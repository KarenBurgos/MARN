import { Select } from 'antd';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import Chart from 'react-apexcharts';

const { Option } = Select;

const RadarChartWind = ({ data }) => {
  const [selectedYear, setSelectedYear] = useState(2018);

  // Obtener años únicos de los datos
  const years = Array.from(new Set(data.map(item => dayjs(item.fecha).year())));

  // Filtrar datos según el año seleccionado
  const filteredData = data.filter(item => dayjs(item.fecha).year() === selectedYear);

  // Direcciones del viento posibles
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW', 'C'];

  // Calcular la velocidad promedio para cada dirección
  const speedData = directions.map(dir => {
    const dirData = filteredData.filter(item => item.rd === dir);
    const averageSpeed = dirData.length > 0
      ? dirData.reduce((acc, curr) => acc + curr.sa, 0) / dirData.length
      : 0;
    return averageSpeed;
  });

  const chartData = {
    series: [{
      name: 'Velocidad del Viento',
      data: speedData
    }],
    options: {
      chart: {
        type: 'radar'
      },
      title: {
        text: `Velocidad del Viento y Dirección - Año ${selectedYear}`
      },
      xaxis: {
        categories: directions
      },
      yaxis: {
        labels: {
          formatter: function (val) {
            return val.toFixed(2);
          }
        }
      },
      theme: {
        mode: 'dark'
      }
    },
  };

  return (
    <div>
      <Select
        value={selectedYear}
        style={{ width: 120 }}
        onChange={setSelectedYear}
      >
        {years.map(year => (
          <Option key={year} value={year}>{year}</Option>
        ))}
      </Select>
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
