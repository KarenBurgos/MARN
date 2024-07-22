import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import dayjs from 'dayjs';
import { DatePicker, Space } from "antd";

const { RangePicker } = DatePicker;

function HeatMap({ data }) {
  const [startDate, setStartDate] = useState(dayjs('2018-05-01').toDate());
  const [endDate, setEndDate] = useState(dayjs('2018-05-30').toDate());
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    // Filtrar los datos según las fechas seleccionadas
    const filtered = data.filter(item => new Date(item.fecha) >= startDate && new Date(item.fecha) <= endDate);
    
    // Formatear datos para el heatmap
    const heatmapData = [
      {
        name: '07:00',
        data: filtered.map(item => ({ x: item.fecha, y: item.ts07 }))
      },
      {
        name: '14:00',
        data: filtered.map(item => ({ x: item.fecha, y: item.ts14 }))
      },
      {
        name: '21:00',
        data: filtered.map(item => ({ x: item.fecha, y: item.ts21 }))
      }
    ];
    
    setFilteredData(heatmapData);
  }, [startDate, endDate, data]);

  const chartData = {
    series: filteredData,
    options: {
      chart: {
        height: 350,
        type: 'heatmap',
        background: '#ffffff',
      },
      plotOptions: {
        heatmap: {
          shadeIntensity: 0.5,
          colorScale: {
            ranges: [
              {
                from: -10,
                to: 17,
                color: '#00A100',
                name: 'bajo',
              },
              {
                from: 17,
                to: 30,
                color: '#128FD9',
                name: 'medio',
              },
              {
                from: 30,
                to: 33,
                color: '#FFB200',
                name: 'alto',
              },
              {
                from: 33,
                to: 40,
                color: '#FF0000',
                name: 'muy alto',
              },
            ],
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      title: {
        text: 'Heatmap de Temperatura para Junio',
        align: 'left',
      },
      xaxis: {
        type: 'datetime',
        title: {
          text: 'Fecha',
        },
      },
      yaxis: {
        title: {
          text: 'Hora del Día',
        },
        categories: ['07:00', '14:00', '21:00'],
      },
      theme: {
        color: 'dark'
      }
    },
  };

  const handleDateChange = (dates) => {
    if (dates) {
      setStartDate(dates[0].toDate());
      setEndDate(dates[1].toDate());
    } else {
      setStartDate(dayjs('2018-05-01').toDate());
      setEndDate(dayjs('2018-12-31').toDate());
    }
  };

  return (
    <div className="line-chart w-full my-10">
      <Space direction="vertical" size={12}>
        <RangePicker
          defaultValue={[dayjs('2018-05-01'), dayjs('2018-05-30')]}
          onChange={handleDateChange}
        />
      </Space>
      <div>
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="heatmap"
        height={200}
      />  
      </div>
      
    </div>
  );
}
export default HeatMap;