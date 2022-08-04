import piniaPersist from 'pinia-plugin-persist'
import App from './App.vue'
import router from './router'
import storeReset from '@/stores/plugins/storeReset'
import '@/assets/tailwind.css'

const app = createApp(App)

app.use(router)
app.use(createPinia().use(piniaPersist).use(storeReset))
app.mount('#app')
