import App from './App.vue'
import router from './router'
import pinia from '@/plugins/pinia'
import '@/assets/style/tailwind.css'
import '@vant/touch-emulator'
import directive from '@/directive'

const app = createApp(App)

app.use(directive)
app.use(router)
app.use(pinia)
app.mount('#app')
