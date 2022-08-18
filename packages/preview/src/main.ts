import App from './App.vue'
import router from './router'
import pinia from './plugins/pinia'
import '@vant/touch-emulator'

const app = createApp(App)

app.use(router)
app.use(pinia)
app.mount('#app')
