import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: true,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom') || id.includes('node_modules/react-router-dom')) {
            return 'chunk-react'
          }
          if (id.includes('node_modules/framer-motion')) {
            return 'chunk-framer'
          }
          if (id.includes('node_modules/gsap') || id.includes('node_modules/@gsap')) {
            return 'chunk-gsap'
          }
          if (id.includes('node_modules/lenis')) {
            return 'chunk-lenis'
          }
        },
      },
    },
  },
})
