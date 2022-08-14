import type { ActionHandlerSchema } from '@/views/home/components/action-config-dialog/types'
import { parseActionChildren } from '@/views/home/components/action-config-dialog/action'

const modules = import.meta.glob<ActionHandlerSchema>(`./*/index.(tsx|ts)`, {
  import: 'default',
  eager: true,
})

export default {
  name: 'Page',
  label: '页面',
  order: 1,
  children: parseActionChildren(modules),
} as ActionHandlerSchema
