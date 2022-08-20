import { defineConfig, mergeConfig } from 'vite'
import baseConfig from './vite.config.base'
import configVisualizer from './plugins/visualizer'
import type { ConfigEnv, UserConfig } from 'vite'

export default defineConfig((configEnv: ConfigEnv): UserConfig => {
  return mergeConfig(baseConfig(configEnv), {
    mode: 'production',
    plugins: [configVisualizer()],
  })
})
