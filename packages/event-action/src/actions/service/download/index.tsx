import type { ActionHandlerSchema } from '@cow-low-code/types'

export default {
  name: 'Download',
  label: '下载文件',
  description: '触发下载文件',
  configPanel: () => (
    <>
      <div>动作说明</div>
      <div>通过JavaScript自定义动作逻辑</div>
    </>
  ),
  handler: () => {
    console.warn(`自定义JS handler触发`)
  },
} as ActionHandlerSchema
