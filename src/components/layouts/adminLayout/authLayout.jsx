import { Box, Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';

import { flexCenter } from '@/assets/styles/mixins';

const AuthLayout = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <Box
        sx={{
          ...flexCenter,
          gap: 2,
          mt: 2,
        }}
      >
        <Box
          component='svg'
          viewBox='0 0 24 24'
          width={60}
          height={60}
          fill='gray'
        >
          <path d='M12 1 3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11z'></path>
        </Box>
        <Typography variant='h5' fontWeight='bold'>
          Auth User
        </Typography>
      </Box>
      <Outlet />
    </Box>
  );
};

export default AuthLayout;
