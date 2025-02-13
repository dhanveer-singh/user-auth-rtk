import { Box, Typography } from '@mui/material';

// import { CircularProgress, Typography } from '@mui/material';

// import { useGetUsersQuery } from '@/services/auth/authCreateApi';

// const Users = () => {
//   const { data, error, isLoading } = useGetUsersQuery({ page: 1, limit: 10 });

//   if (isLoading) return <CircularProgress />;
//   if (error) return <Typography color='error'>Error fetching users</Typography>;

//   return (
//     <div>
//       <Typography variant='h4'>User List</Typography>
//       {data?.users?.length ? (
//         <ul>
//           {data?.users?.map((user) => (
//             <li key={user.id}>
//               {user.name} - {user.email}
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <Typography>No users found</Typography>
//       )}
//     </div>
//   );
// };

// export default Users;

const users = () => {
  return (
    <Box>
      <Typography variant='h4' component='h5'>
        Users
      </Typography>
    </Box>
  );
};

export default users;
