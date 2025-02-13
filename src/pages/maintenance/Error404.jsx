import { Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Error404 = () => {
  return (
    <Box sx={{ textAlign: 'center', padding: 4 }}>
      <Typography variant='h4' color='error' gutterBottom>
        404 - Page Not Found
      </Typography>
      <Typography variant='body1' gutterBottom>
        Sorry, the page youre looking for doesnt exist.
      </Typography>
      <Button component={Link} to='/' variant='contained' color='primary'>
        Go Back to Home
      </Button>
    </Box>
  );
};

export default Error404;
