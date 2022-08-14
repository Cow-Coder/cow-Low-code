import App from './App.vue'
import router from './router'
import pinia from '@/plugins/pinia'
import '@/assets/style/tailwind.css'
import '@vant/touch-emulator'
import directive from '@/directive'
import ColorPicker from '@/plugins/color-picker'

const app = createApp(App)

app.use(ColorPicker)
app.use(directive)
app.use(router)
app.use(pinia)
app.mount('#app')
