import { Delete } from '@mui/icons-material';
import { Box, CircularProgress, IconButton, Typography } from '@mui/material';
import Swal from 'sweetalert2';

import CardWrapper from '@/components/cards';
import DataTable from '@/components/dataTable';
import HoverTooltip from '@/components/tooltip';
import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from '@/services/auth/authCreateApi';

const Users = () => {
  const [deleteUser] = useDeleteUserMutation();
  const { data, error, isLoading } = useGetUsersQuery({ page: 1, limit: 10 });
  
  if (isLoading) return <CircularProgress />;
  if (error) return <Typography color='error'>Error fetching users</Typography>;

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (confirm.isConfirmed) {
      try {
        await deleteUser(id).unwrap();
        Swal.fire('Deleted!', 'User has been deleted.', 'success');
      } catch (error) {
        Swal.fire('Error', 'Failed to delete user.', error);
      }
    }
  };

  const columns = [
    { field: '_id', headerName: 'ID', width: 220 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'name', headerName: 'Name', width: 200 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      renderCell: (params) => (
        <HoverTooltip title='Delete User' placement='bottom'>
          <IconButton
            color='error'
            onClick={() => handleDelete(params?.row?._id)}
          >
            <Delete />
          </IconButton>
        </HoverTooltip>
      ),
    },
  ];

  const rows = data?.data?.users || [];

  return (
    <Box>
      <Typography variant='h4' component='h5'>
        Users
      </Typography>
      <CardWrapper>
        <DataTable columns={columns} rows={rows} isLoading={isLoading} />
      </CardWrapper>
    </Box>
  );
};

export default Users;
