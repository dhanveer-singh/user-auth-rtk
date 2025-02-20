import { Delete } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Swal from 'sweetalert2';

import CardWrapper from '@/components/cards';
import DataTable from '@/components/dataTable';
import HoverTooltip from '@/components/tooltip';
import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from '@/services/auth/authCreateApi';

const Users = () => {
   const { t } = useTranslation();
  const [deleteUser] = useDeleteUserMutation();
  const { data, isLoading } = useGetUsersQuery({ page: 1, limit: 10 });

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
        Swal.fire({
          title: 'Deleted!',
          text: 'User has been deleted.',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false,
        });
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
      <Typography variant='h4' component='h5'>{t('users')}</Typography>
      <CardWrapper>
        <DataTable columns={columns} rows={rows} isLoading={isLoading} />
      </CardWrapper>
    </Box>
  );
};

export default Users;
