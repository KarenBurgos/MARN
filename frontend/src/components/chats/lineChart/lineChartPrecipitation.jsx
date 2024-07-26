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
        background: '#303845',
      },
      colors:['#49DCFF', '#FFA94D'],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: [0, 4],
      },
      title: {
        text: `Promedio de Precipitación y Lluvia Acumulada en ${selectedYear}`,
        align: 'center',
        style: {
          color: '#C1F0FF',
          fontSize: '16px'
        },
      },
      xaxis: {
        categories: months,
        style: {
          color: '#C1F0FF',
          fontSize: '16px'
        },
        title: {
          text: 'Mes',
          style: {
            color: '#C1F0FF',
            fontSize: '16px'
          },
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
            color: '#49DCFF',
          },
          labels: {
            style: {
              colors: '#49DCFF',
            },
          },
          title: {
            text: "Promedio de Precipitación (mm)",
            style: {
              color: '#49DCFF',
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
            color: '#FFA94D',
          },
          labels: {
            style: {
              colors: '#FFA94D',
            },
          },
          title: {
            text: "Promedio de Lluvia Acumulada (mm)",
            style: {
              color: '#FFA94D',
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
        show: true,
        labels: {
          colors: "#fff",
          useSeriesColors: false,
          width: 550,
        },
        itemMargin: {
          horizontal: 20,
        },
      },
      theme: {
        mode: 'light',
      }
    },
  };

  return (
    <div>
      <div className='flex pb-3'>
      <p className="text-nowrap pr-3 text-center self-center">Escoger Año:</p>
        <Select defaultValue={selectedYear} style={{ width: "100%"}} className="ant-selector-custom"onChange={handleYearChange} >
          {years.map(year => (
            <Option key={year} value={year}>{year}</Option>
          ))}
        </Select>
      </div>

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
