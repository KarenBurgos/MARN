import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import { Select } from 'antd';
import dayjs from 'dayjs';

const { Option } = Select;

function calculateMonthlyValues(data, year) {
  const months = Array.from({ length: 12 }, (_, i) => dayjs().month(i).format('MMMM'));

  const monthlyValues = months.map((month, index) => {
    const monthlyData = data.filter(item => {
      const itemDate = dayjs(item.fecha);
      return itemDate.year() === year && itemDate.month() === index;
    });

    const averagePrecipitation = monthlyData.length > 0
      ? monthlyData.reduce((acc, curr) => acc + ((curr.p07 || 0) + (curr.p14 || 0) + (curr.p21 || 0)) / 3, 0) / monthlyData.length
      : 0;

    const averageRain = monthlyData.length > 0
      ? monthlyData.reduce((acc, curr) => acc + (curr.pd || 0), 0) / monthlyData.length
      : 0;
    return { month, averagePrecipitation: parseFloat(averagePrecipitation.toFixed(2)), averageRain: parseFloat(averageRain.toFixed(2)) };
  });

  return monthlyValues;
}

const LineChartPrecipitation = ({ data }) => {
  const [selectedYear, setSelectedYear] = useState(2018); // Año seleccionado por defecto es 2018
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const monthlyValues = calculateMonthlyValues(data, selectedYear);
    setFilteredData(monthlyValues);
  }, [data, selectedYear]);

  const handleYearChange = (value) => {
    setSelectedYear(value);
  };

  const years = Array.from(new Set(data.map(item => dayjs(item.fecha).year())));
  const months = Array.from({ length: 12 }, (_, i) => dayjs().month(i).format('MMMM'));

  const chartData = {
    series: [
      {
        name: 'Promedio de Precipitación',
        type: 'column',
        data: filteredData.map(item => item.averagePrecipitation),
      },
      {
        name: 'Promedio de Lluvia Acumulada',
        type: 'line',
        data: filteredData.map(item => item.averageRain),
      }
    ],
    options: {
      chart: {
        height: 350,
        type: 'line',
        stacked: false,
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: [0, 4],
      },
      title: {
        text: `Promedio de Precipitación y Lluvia Acumulada en ${selectedYear}`,
        align: 'left',
      },
      xaxis: {
        categories: months,
        title: {
          text: 'Mes',
        },
      },
      yaxis: [
        {
          seriesName: 'Promedio de Precipitación',
          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: true,
            color: '#008FFB',
          },
          labels: {
            style: {
              colors: '#008FFB',
            },
          },
          title: {
            text: "Promedio de Precipitación (mm)",
            style: {
              color: '#008FFB',
            },
          },
          tooltip: {
            enabled: true,
          },
        },
        {
          seriesName: 'Promedio de Lluvia Acumulada',
          opposite: true,
          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: true,
            color: '#00E396',
          },
          labels: {
            style: {
              colors: '#00E396',
            },
          },
          title: {
            text: "Promedio de Lluvia Acumulada (mm)",
            style: {
              color: '#00E396',
            },
          },
        },
      ],
      tooltip: {
        fixed: {
          enabled: true,
          position: 'topLeft',
          offsetY: 30,
          offsetX: 60,
        },
      },
      legend: {
        horizontalAlign: 'left',
        offsetX: 40,
      },
      theme:{
        mode:'dark'
      }
    },
  };

  return (
    <div>
      <Select defaultValue={selectedYear} style={{ width: 120 }} onChange={handleYearChange}>
        {years.map(year => (
          <Option key={year} value={year}>{year}</Option>
        ))}
      </Select>

      <Chart
        options={chartData.options}
        series={chartData.series}
        type="line"
        height={350}
      />
    </div>
  );
};

export default LineChartPrecipitation;
