import { parseActionChildren } from '@cow-low-code/event-action/src/utils/util'
import type { ActionHandlerSchema } from '@cow-low-code/types'

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
