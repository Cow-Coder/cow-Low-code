import { h } from 'vue'
import Theme from 'vitepress/theme'
import HomePreview from './components/home-preview.vue'
import ZoomImg from './components/zoom-img.vue'
import CustomerEvaluate from './components/customer-evaluate.vue'
import './styles/vars.css'
import './styles/vitepress.css'
import './custom.css'

export default {
  ...Theme,
  Layout() {
    return h(Theme.Layout, null, {
      'home-features-after': () => h(HomePreview),
    })
  },
  enhanceApp({ app }) {
    app.component('ZoomImg', ZoomImg)
    app.component('CustomerEvaluate', CustomerEvaluate)
  },
}
