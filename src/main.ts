import { Dialog } from 'vant'

import App from './App.vue'
import router from './router'
import pinia from '@/plugins/pinia'
import '@/assets/tailwind.css'
import '@vant/touch-emulator'

// 全局注册

const app = createApp(App)

// app.use(Dialog)
app.use(router)
app.use(pinia)
app.mount('#app')
