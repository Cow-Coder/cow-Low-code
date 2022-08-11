import type { ActionHandlerSchema } from '@/types/library-component-event'

export default {
  name: 'Copy',
  label: '复制内容',
  description: '复制文本内容至粘贴板',
  configPanel: () => (
    <>
      <div>动作说明</div>
      <div>复制文本内容至粘贴板</div>
    </>
  ),
  handler: () => {
    console.log(`copy handler触发`)
  },
} as ActionHandlerSchema
