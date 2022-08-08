import { manualChunksPlugin } from 'vite-plugin-webpackchunkname'

const isOpen = false

/**
 * vite的webpackChunkName实现
 * @link https://github.com/rollup/rollup/issues/4283#issuecomment-1202949560
 */
export default function configManualChunksPlugin() {
  if (isOpen) {
    return manualChunksPlugin()
  }
}
