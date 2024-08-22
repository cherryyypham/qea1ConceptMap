// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/qea1ConceptMap/',
  plugins: [react()],
  resolve: {
    alias: {
      '@utils': '/src/utils',
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  }
});
