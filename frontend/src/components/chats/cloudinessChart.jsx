import React from 'react';
import Chart from 'react-apexcharts';

const CloudinessLineChart = () => {
    const options = {
        chart: {
          id: 'cloudiness-area-chart',
          type: 'area'
        },
        xaxis: {
          categories: ['07:00', '12:00', '14:00', 'Promedio']
        },
        yaxis: {
          title: {
            text: 'Nubosidad (%)'
          }
        },
        fill: {
          type: 'gradient',
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.5,
            opacityTo: 0.1,
            stops: [0, 100]
          }
        },
        stroke: {
          curve: 'smooth'
        },
        tooltip: {
          shared: true,
          intersect: false
        }
      };
    
      const series = [
        {
          name: 'Nubosidad',
          data: [60, 80, 70, 72.5]
        }
      ];
    
      return (
        <div>
          <Chart options={options} series={series} type="area" height={300} />
        </div>
      );
    };

export default CloudinessLineChart;
