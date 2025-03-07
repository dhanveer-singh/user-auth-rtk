import { useState } from 'react';

import { DevTool } from '@hookform/devtools';
import { yupResolver } from '@hookform/resolvers/yup';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Button,
  Typography,
  Container,
  Box,
  IconButton,
  CircularProgress,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';

import InputField from '@/components/formFields/inputField';
import { useLoginMutation } from '@/services/auth/authCreateApi';
import { setUser } from '@/services/auth/authSlice';
import FRONTEND_ROUTES from '@/utils/constants/frontend-routes';
import { showToast } from '@/utils/toast';

const emailRegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Define the validation schema using Yup
const validationSchema = yup
  .object({
    email: yup
      .string()
     .matches(emailRegEx, 'Enter a valid email address')
      .required('Email is required'),
    password: yup
      .string()
      .required('Password is required')
      .min(6, 'Password should be at least 6 characters'),
  })
  .required();

const SignIn = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);

  // Initialize the login mutation hook from the API slice
  const [login, { isLoading, error }] = useLoginMutation();

  const {
    control,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const inputType = showPassword ? 'text' : 'password';

  const onSubmit = async (data) => {
    try {
      const response = await login(data).unwrap();
console.log("response", response);

      if (response.success) {
        showToast.success(response?.message);
        dispatch(
          setUser({
            token: response?.data?.token,
            user: {
              email: response?.data?.user?.email,
              name: response?.data?.user?.name,
            },
          })
        );
        response?.success && navigate(FRONTEND_ROUTES?.DASHBOARD);
        reset();
      } else {
        if (response?.data?.fieldErrors) {
          Object.keys(response?.data?.fieldErrors).forEach(
            (errorKey) => {
              setError(errorKey, {
                type: 'server',
                message: response?.data?.fieldErrors[errorKey].join(','),
              });
            }
          );
        }
      }
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  return (
    <Container component='main' maxWidth='xs' sx={{ padding: 4 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: theme?.palette?.background?.default,
          padding: theme.spacing(4),
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant='h5' fontWeight='bold' sx={{ marginBottom: 2 }}>
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
                autoComplete='username'
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
                autoComplete='current-password'
              />
            )}
          />

          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            sx={{ marginBottom: 2 }}
            // disabled={isLoading || !isValid}
          >
            {isLoading ? (
              <CircularProgress size={24} sx={{ color: 'white' }} />
            ) : (
              'Login'
            )}
          </Button>

          {error && (
            <Typography
              color='error'
              variant='body2'
              sx={{ textAlign: 'center', marginBottom: 2 }}
            >
              {error?.message || 'Login failed. Please try again.'}
            </Typography>
          )}

          <Box sx={{ textAlign: 'center' }}>
            <Link to={FRONTEND_ROUTES?.AUTH?.FORGOT_PASSWORD} variant='body2'>
              Forgot password?
            </Link>
          </Box>

          <Box sx={{ textAlign: 'center', marginTop: 2 }}>
            <Typography variant='body2'>
              Don’t have an account?{' '}
              <Link to={FRONTEND_ROUTES?.AUTH?.SIGNUP} variant='body2'>
                Signup
              </Link>
            </Typography>
          </Box>
        </form>
        <DevTool control={control} />
      </Box>
    </Container>
  );
};

export default SignIn;
