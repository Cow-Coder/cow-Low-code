import AutoImport from 'unplugin-auto-import/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'

export default function configApiImport() {
  /**
   * 自动导入API
   * @link https://github.com/antfu/unplugin-auto-import#configuration
   */
  return AutoImport({
    /**
     * 预设 presets
     * @link https://github.com/antfu/unplugin-auto-import/tree/main/src/presets
     */
    imports: [
      // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
      'vue',
      '@vueuse/core',
      'pinia',
    ],
    // Auto import for module exports under directories
    // by default it only scan one level of modules under the directory
    dirs: [],
    dts: './types/auto-imports.d.ts',
    /**
     * @link https://github.com/antfu/unplugin-auto-import#eslint
     */
    eslintrc: {
      enabled: false,
    },
    vueTemplate: true,
    resolvers: [VantResolver()],
  })
}
