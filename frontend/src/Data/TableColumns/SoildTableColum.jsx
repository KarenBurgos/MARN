import { createMRTColumnHelper } from 'material-react-table';
import SoilConditionCategory from '../../services/soilConditionCategory';

const columnHelper = createMRTColumnHelper();

const SoilTableColumns = () => [
  columnHelper.accessor('fecha', {
    header: 'Fecha',
    size: 100,
  }),
  columnHelper.accessor('es07', {
    header: 'Estado del suelo 7:00 a.m.',
    grow: true, 
    size: 250,
    Cell: ({ cell }) => SoilConditionCategory(cell.getValue()),
  }),
  columnHelper.accessor('es14', {
    header: 'Estado del suelo 2:00 p.m.',
    grow: true, 
    size: 250,
    Cell: ({ cell }) => SoilConditionCategory(cell.getValue()),
  }),
  columnHelper.accessor('es21', {
    header: 'Estado del suelo 9:00 p.m.',
    size: 250,
    grow: true,
    Cell: ({ cell }) => SoilConditionCategory(cell.getValue()),
  }),
];

export default SoilTableColumns;
