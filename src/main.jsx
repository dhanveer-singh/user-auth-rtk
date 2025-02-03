import { StrictMode } from 'react';

import { ThemeProvider } from '@mui/material';
import { createRoot } from 'react-dom/client';

import './index.css';
import App from './App.jsx';
import theme from './theme.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </StrictMode>
);
