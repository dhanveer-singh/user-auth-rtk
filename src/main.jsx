import { StrictMode } from 'react';

import { CssBaseline, ThemeProvider } from '@mui/material';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router';
import { PersistGate } from 'redux-persist/integration/react';

import './index.css';
import AppSnackbar from './components/snackBar';
import router from './routes/index';
import { store, persistStor } from './store/store';
import theme from './theme.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStor}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <RouterProvider router={router}></RouterProvider>
          <AppSnackbar />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </StrictMode>
);
