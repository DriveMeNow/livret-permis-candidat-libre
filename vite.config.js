import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,  // accepte toutes les connexions externes
    allowedHosts: [
      '.ngrok-free.app' // autorise tous les sous-domaines ngrok
    ]
  }
});
