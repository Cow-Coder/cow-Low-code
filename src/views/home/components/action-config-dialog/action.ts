import type { ActionHandlerSchema } from '@/types/library-component-event'

const modules = import.meta.glob<ActionHandlerSchema>(`./action-handlers/*/index.(tsx|ts)`, {
  import: 'default',
  eager: true,
})

/**
 * 所有物料组件通用action
 */
export const commonActions = Object.entries(modules).map(([, module]) => module)

export function getActionHandle(actionName: string) {
  return commonActions.flatMap((e) => e.children).find((value) => value?.name === actionName)
}
