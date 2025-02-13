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

// Define validation schema using Yup
const validationSchema = yup
  .object({
    name: yup.string().required('Full Name is required'),
    email: yup
      .string()
      .email('Enter a valid email address')
      .required('Email is required'),
    password: yup
      .string()
      .min(6, 'Password should be at least 6 characters')
      .matches(/^\S*$/, 'Password cannot contain spaces') // No spaces allowed
      .required('Password is required'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
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
    const response = await signup(data).unwrap();
    console.log('Signing up with:', response, error);
    response?.success && navigate('/');
  };

  return (
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
          Sign Up
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
          {/* Full Name Input */}
          <Controller
            name='name'
            control={control}
            render={({ field }) => (
              <InputField
                {...field}
                label='Full Name'
                type='text'
                fullWidth
                sx={{ marginBottom: 2 }}
                error={!!errors.name}
                helperText={errors?.name?.message}
                autoComplete='name'
              />
            )}
          />

          {/* Email Input */}
          <Controller
            name='email'
            control={control}
            render={({ field }) => (
              <InputField
                {...field}
                label='Email'
                type='email'
                fullWidth
                sx={{ marginBottom: 2 }}
                error={!!errors.email}
                helperText={errors?.email?.message}
                autoComplete='email'
              />
            )}
          />

          {/* Password Input */}
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
                sx={{ marginBottom: 2 }}
                error={!!errors.password}
                helperText={errors?.password?.message}
                autoComplete='new-password'
              />
            )}
          />

          {/* Confirm Password Input */}
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

          {/* Submit Button */}
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

          {/* Link to Forgot Password */}
          <Box sx={{ textAlign: 'center' }}>
            <Link to={'#'} variant='body2'>
              Forgot password?
            </Link>
          </Box>

          {/* Link to Sign In */}
          <Box sx={{ textAlign: 'center', marginTop: 2 }}>
            <Typography variant='body2'>
              Already have an account?{' '}
              <Link to={'/auth/signin'} variant='body2'>
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
