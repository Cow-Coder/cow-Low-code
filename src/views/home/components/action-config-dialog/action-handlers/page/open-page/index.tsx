import $style from './index.module.scss'
import type { ActionHandlerSchema } from '@/types/library-component-event'

export default {
  name: 'OpenPage',
  label: '打开页面',
  description: '打开/跳转至指定页面',
  configPanel: () => (
    <div class={$style.line}>
      <div class="label">打开模式</div>
      <div class="input">通过JavaScript自定义动作逻辑</div>
    </div>
  ),
  handler: () => {
    console.log(`自定义JS handler触发`)
  },
} as ActionHandlerSchema
