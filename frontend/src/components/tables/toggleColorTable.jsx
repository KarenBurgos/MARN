// ToggleColorTable.js
import React, { useMemo } from 'react';
import { ThemeProvider, createTheme, CssBaseline, Box } from '@mui/material';
import DataTable from '../tables/dataTable'; // Asegúrate de que la ruta sea correcta

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

