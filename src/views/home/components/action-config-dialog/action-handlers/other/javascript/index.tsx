import type { ActionHandlerSchema } from '@/types/library-component-event'

export default {
  name: 'JavaScript',
  label: '自定义JS',
  description: '通过JavaScript自定义动作逻辑',
  configPanel: () => (
    <>
      <div>动作说明</div>
      <div>通过JavaScript自定义动作逻辑</div>
    </>
  ),
  handler: () => {
    console.log(`自定义JS handler触发`)
  },
} as ActionHandlerSchema
