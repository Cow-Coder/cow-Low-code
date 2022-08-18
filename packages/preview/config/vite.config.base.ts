import { URL, fileURLToPath } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Inspect from 'vite-plugin-inspect'
import VueMarcos from 'unplugin-vue-macros/vite'
import { previewOutput } from '@cow-low-code/build-utils'
import configApiImport from './plugins/api-import'
import configComponentsImport from './plugins/components-import'
import configVisualizer from './plugins/visualizer'
import configManualChunksPlugin from './plugins/manual-chunks'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    configManualChunksPlugin(),
    vue(),
    vueJsx(),
    VueMarcos(),
    configApiImport(),
    configComponentsImport(),
    Inspect(),
    configVisualizer(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('../src', import.meta.url)),
    },
  },
  build: {
    outDir: previewOutput,
    rollupOptions: {
      output: {
        manualChunks: (e) => {
          if (
            e.includes('/node_modules/vue/') ||
            e.includes('/node_modules/vue-router/') ||
            e.includes('/node_modules/pinia/') ||
            e.includes('/node_modules/pinia-plugin-persist/') ||
            e.includes('/node_modules/element-plus/') ||
            e.includes('/node_modules/lodash-es/') ||
            e.includes('/node_modules/@arco-design/web-vue/')
          )
            return 'vendor'
        },
      },
    },
  },
})
