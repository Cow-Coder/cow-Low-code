import { defineConfig, mergeConfig } from 'vite'
import Inspect from 'vite-plugin-inspect'
import baseConfig from './vite.config.base'
import type { ConfigEnv, UserConfig } from 'vite'

export default defineConfig((configEnv: ConfigEnv): UserConfig => {
  return mergeConfig(baseConfig(configEnv), {
    mode: 'development',
    plugins: [Inspect()],
  } as UserConfig)
})
