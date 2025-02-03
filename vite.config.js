import path from 'path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// Get the directory name using import.meta.url
const __dirname = path.dirname(new URL(import.meta.url).pathname);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
