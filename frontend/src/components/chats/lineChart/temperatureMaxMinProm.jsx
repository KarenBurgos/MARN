import dayjs from "dayjs";
import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { Select } from "antd";

const { Option } = Select;

function calculateMonthlyValues(data, year) {
  const months = Array.from({ length: 12 }, (_, i) => dayjs().month(i).format('MMMM'));

  const monthlyValues = months.map((month, index) => {
    const monthlyData = data.filter(item => {
      const itemDate = dayjs(item.fecha);
      return itemDate.year() === year && itemDate.month() === index;
    });

    const tmax = monthlyData.length > 0
      ? Math.max(...monthlyData.map(item => item.tmax))
      : 0;

    const tmin = monthlyData.length > 0
      ? Math.min(...monthlyData.map(item => item.tmin))
      : 0;

    const ts = monthlyData.length > 0
      ? monthlyData.reduce((acc, curr) => acc + (curr.ts || 0), 0) / monthlyData.length
      : 0;

    return { month, tmax, tmin, ts };
  });

  return monthlyValues;
}

function TemperatureMaxMinProm({ data }) {
  const [filteredData, setFilteredData] = useState([]);
  const [selectedYear, setSelectedYear] = useState(2018); // Año seleccionado por defecto es 2018

  useEffect(() => {
    const monthlyValues = calculateMonthlyValues(data, selectedYear);
    setFilteredData(monthlyValues);
  }, [data, selectedYear]);

  const years = Array.from(new Set(data.map(item => dayjs(item.fecha).year())));
  const months = Array.from({ length: 12 }, (_, i) => dayjs().month(i).format('MMMM'));

  const chartData = {
    series: [
      {
        name: 'Temperatura Máxima',
        data: filteredData.map(item => item.tmax),
      },
      {
        name: 'Temperatura Mínima',
        data: filteredData.map(item => item.tmin),
      },
      {
        name: 'Temperatura Promedio',
        data: filteredData.map(item => item.ts),
      }
    ],
    options: {
      chart: {
        height: 350,
        type: 'bar',
        background: '#303845'
      },
      plotOptions: {
        bar: {
          dataLabels: {
            position: 'top',
          },
        },
      },
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return val.toFixed(2) + "°C";
        },
        offsetY: -20,
        style: {
          fontSize: '12px',
          colors: ["#fff"]
        }
      },
      title: {
        text: `Temperatura por Mes en ${selectedYear}`,
        align: 'left',
      },
      xaxis: {
        categories: months,
        title: {
          text: 'Mes',
        },
      },
      yaxis: {
        title: {
          text: 'Temperatura (°C)',
        },
        labels: {
          formatter: function (val) {
            return Math.round(val);
          }
        }
      },
      theme: {
        mode: 'dark',
      }
    },
  };

  const handleYearChange = (value) => {
    setSelectedYear(value);
  };

  return (
    <>
      <Select defaultValue={selectedYear} style={{ width: 120 }} onChange={handleYearChange}>
        {years.map(year => (
          <Option key={year} value={year}>{year}</Option>
        ))}
      </Select>
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="bar"
        height={500}
      />
    </>
  );
}

export default TemperatureMaxMinProm;
