import { useState } from 'react';

import { DevTool } from '@hookform/devtools';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button,
  Typography,
  Container,
  Box,
  CircularProgress,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useForm, Controller } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';

import InputField from '@/components/formFields/inputField';
import FRONTEND_ROUTES from '@/utils/constants/frontend-routes';
import { showToast } from '@/utils/toast';

// Define the validation schema using Yup
const validationSchema = yup
  .object({
    email: yup
      .string()
      .email('Enter a valid email address')
      .required('Email is required'),
  })
  .required();

const ForgotPassword = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async () => {
    try {
      setIsLoading(true);

      // Simulate sending reset email
      setTimeout(() => {
        showToast.success('Password reset email sent successfully');
        reset();
        setIsLoading(false);
        navigate(FRONTEND_ROUTES.AUTH.SIGNIN);
      }, 2000);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
      showToast.error('Failed to send reset email');
    }
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
        <Typography variant='h5' fontWeight='bold' sx={{ marginBottom: 2 }}>
          Forgot Password
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
              'Send Reset Link'
            )}
          </Button>

          {errors?.email && (
            <Typography
              color='error'
              variant='body2'
              sx={{ textAlign: 'center', marginBottom: 2 }}
            >
              {errors.email?.message}
            </Typography>
          )}

          <Box sx={{ textAlign: 'center' }}>
            <Link to={FRONTEND_ROUTES.AUTH.SIGNIN} variant='body2'>
              Back to Login
            </Link>
          </Box>
        </form>

        <DevTool control={control} />
      </Box>
    </Container>
  );
};

export default ForgotPassword;
