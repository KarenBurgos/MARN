import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { DatePicker, Space } from 'antd';
import dayjs from 'dayjs';
import "../../../assets/style/antDesignCustom.css"

const { MonthPicker } = DatePicker;

function HeatMapByMonth({ data }) {
  const [selectedMonth, setSelectedMonth] = useState(dayjs('2018-05-01'));
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const month = selectedMonth.month();
    const year = selectedMonth.year();

    // Filtrar los datos según el mes y el año seleccionados
    const filtered = data.filter(item => dayjs(item.fecha).year() === year && dayjs(item.fecha).month() === month);

    // Formatear datos para el heatmap
    const heatmapData = [
      {
        name: '07:00',
        data: filtered.map(item => ({ x: dayjs(item.fecha).date(), y: item.ts07 !== undefined ? item.ts07 : 0 }))
      },
      {
        name: '14:00',
        data: filtered.map(item => ({ x: dayjs(item.fecha).date(), y: item.ts14 !== undefined ? item.ts14 : 0 }))
      },
      {
        name: '21:00',
        data: filtered.map(item => ({ x: dayjs(item.fecha).date(), y: item.ts21 !== undefined ? item.ts21 : 0 }))
      }
    ];

    setFilteredData(heatmapData);
  }, [selectedMonth, data]);

  const chartData = {
    series: filteredData,
    options: {
      chart: {
        height: 350,
        type: 'heatmap',
        background: '#303845'
      },
      plotOptions: {
        heatmap: {
          shadeIntensity: 1,
          colorScale: {
            ranges: [
              {
                from: 0,
                to: 0,
                color: '#FFFFFF',
                name: "Sin datos",
              },
              {
                from: 1,
                to: 17.9,
                color: '#C7F464',
                name: "0 - 17.9 °c",
              },
              {
                from: 18,
                to: 29.9,
                color: '#81D4FA',
                name: '18 - 29.9 °c',
              },
              {
                from: 30,
                to: 45,
                color: '#FD6A6A',
                name: '30 - 45 °c',
              },
            ],
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      title: {
        text: `Heatmap de Temperatura para ${selectedMonth.format('MMMM YYYY')}`,
        align: 'left',
      },
      xaxis: {
        title: {
          text: 'Día del Mes',
        },
      },
      yaxis: {
        title: {
          text: 'Hora del Día',
        },
        categories: ['07:00', '14:00', '21:00'],
      },
      theme: {
        mode: 'dark',
        palette: 'palette2',
        monochrome: {
          enabled: false,
          color: '#95FAFF', //color del grafico
          shadeTo: 'light',
          shadeIntensity: 0.65
        },
      }
    },
  };

  return (
    <div>
      <div className="flex w-full pb-5">
        <p className="text-nowrap pr-3 text-center self-center">Escoger Mes:</p>
        <Space direction="vertical" style={{ width: "100%" }} size={12}>
          <MonthPicker
            defaultValue={dayjs('2018-05-01')}
            onChange={(date) => setSelectedMonth(date)}
            picker="month"
          />
        </Space>
      </div>
      <div className="line-chart">
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="heatmap"
          height={300}
        />
      </div>
    </div>
  );
}

export default HeatMapByMonth;
