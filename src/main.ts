import App from './App.vue'
import router from './router'
import pinia from '@/plugins/pinia'
import '@/assets/style/tailwind.css'
import '@vant/touch-emulator'

const app = createApp(App)
app.directive('focus', {
  mounted: (el) => {
    el.querySelector('input').focus()
  },
})
app.use(router)
app.use(pinia)
app.mount('#app')
