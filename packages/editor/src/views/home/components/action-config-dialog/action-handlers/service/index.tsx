import type { ActionHandlerSchema } from '../../types'
import { parseActionChildren } from '@/views/home/components/action-config-dialog/action'

const modules = import.meta.glob<ActionHandlerSchema>(`./*/index.(tsx|ts)`, {
  import: 'default',
  eager: true,
})

export default {
  name: 'Service',
  label: '服务',
  order: 2,
  children: parseActionChildren(modules),
} as ActionHandlerSchema
