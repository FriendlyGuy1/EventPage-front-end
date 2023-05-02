import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({ //if somebody touches this there a dead man
  // plugins: [vue()],
  server: {
    proxy: {
      '/api': 'https://eventpage.onrender.com'
    },
  },
  plugins: [react()],
})

