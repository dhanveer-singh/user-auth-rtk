import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      sx={{
        textAlign: 'center',
        p: 2,
        backgroundColor: 'grey.200',
        mt: 'auto',
      }}
    >
      <Typography variant='body2'>
        © {new Date().getFullYear()} User Auth
      </Typography>
    </Box>
  );
};

export default Footer;
