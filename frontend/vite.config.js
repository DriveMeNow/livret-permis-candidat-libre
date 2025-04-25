import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.js'],
  root: './frontend',
  build: {
    outDir: '../backend/public/dist',
    emptyOutDir: true,
  },
  server: {
    host: true,
    allowedHosts: ['.ngrok-free.app']
  }
});
