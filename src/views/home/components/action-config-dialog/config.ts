import type { ActionHandlerSchema } from '@/types/library-component-event'

const modules = import.meta.glob<ActionHandlerSchema>(`./action-handlers/*/index.(tsx|ts)`, {
  import: 'default',
  eager: true,
})
export const commonActions = Object.entries(modules).map(([, module]) => module)
