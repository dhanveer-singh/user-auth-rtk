import { useCallback, useEffect, useState } from 'react';

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
import AutoCompleteInput from '@/components/mapAutoCompleteInput/AutoCompleteInput';
import { useSignupMutation } from '@/services/auth/authCreateApi';
import FRONTEND_ROUTES from '@/utils/constants/frontend-routes';
import { showToast } from '@/utils/toast';

const validationSchema = yup
  .object({
    name: yup
      .string()
      .required('Full Name is required')
      .min(3, 'Name must be at least 3 characters')
      .max(30, 'Name cannot exceed 30 characters')
      .matches(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces'),
    email: yup
      .string()
      .email('Enter a valid email address')
      .required('Email is required'),
    password: yup
      .string()
      .required('Password is required')
      .min(6, 'Password should at least 6 characters')
      .matches(/^\S*$/, 'Password cannot contain spaces'),
    confirmPassword: yup
      .string()
      .required('Confirm Password is required')
      .oneOf(
        [yup.ref('password'), null],
        'Confirm passwords must match with password'
      ),
    location: yup.string().required('Location is required'),
    city: yup.string().required('City is required'),
    state: yup.string().required('State is required'),
    country: yup.string().required('Country is required'),
  })
  .required();

const SignUp = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [visibility, setVisibility] = useState({
    password: false,
    confirmPassword: false,
  });
  const toggleVisibility = (key) =>
    setVisibility((prev) => ({ ...prev, [key]: !prev[key] }));

  const [signup, { isLoading, error }] = useSignupMutation();

  const [selectedLocation, setSelectedLocation] = useState(null);

  const {
    control,
    setError,
    clearErrors,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      location: '',
      city: '',
      state: '',
      country: '',
    },
  });

  useEffect(() => {
    if (selectedLocation) {
      setValue('location', selectedLocation.name, { shouldValidate: true });
      setValue('city', selectedLocation.city, { shouldValidate: true });
      setValue('state', selectedLocation.state, { shouldValidate: true });
      setValue('country', selectedLocation.country, { shouldValidate: true });
      clearErrors(['location', 'city', 'state', 'country']);
    }
  }, [selectedLocation, setValue, clearErrors]);
  const handleLocationSelect = useCallback((locationData) => {
    setSelectedLocation(locationData);
  }, []);
  const onSubmit = async (data) => {    
    try {
      const response = await signup(data).unwrap();
      console.log("response", response);
      
      if (response?.success) {
        showToast.success(await response?.message || "User registered successfully");
        navigate(FRONTEND_ROUTES?.AUTH?.SIGNIN);
      } else {
        if (response?.fieldErrors) {
          Object.keys(response?.fieldErrors).forEach(
            (errorKey) => {              
              setError(errorKey, {
                type: 'server',
                message: response?.fieldErrors[errorKey].join(', '),
              });
            }
          );
        }
      }
    } catch (err) {
      console.error('🚨 Signup Error:', err);
      showToast.error(
        err?.message ||
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
                type={visibility.password ? 'text' : 'password'}
                fullWidth
                endAdornment={
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={()=>toggleVisibility('password')}
                    edge='end'
                  >
                    {visibility.password ? <VisibilityOff /> : <Visibility />}
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
                type={visibility.confirmPassword ? 'text' : 'password'}
                fullWidth
                endAdornment={
                  <IconButton
                    aria-label='toggle confirm password visibility'
                    onClick={()=>toggleVisibility('confirmPassword')}
                    edge='end'
                  >
                    {visibility.confirmPassword ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                }
                error={!!errors.confirmPassword}
                helperText={errors?.confirmPassword?.message}
                autoComplete='new-password'
              />
            )}
          />
          <Controller
            name='location'
            control={control}
            render={({ field }) => (
              <AutoCompleteInput
                {...field}
                label='Search Address'
                placeholder='Start typing your address...'
                error={!!errors.location}
                helperText={errors.location?.message}
                onSelect={handleLocationSelect}
              />
            )}
          />
          <Controller
            name='city'
            control={control}
            render={({ field }) => (
              <InputField
                {...field}
                label='City'
                fullWidth
                error={!!errors.city}
                helperText={errors?.city?.message}
              />
            )}
          />

          <Controller
            name='state'
            control={control}
            render={({ field }) => (
              <InputField
                {...field}
                label='State'
                fullWidth
                error={!!errors.state}
                helperText={errors?.state?.message}
              />
            )}
          />

          <Controller
            name='country'
            control={control}
            render={({ field }) => (
              <InputField
                {...field}
                label='Country'
                fullWidth
                error={!!errors.country}
                helperText={errors?.country?.message}
                sx={{ marginBottom: 3 }}
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
