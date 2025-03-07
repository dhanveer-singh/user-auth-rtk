import { StrictMode } from 'react';

import { CssBaseline, ThemeProvider } from '@mui/material';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router';
import { ToastContainer } from 'react-toastify';
import { PersistGate } from 'redux-persist/integration/react';

import theme from './assets/styles/theme.js';
import router from './routes/index';
import { store, persistStor } from './store/store';

import './assets/styles/global.css';
import './utils/i18n';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStor}>
        <ThemeProvider theme={theme}>
          <ToastContainer
            position='top-right'
            autoClose={3000}
            newestOnTop
            closeOnClick
            pauseOnHover
          />
          <CssBaseline />
            <RouterProvider router={router}></RouterProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </StrictMode>
);
