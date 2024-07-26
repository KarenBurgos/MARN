import { createMRTColumnHelper } from 'material-react-table';

const columnHelper = createMRTColumnHelper();

const HumidityTableColumns = () => [
  columnHelper.accessor('fecha', {
    header: 'Fecha',
    size: 100,
  }),
  columnHelper.accessor('pvp07', {
    header: 'Presión a vapor 7:00 a.m. (mmHg)',
    size: 300,
    grow: true,
  }),
  columnHelper.accessor('pvp14', {
    header: 'Presión a vapor 2:00 p.m. (mmHg)',
    size: 300,
    grow: true,
  }),
  columnHelper.accessor('pvp21', {
    header: 'Presión a vapor 9:00 p.m. (mmHg)',
    size: 300,
    grow: true,
  }),
  columnHelper.accessor('pvp', {
    header: 'Presión a vapor promedio (mmHg)',
    size: 300,
    grow: true,
  }),
  columnHelper.accessor('hr07', {
    header: 'Humedad Relativa 7:00 a.m. (%)',
    size: 300,
    grow: true,
  }),
  columnHelper.accessor('hr14', {
    header: 'Humedad Relativa 2:00 p.m. (%)',
    size: 300,
    grow: true,
  }),
  columnHelper.accessor('hr21', {
    header: 'Humedad Relativa 9:00 p.m. (%)',
    size: 300,
    grow: true,
  }),
  columnHelper.accessor('hr', {
    header: 'Humedad Relativa promedio (%)',
    size: 300,
    grow: true,
  }),
  columnHelper.accessor('nub', {
    header: 'Nubosidad (decimas)',
    size: 300,
    grow: true,
  }),
  columnHelper.accessor('er07', {
    header: 'Estado de rocio 7:00 a.m.',
    size: 300,
    grow: true,
  }),
  columnHelper.accessor('er21', {
    header: 'Estado de rocio 9:00 p.m.',
    size: 300,
    grow: true,
  }),
];

export default HumidityTableColumns;
