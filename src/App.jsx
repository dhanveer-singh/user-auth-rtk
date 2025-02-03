import './App.css';
import { useState } from 'react';

import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  Link,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

function App() {
  const theme = useTheme();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (event) => {
    event.preventDefault();
    // Add your login logic here
    console.log('Logging in with:', email, password);
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
            Login
          </Typography>

          <form onSubmit={handleLogin} style={{ width: '100%' }}>
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
              sx={{ marginBottom: 3 }}
            />

            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              sx={{ marginBottom: 2 }}
            >
              Login
            </Button>

            <Box sx={{ textAlign: 'center' }}>
              <Link href='#' variant='body2'>
                Forgot password?
              </Link>
            </Box>

            <Box sx={{ textAlign: 'center', marginTop: 2 }}>
              <Typography variant='body2'>
                Dont have an account?{' '}
                <Link href='#' variant='body2'>
                  Sign Up
                </Link>
              </Typography>
            </Box>
          </form>
        </Box>
      </Container>
    </>
  );
}

export default App;
