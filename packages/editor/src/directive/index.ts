import type { App } from 'vue'
import ElementDialogResize from '@/directive/element-dialog-resize'

export default {
  install(Vue: App) {
    Vue.directive('element-dialog-resize', ElementDialogResize)
  },
}
