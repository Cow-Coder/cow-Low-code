import ColorPicker from 'colorpicker-v3'
import 'colorpicker-v3/style.css'
import App from './App.vue'
import router from './router'
import pinia from '@/plugins/pinia'
import '@/assets/style/tailwind.css'
import '@vant/touch-emulator'

const app = createApp(App)

app.use(ColorPicker)
app.use(router)
app.use(pinia)
app.mount('#app')
