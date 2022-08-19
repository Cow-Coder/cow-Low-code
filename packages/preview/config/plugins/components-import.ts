import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'

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
    resolvers: [VantResolver()],
  })
}
