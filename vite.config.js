import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
  path: require.resolve('path-browserify'),
  fs: false,
  os: false,
  util: require.resolve('util/'),
  'node:path': require.resolve('path-browserify')
}

  },
  optimizeDeps: {
    exclude: ['path', 'fs', 'os', 'util', 'node:path']
  }
});
