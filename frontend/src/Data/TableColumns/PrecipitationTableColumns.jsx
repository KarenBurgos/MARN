import { createMRTColumnHelper } from 'material-react-table';

const columnHelper = createMRTColumnHelper();

const PrecipitationTableColumns = () => [
  columnHelper.accessor('fecha', {
    header: 'Fecha',
    size: 100,
  }),
  columnHelper.accessor('p07', {
    header: 'Precipitación 7:00 a.m. (mm)',
    size: 200,
    grow: true,
  }),
  columnHelper.accessor('p14', {
    header: 'Precipitación 2:00 p.m. (mm)',
    size: 200,
    grow: true,
  }),
  columnHelper.accessor('p21', {
    header: 'Precipitación 9:00 p.m. (mmHg)',
    size: 200,
    grow: true,
  }),
  columnHelper.accessor('pd', {
    header: 'Lluvia diaria (mm)',
    size: 200,
    grow: true,
  }),
];

export default PrecipitationTableColumns;
