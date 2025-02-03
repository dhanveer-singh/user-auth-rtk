import { useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Button, Typography, Container, Box, IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useForm, Controller } from 'react-hook-form';
import { Link } from 'react-router-dom';
import * as yup from 'yup';

import InputField from '@/components/formFields/inputField';

// Define the validation schema using Yup
const validationSchema = yup
  .object({
    email: yup
      .string()
      .email('Enter a valid email address')
      .required('Email is required'),
    password: yup
      .string()
      .min(6, 'Password should be at least 6 characters')
      .required('Password is required'),
  })
  .required();

const SignIn = () => {
  const theme = useTheme();

  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const inputType = showPassword ? 'text' : 'password';

  const onSubmit = (data) => {
    // Add your login logic here
    console.log('Logging in with:', data);
    // Show a success message or perform any post-login actions
    reset();
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

          <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
            <Controller
              name='email'
              control={control}
              render={({ field }) => (
                <InputField
                  {...field}
                  label='Email'
                  type='email'
                  fullWidth
                  autoFocus
                  sx={{ marginBottom: 2 }}
                  error={!!errors.email}
                  helperText={errors?.email?.message}
                />
              )}
            />

            <Controller
              name='password'
              control={control}
              render={({ field }) => (
                <InputField
                  {...field}
                  label='Password'
                  type={inputType}
                  fullWidth
                  endAdornment={
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={handleClickShowPassword}
                      edge='end'
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  }
                  sx={{ marginBottom: 3 }}
                  error={!!errors.password}
                  helperText={errors?.password?.message}
                />
              )}
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
              <Link to={'#'} variant='body2'>
                Forgot password?
              </Link>
            </Box>

            <Box sx={{ textAlign: 'center', marginTop: 2 }}>
              <Typography variant='body2'>
                Don’t have an account?{' '}
                <Link to={'/signup'} variant='body2'>
                  Signup
                </Link>
              </Typography>
            </Box>
          </form>
        </Box>
      </Container>
    </>
  );
};

export default SignIn;