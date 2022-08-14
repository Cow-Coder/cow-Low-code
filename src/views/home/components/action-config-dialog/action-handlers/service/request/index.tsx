import type { ActionHandlerSchema } from '@/views/home/components/action-config-dialog/types'

export default {
  name: 'Request',
  label: '发送请求',
  description: '触发下载文件',
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
