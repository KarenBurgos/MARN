import { createMRTColumnHelper } from 'material-react-table';

const columnHelper = createMRTColumnHelper();

const TemperatureTableColumns = () => [
  columnHelper.accessor('fecha', {
    header: 'Fecha',
    size: 100,
  }),
  columnHelper.accessor('tmax', {
    header: 'Temperatura máxima (°C)',
    grow: true, 
    size: 250, 
  }),
  columnHelper.accessor('tmin', {
    header: 'Temperatura mínima (°C)',
    size: 250,
    grow: true, 
  }),
  columnHelper.accessor('ts07', {
    header: 'Temperatura 7:00 a.m. (°C)',
    size: 250,
    grow: true,
  }),
  columnHelper.accessor('ts14', {
    header: 'Temperatura 2:00 p.m. (°C)',
    size: 250,
    grow: true,
  }),
  columnHelper.accessor('ts21', {
    header: 'Temperatura 9:00 p.m. (°C)',
    size: 250,
    grow: true,
  }),
  columnHelper.accessor('ts', {
    header: 'Temperatura Media (°C)',
    size: 250,
    grow: true,
  }),
  columnHelper.accessor('th07', {
    header: 'Temperatura humeda 7:00 a.m. (°C)',
    size: 250,
    grow: true,
  }),
  columnHelper.accessor('th14', {
    header: 'Temperatura humeda 2:00 p.m. (°C)',
    size: 250,
    grow: true,
  }),
  columnHelper.accessor('th21', {
    header: 'Temperatura humeda 9:00 p.m. (°C)',
    size: 250,
    grow: true,
  }),
  columnHelper.accessor('th', {
    header: 'Temperatura Húmeda promedio (°C)',
    size: 250,
    grow: true,
  }),
];

export default TemperatureTableColumns;
