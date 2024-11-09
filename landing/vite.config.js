import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ['slick-carousel', 'react-slick'],  // Ensure both are externalized
    },
  },
});
