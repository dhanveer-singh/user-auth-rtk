import { useState } from 'react';

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
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';

import InputField from '@/components/formFields/inputField';
import { useSignupMutation } from '@/services/auth/authCreateApi';
import FRONTEND_ROUTES from '@/utils/constants/frontend-routes';
import { showToast } from '@/utils/toast';

const validationSchema = yup
  .object({
    name: yup
      .string()
      .required('Full Name is required')
      .min(3, 'Name must be at least 3 characters')
      .max(30, 'Name cannot exceed 50 characters')
      .matches(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces'),
    email: yup
      .string()
      .email('Enter a valid email address')
      .required('Email is required'),
    password: yup
      .string()
      .required('Password is required')
      .min(6, 'Password should be at least 6 characters')
      .matches(/^\S*$/, 'Password cannot contain spaces'),
    confirmPassword: yup
      .string()
      .required('Confirm Password is required')
      .oneOf(
        [yup.ref('password'), null],
        'Confirm passwords must match with password'
      ),
  })
  .required();

const SignUp = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [signup, { isLoading, error }] = useSignupMutation();

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const inputType = showPassword ? 'text' : 'password';
  const confirmPasswordType = showConfirmPassword ? 'text' : 'password';

  const onSubmit = async (data) => {
    try {
      const response = await signup(data).unwrap();

      if (response?.data?.success) {
        showToast.success('Account created successfully!');
        navigate(FRONTEND_ROUTES?.AUTH?.SIGNIN);
      } else {
        if (response?.data?.errors?.fieldErrors) {
          Object.keys(response?.data?.errors?.fieldErrors).forEach(
            (errorKey) => {
              setError(errorKey, {
                type: 'server',
                message:
                  response?.data?.errors?.fieldErrors[errorKey].join(','),
              });
            }
          );
        }
      }
    } catch (err) {
      console.error('🚨 Signup Error:', err);
      showToast.error(
        err?.data?.message ||
          'An unexpected error occurred. Please try again later.'
      );
    }
  };

  return (
    <Container component='main' maxWidth='xs' sx={{ mt: 2 }}>
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
        <Typography variant='h5' sx={{ marginBottom: 2, fontWeight: 'bold' }}>
          Sign Up
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
          <Controller
            name='name'
            control={control}
            render={({ field }) => (
              <InputField
                {...field}
                label='Full Name'
                type='text'
                fullWidth
                error={!!errors.name}
                helperText={errors?.name?.message}
                autoComplete='name'
              />
            )}
          />

          <Controller
            name='email'
            control={control}
            render={({ field }) => (
              <InputField
                {...field}
                label='Email'
                type='email'
                fullWidth
                error={!!errors.email}
                helperText={errors?.email?.message}
                autoComplete='email'
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
                error={!!errors.password}
                helperText={errors?.password?.message}
                autoComplete='new-password'
              />
            )}
          />

          <Controller
            name='confirmPassword'
            control={control}
            render={({ field }) => (
              <InputField
                {...field}
                label='Confirm Password'
                type={confirmPasswordType}
                fullWidth
                endAdornment={
                  <IconButton
                    aria-label='toggle confirm password visibility'
                    onClick={handleClickShowConfirmPassword}
                    edge='end'
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                }
                sx={{ marginBottom: 3 }}
                error={!!errors.confirmPassword}
                helperText={errors?.confirmPassword?.message}
                autoComplete='new-password'
              />
            )}
          />

          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            sx={{ marginBottom: 2 }}
            disabled={isLoading}
          >
            {isLoading ? (
              <CircularProgress size={24} sx={{ color: 'white' }} />
            ) : (
              'Sign Up'
            )}
          </Button>

          <Box sx={{ textAlign: 'center', marginTop: 2 }}>
            <Typography variant='body2'>
              Already have an account?{' '}
              <Link to={FRONTEND_ROUTES?.AUTH?.SIGNIN} variant='body2'>
                Sign In
              </Link>
            </Typography>
            {error && (
              <Typography
                color='error'
                variant='body2'
                sx={{ textAlign: 'center', marginBottom: 2 }}
              >
                {error?.data?.message || 'Signup failed. Please try again.'}
              </Typography>
            )}
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default SignUp;
