import { useState, useEffect } from 'react';

import { Box, CircularProgress, Paper } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import InputField from '../formFields/inputField';

const DataTable = ({
  columns,
  rows,
  pageSizeOptions = [5, 10],
  checkboxSelection,
  height = 350,
  isLoading,
}) => {
  const [searchText, setSearchText] = useState('');
  const [filteredRows, setFilteredRows] = useState(rows);

  // Debounce function to limit the number of times the filter is applied
  useEffect(() => {
    const handler = setTimeout(() => {
      const newFilteredRows = rows.filter((row) =>
        Object.values(row).some(
          (value) =>
            value &&
            value.toString().toLowerCase().includes(searchText.toLowerCase())
        )
      );
      setFilteredRows(newFilteredRows);
    }, 300); // Adjust the debounce delay as needed

    return () => {
      clearTimeout(handler);
    };
  }, [searchText, rows]);

  return (
    <Box>
      {/* Search Input */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          mb: 1,
          position: 'sticky',
          top: 0,
          backgroundColor: '#fff',
          zIndex: 2,
        }}
      >
        <InputField
          label='Search'
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          sx={{ width: 250 }}
        />
      </Box>

      {/* DataGrid */}
      <Paper
        sx={{
          height,
          width: '100%',
          overflowX: 'auto',
          boxShadow: 0,
          position: 'relative',
        }}
      >
        <DataGrid
          rows={filteredRows}
          columns={columns}
          getRowId={(row) => row._id}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: pageSizeOptions[0] },
            },
          }}
          pageSizeOptions={pageSizeOptions}
          checkboxSelection={checkboxSelection}
          disableColumnResize
          disableColumnMenu
          disableRowSelectionOnClick
          sx={{
            border: 0,
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#f5f5f5', // Sticky header background
              position: 'sticky',
              top: 44, // Offset for search bar
              zIndex: 1,
            },
            '& .MuiDataGrid-row': {
              '&:hover': {
                backgroundColor: '#f5f5f5',
                cursor: 'pointer',
              },
            },
          }}
        />

        {/* Loader for Table Rows Only */}
        {isLoading && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.4)',
              zIndex: 2,
            }}
          >
            <CircularProgress />
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default DataTable;
