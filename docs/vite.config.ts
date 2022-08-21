import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    fs: {
      allow: ['..'],
    },
  },
  optimizeDeps: {
    include: ['element-plus'],
  },
})
