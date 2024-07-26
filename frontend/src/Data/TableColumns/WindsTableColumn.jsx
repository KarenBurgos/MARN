import { createMRTColumnHelper } from 'material-react-table';

const columnHelper = createMRTColumnHelper();

const WindTableColumns = () => [
  columnHelper.accessor('fecha', {
    header: 'Fecha',
    size: 100,
  }),
  columnHelper.accessor('sa07', {
    header: 'Velocidad del viento 7:00 a.m. (Beaufort)',
    grow: true, 
    size: 250, 
  }),
  columnHelper.accessor('sa14', {
    header: 'Velocidad del viento 2:00 p.m. (Beaufort)',
    size: 250,
    grow: true, 
  }),
  columnHelper.accessor('sa21', {
    header: 'Velocidad del viento 9:00 p.m. (Beaufort)',
    size: 250,
    grow: true,
  }),
  columnHelper.accessor('sa', {
    header: 'Velocidad del viento promedio (Beaufort)',
    size: 250,
    grow: true,
  }),
  columnHelper.accessor('rd07', {
    header: 'Dirección del viento 7:00 a.m.',
    size: 250,
    grow: true,
  }),
  columnHelper.accessor('rd14', {
    header: 'Dirección del viento 2:00 a.m.',
    size: 250,
    grow: true,
  }),
  columnHelper.accessor('rd21', {
    header: 'Dirección del viento 9:00 a.m.',
    size: 250,
    grow: true,
  }),
  columnHelper.accessor('rd21', {
    header: 'Dirección del viento Promedio',
    size: 250,
    grow: true,
  }),
  columnHelper.accessor('vis07', {
    header: 'Visibilidad 7:00 a.m.',
    size: 250,
    grow: true,
  }),
  columnHelper.accessor('vis14', {
    header: 'Visibilidad 2:00 p.m.',
    size: 250,
    grow: true,
  }),
  columnHelper.accessor('vis21', {
    header: 'Visibilidad 9:00 p.m.',
    size: 250,
    grow: true,
  }),
];

export default WindTableColumns;
