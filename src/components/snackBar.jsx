import { useEffect } from 'react';

import { Snackbar, Alert } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { closeSnackbar } from '@/services/snackbarSlice';

const AppSnackbar = () => {
  const dispatch = useDispatch();
  const { open, message, severity } = useSelector((state) => state.snackbar);

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        dispatch(closeSnackbar()); // Automatically close snackbar after 3 seconds
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [open, dispatch]);

  const handleClose = () => {
    dispatch(closeSnackbar());
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000} // Automatically hide after 3 seconds
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }} // You can adjust the position
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default AppSnackbar;
