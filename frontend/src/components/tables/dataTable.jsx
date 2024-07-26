import React, { useMemo } from 'react';
import { ThemeProvider, createTheme, CssBaseline, Box, Button } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import * as XLSX from 'xlsx';

const DataTable = ({ data, columns }) => {
  const handleExportRows = (rows) => {
    const headers = columns.map((c) => c.header);
    const tableData = rows.map((row) => columns.map((col) => row.original[col.id]));

    const ws = XLSX.utils.aoa_to_sheet([headers, ...tableData]);
    
    // Ajustar el ancho de las columnas basado en los encabezados
    const maxLengths = headers.map(header => header.length);
    ws['!cols'] = maxLengths.map(len => ({ wch: len + 2 })); // Añadir algo de espacio

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Data');

    XLSX.writeFile(wb, 'data.xlsx');
  };

  const table = useMaterialReactTable({
    columns,
    data,
    enableRowSelection: true,
    columnFilterDisplayMode: 'popover',
    paginationDisplayMode: 'pages',
    positionToolbarAlertBanner: 'bottom',
    renderTopToolbarCustomActions: ({ table }) => (
      <Box
        sx={{
          display: 'flex',
          gap: '16px',
          padding: '1%',
        }}
      >
        <Button
          disabled={table.getPrePaginationRowModel().rows.length === 0}
          onClick={() => handleExportRows(table.getPrePaginationRowModel().rows)}
          startIcon={<FileDownloadIcon />}
        >
          Exportar todas las filas
        </Button>
        <Button
          disabled={table.getRowModel().rows.length === 0}
          onClick={() => handleExportRows(table.getRowModel().rows)}
          startIcon={<FileDownloadIcon />}
        >
          Exportar filas de la página actual
        </Button>
        <Button
          disabled={
            !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
          }
          onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
          startIcon={<FileDownloadIcon />}
        >
          Exportar filas seleccionadas
        </Button>
      </Box>
    ),
    muiTablePaginationProps: {
      labelRowsPerPage: 'Filas por página',
    },
  });

  return (
    <MaterialReactTable 
      table={table} 
      muiTableBodyProps={{
        sx: {
          backgroundColor: '#303845', // Fondo del cuerpo de la tabla
          color: '#fff', // Color del texto
        },
      }}
      muiTableContainerProps={{
        sx: {
          backgroundColor: '#303845', // Fondo del contenedor de la tabla
        },
      }}
      muiTableHeadCellProps={{
        sx: {
          backgroundColor: '#303845', // Fondo del encabezado de la tabla
          color: '#fff', // Color del texto del encabezado
        },
      }}
      muiTablePaginationProps={{
        sx: {
          color: '#fff', // Color del texto en la paginación
        },
        labelRowsPerPage: 'Filas por página',
      }}
    />
  );
};

const ToggleColorTable = ({ data, columns }) => {
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: 'dark',
          background: {
            default: '#303845', // Color de fondo personalizado
          },
        },
      }),
    []
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          padding: 2,
          backgroundColor: theme.palette.background.default,
          minHeight: '100vh',
        }}
      >
        <DataTable data={data} columns={columns} />
      </Box>
    </ThemeProvider>
  );
};

export default ToggleColorTable;
