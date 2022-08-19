import type { App } from 'vue'

export default {
  install: (app: App) => {
    const pinia = createPinia()
    app.use(pinia)
  },
}
