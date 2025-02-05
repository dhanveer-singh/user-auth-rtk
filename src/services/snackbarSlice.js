import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  open: false,
  message: '',
  severity: 'success', // Could be 'success', 'error', 'warning', 'info'
};

const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    openSnackbar: (state, action) => {
      state.open = true;
      state.message = action.payload.message;
      state.severity = action.payload.severity || 'success'; // Default to 'success'
    },
    closeSnackbar: (state) => {
      state.open = false;
      state.message = '';
      state.severity = 'success';
    },
  },
});

export const { openSnackbar, closeSnackbar } = snackbarSlice.actions;
export default snackbarSlice.reducer;
