import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import './vite.init.ts'

export default defineConfig(() => {
  return {
    resolve: {
      alias: [],
    },
    plugins: [vue(), vueJsx()],
  }
})
