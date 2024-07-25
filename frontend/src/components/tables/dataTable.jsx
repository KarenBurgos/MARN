import React, { useMemo, useState, useContext } from 'react';
import {
  MaterialReactTable,
  createMRTColumnHelper,
  useMaterialReactTable,
} from 'material-react-table';
import { Box, Button, ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

// Define el ColorModeContext
const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

const columnHelper = createMRTColumnHelper();

const DataTable = ({ data }) => {
  const columns = [
    columnHelper.accessor('fecha', {
      header: 'Fecha',
      size: 100,
    }),
    columnHelper.accessor('tmax', {
      header: 'Temperatura máxima (°C)',
      size: 100,
    }),
    columnHelper.accessor('tmin', {
      header: 'Temperatura mínima (°C)',
      size: 100,
    }),
    columnHelper.accessor('ts', {
      header: 'Temperatura promedio (°C)',
      size: 100,
    }),
    columnHelper.accessor('th', {
      header: 'Temperatura Húmeda (°C)',
      size: 100,
    }),
  ];

  const handleExportRows = (rows) => {
    const doc = new jsPDF();
    const tableHeaders = columns.map((c) => c.header);
    const tableData = rows.map((row) => {
      return columns.map((col) => row.original[col.id]);
    });

    autoTable(doc, {
      head: [tableHeaders],
      body: tableData,
    });

    doc.save('data.pdf');
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
          Export All Rows
        </Button>
        <Button
          disabled={table.getRowModel().rows.length === 0}
          onClick={() => handleExportRows(table.getRowModel().rows)}
          startIcon={<FileDownloadIcon />}
        >
          Export Page Rows
        </Button>
        <Button
          disabled={
            !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
          }
          onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
          startIcon={<FileDownloadIcon />}
        >
          Export Selected Rows
        </Button>
      </Box>
    ),
  });

  return <MaterialReactTable table={table} />;
};

const ToggleColorMode = ({ data }) => {
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: 'dark', // Set default mode to dark
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
        <DataTable data={data} />
      </Box>
    </ThemeProvider>
  );
};

export default ToggleColorMode;
