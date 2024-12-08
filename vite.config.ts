/// <reference types='vitest' />
/// <reference types='vite/client' />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@typings': path.resolve(__dirname, 'src/typings'),
      '@mocks': path.resolve(__dirname, 'src/mocks'),
      '@const': path.resolve(__dirname, 'src/const'),
      '@browser-history': path.resolve(__dirname, 'src/browser-history'),
      "@hooks": path.resolve(__dirname, 'src/hooks'),
      "@store": path.resolve(__dirname, 'src/store'),
      '@services': path.resolve(__dirname, 'src/services')
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
  },
});
