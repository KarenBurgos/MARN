import { Select } from 'antd';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import Chart from 'react-apexcharts';

const { Option } = Select;

const RRadarChartWind = ({ data }) => {
  const [selectedYear, setSelectedYear] = useState(dayjs().year());
  const [selectedMonth, setSelectedMonth] = useState(dayjs().month() + 1); // Mes seleccionado por defecto es el mes actual

  // Obtener años únicos de los datos
  const years = Array.from(new Set(data.map(item => dayjs(item.fecha).year())));

  // Obtener meses
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  // Filtrar datos según el año y mes seleccionados
  const filteredData = data.filter(item => dayjs(item.fecha).year() === selectedYear && dayjs(item.fecha).month() + 1 === selectedMonth);

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
        text: `Velocidad del Viento y Dirección - ${dayjs().month(selectedMonth - 1).format('MMMM')} ${selectedYear}`
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
        style={{ width: 120, marginRight: 20 }}
        onChange={setSelectedYear}
      >
        {years.map(year => (
          <Option key={year} value={year}>{year}</Option>
        ))}
      </Select>
      <Select
        value={selectedMonth}
        style={{ width: 120 }}
        onChange={setSelectedMonth}
      >
        {months.map(month => (
          <Option key={month} value={month}>{dayjs().month(month - 1).format('MMMM')}</Option>
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

export default RRadarChartWind;
