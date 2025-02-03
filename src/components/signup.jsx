import { useState } from 'react';

import { TextField, Button, Typography, Container, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';

const Signup = () => {
  const theme = useTheme();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = (event) => {
    event.preventDefault();
    // Add your signup logic here
    console.log('Signing up with:', email, password);
  };

  return (
    <>
      <Container component='main' maxWidth='xs' sx={{ padding: 4 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: theme.palette.background.default,
            padding: theme.spacing(4),
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Typography variant='h5' sx={{ marginBottom: 2 }}>
            Signup
          </Typography>

          <form onSubmit={handleSignup} style={{ width: '100%' }}>
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              label='Email'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
              sx={{ marginBottom: 2 }}
            />

            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              label='Password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ marginBottom: 2 }}
            />

            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              label='Confirm Password'
              type='password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              sx={{ marginBottom: 3 }}
            />

            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              sx={{ marginBottom: 2 }}
            >
              Signup
            </Button>

            <Box sx={{ textAlign: 'center' }}>
              Already have an account?{' '}
              <Link to={'/'} variant='body2'>
                Login
              </Link>
            </Box>
          </form>
        </Box>
      </Container>
    </>
  );
};

export default Signup;
