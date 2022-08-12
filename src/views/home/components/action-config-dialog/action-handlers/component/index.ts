import type { ActionHandlerSchema } from '@/views/home/components/action-config-dialog/types'
import { parseActionChildren } from '@/views/home/components/action-config-dialog/action'

const modules = import.meta.glob<ActionHandlerSchema>(`./*/index.(tsx|ts)`, {
  import: 'default',
  eager: true,
})

export default {
  name: 'Component',
  label: '组件',
  order: 0,
  children: parseActionChildren(modules),
} as ActionHandlerSchema
