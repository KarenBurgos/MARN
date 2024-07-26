import dayjs from "dayjs";

  const FilterDataByMonth = (data, measure, includeAverage = false) => {
    const hours = ['07', '14', '21'];

    const dataFiltered = hours.map(hour => ({
      name: `${hour}:00`,
      data: data.map(item => {
        const measureKey = `${measure}${hour}`;
        return { 
          x: dayjs(item.fecha).date(), 
          y: item[measureKey] !== undefined ? item[measureKey] : 0 
        };
      })
    }));
  
    if (includeAverage) {
      const averageData = {
          name: 'Promedio',
          data: data.map(item => ({
              x: dayjs(item.fecha).date(),
              y: item[measure] !== undefined ? item[measure] : 0
          }))
      };

      dataFiltered.push(averageData);
  }

  return dataFiltered;
};

  export default FilterDataByMonth;