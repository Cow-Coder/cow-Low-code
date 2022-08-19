import piniaPersist from 'pinia-plugin-persist'
import type { App } from 'vue'
import storeReset from '@/stores/plugins/store-reset'

export default {
  install: (app: App) => {
    const pinia = createPinia()
    pinia.use(piniaPersist)
    pinia.use(storeReset)

    app.use(pinia)
  },
}
