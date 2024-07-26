import dayjs from "dayjs";

const filterDataByYear = (data, measure) => {
  const years = Array.from(new Set(data.map(item => dayjs(item.fecha).year())));
  const months = Array.from({ length: 12 }, (_, i) => dayjs().month(i).format('MMMM'));

  // Inicializar estructura de datos
  const filteredData = years.map(year => ({
    name: year.toString(),
    data: months.map((month, index) => {
      const monthlyData = data.filter(item => {
        const itemDate = dayjs(item.fecha);
        return itemDate.year() === year && itemDate.month() === index;
      });

      const average = monthlyData.length > 0
        ? monthlyData.reduce((acc, curr) => acc + (curr[measure] || 0), 0) / monthlyData.length
        : 0;

      return { x: month, y: average };
    })
  }));

  return filteredData;
}

export default filterDataByYear;