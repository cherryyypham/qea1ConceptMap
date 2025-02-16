import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  base: '/qea1ConceptMap/',
  plugins: [react(), visualizer()],
  resolve: {
    alias: {
      '@utils': '/src/utils',
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  build: {
    chunkSizeWarningLimit: 1000, // kB
    // rollupOptions: { // Manudal chunking
    //   output: {
    //     manualChunks: {
    //       vendor: ['react', 'react-dom'],
    //       lodash: ['lodash'],
    //       moment: ['moment'],
    //     },
    //   },
    // },
  },
});
