import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// Vite alias setup
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src', // Optional: Set up alias for the `src` folder (if needed)
    },
  },
});
