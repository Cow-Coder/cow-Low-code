import { URL, fileURLToPath } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Inspect from 'vite-plugin-inspect'
import VueMarcos from 'unplugin-vue-macros/vite'
import configApiImport from './plugins/apiImport'
import configComponentsImport from './plugins/componentsImport'
import configElementStyleAndIcon from './plugins/elementStyleAndIcon'
import configVisualizer from './plugins/visualizer'
import configArcoStyleImportPlugin from './plugins/arcoStyleImport'
import configManualChunksPlugin from './plugins/manualChunks'

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
    configElementStyleAndIcon(),
    configArcoStyleImportPlugin(),
    Inspect(),
    configVisualizer(),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        /**
         * webstorm无法识别导入
         * 元素 'color-primary' 仅按名称解析，未使用显式导入
         */
        additionalData: [
          `@use "element-plus/theme-chalk/src/common/var.scss" as *;`,
          `@use "@/assets/style/global.scss" as *;`,
        ].join(''),
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('../src', import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          editor: ['monaco-editor'],
          vue: ['vue', 'vue-router', 'pinia', '@vueuse/core'],
        },
      },
    },
  },
})
