import { visualizer } from 'rollup-plugin-visualizer'

export default function configVisualizer() {
  /**
   * @link https://github.com/btd/rollup-plugin-visualizer#options
   */
  return visualizer({
    gzipSize: true,
  })
}
