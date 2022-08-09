import AutoImport from 'unplugin-auto-import/vite'
import { ArcoResolver, ElementPlusResolver, VantResolver } from 'unplugin-vue-components/resolvers'
import IconsResolver from 'unplugin-icons/resolver'

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
    resolvers: [
      /**
       * 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
       * @link https://github.com/sxzz/element-plus-best-practices/blob/db2dfc983ccda5570033a0ac608a1bd9d9a7f658/vite.config.ts#L27
       */
      ElementPlusResolver({
        importStyle: 'sass',
      }),
      VantResolver(),
      ArcoResolver(),
      /**
       * @link https://github.com/sxzz/element-plus-best-practices/blob/db2dfc983ccda5570033a0ac608a1bd9d9a7f658/vite.config.ts#L33
       */
      IconsResolver(),
    ],
  })
}
