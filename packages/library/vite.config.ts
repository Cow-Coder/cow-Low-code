import { URL, fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'
import AutoImportComponents from 'unplugin-vue-components/vite'
import VueMarcos from 'unplugin-vue-macros/vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    VueMarcos(),
    AutoImport({
      imports: ['vue', '@vueuse/core'],
      dirs: [],
      dts: './types/auto-imports.d.ts',
      vueTemplate: true,
      resolvers: [VantResolver()],
    }),
    AutoImportComponents({
      dirs: [],
      dts: './types/components.d.ts',
      resolvers: [VantResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('../src', import.meta.url)),
    },
  },
})
