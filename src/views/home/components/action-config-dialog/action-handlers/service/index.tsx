import type { ActionHandlerSchema } from '@/types/library-component-event'

const modules = import.meta.glob<ActionHandlerSchema>(`./*/index.(tsx|ts)`, {
  import: 'default',
  eager: true,
})

export default {
  name: 'Service',
  label: '服务',
  children: Object.entries(modules).map(([, module]) => module),
} as ActionHandlerSchema
