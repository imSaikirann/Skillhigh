import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      css: {
        // Add custom CSS preprocessor options if needed
      },
    },
  },
  optimizeDeps: {
    include: ['slick-carousel'], // Ensures slick-carousel is bundled correctly
  },
})
