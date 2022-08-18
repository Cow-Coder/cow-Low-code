import Components from 'unplugin-vue-components/vite'
import { ArcoResolver, ElementPlusResolver, VantResolver } from 'unplugin-vue-components/resolvers'
import IconsResolver from 'unplugin-icons/resolver'

export default function configComponentsImport() {
  /**
   * 自动导入组件
   */
  return Components({
    /**
     * relative paths to the directory to search for components.
     * @default ['src/components']
     * @link relative paths to the directory to search for components.
     */
    dirs: [],
    dts: './types/components.d.ts',
    resolvers: [
      ElementPlusResolver({
        importStyle: 'sass',
      }),
      VantResolver(),
      ArcoResolver({
        sideEffect: true,
      }),
      /**
       * 自动注册图标组件
       * @link https://github.com/sxzz/element-plus-best-practices/blob/db2dfc983ccda5570033a0ac608a1bd9d9a7f658/vite.config.ts#L45
       */
      IconsResolver(),
    ],
  })
}
