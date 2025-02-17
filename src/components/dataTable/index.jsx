import Paper from '@mui/material/Paper';
import { DataGrid } from '@mui/x-data-grid';

const DataTable = ({
  columns,
  rows,
  pageSizeOptions = [5, 10],
  checkboxSelection,
  height = 400,
}) => {
  return (
    <Paper sx={{ height, width: '100%', overflowX: 'auto', boxShadow: 0 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row._id}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: pageSizeOptions[0] },
          },
        }}
        pageSizeOptions={pageSizeOptions}
        checkboxSelection={checkboxSelection}
        sx={{
          border: 0,
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: '#f5f5f5', // Sticky header background
            position: 'sticky',
            top: 0,
            zIndex: 1,
          },
          '& .MuiDataGrid-row': {
            '&:hover': {
              backgroundColor: '#f5f5f5', // Hover effect
              cursor: 'pointer',
            },
          },
        }}
      />
    </Paper>
  );
};

export default DataTable;
