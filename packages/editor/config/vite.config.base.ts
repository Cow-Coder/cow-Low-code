import { URL, fileURLToPath } from 'node:url'
import * as fs from 'node:fs'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import VueMarcos from 'unplugin-vue-macros/vite'
import { editorOutput } from '@cow-low-code/build-utils'
import configApiImport from './plugins/api-import'
import configComponentsImport from './plugins/components-import'
import configElementStyleAndIcon from './plugins/element-style-and-icon'
import configArcoStyleImportPlugin from './plugins/arco-style-import'
import configManualChunksPlugin from './plugins/manual-chunks'
import monaco from './plugins/monaco'
import type { ConfigEnv, UserConfig, UserConfigFn } from 'vite'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }: ConfigEnv): UserConfig => {
  const isBuild = command === 'build'
  return {
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
      monaco.vitePlugin(),
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
    optimizeDeps: {
      esbuildOptions: {
        plugins: [monaco.esbuildPlugin()],
      },
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('../src', import.meta.url)),
      },
    },
    build: {
      outDir: editorOutput,
      rollupOptions: {
        output: {
          manualChunks: (e) => {
            // fs.appendFile('./manual-chunks.txt', `${e}\n`, () => undefined)
            if (e.includes('/node_modules/monaco-editor/')) return 'monaco'
            else if (
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
  }
}) as UserConfigFn
