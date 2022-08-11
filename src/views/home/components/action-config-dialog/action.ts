import type { ActionHandlerSchema } from '@/types/library-component-event'

const modules = import.meta.glob<ActionHandlerSchema>(`./action-handlers/*/index.(tsx|ts)`, {
  import: 'default',
  eager: true,
})

/**
 * 所有物料组件通用action
 */
export const commonActions = Object.entries(modules).map(([, module]) => module)

/**
 * 获取一个action的处理器
 * @param actionName
 */
export function getActionHandle(actionName: string) {
  const actions = commonActions.flatMap((e) => e.children)
  const nameList = actions.map((e) => {
    if (!e) throw new Error('作为可展开的action节点必须要有children字段')
    return e.name
  })
  function arrayUnique(array: any[]) {
    for (const arrayElement of array) {
      if (array.indexOf(arrayElement) !== array.lastIndexOf(arrayElement)) {
        return false
      }
    }
    return true
  }
  if (!arrayUnique(nameList)) throw new Error('actionHandle的name字段必须唯一')
  return actions.find((value) => value?.name === actionName)
}

/**
 * 执行一个action
 * @param actionName
 * @param actionConfig
 */
export function dispatchActionHandle(actionName: string, actionConfig?: any) {
  const actionHandle = getActionHandle(actionName)
  if (!actionHandle || !actionHandle.handler)
    throw new TypeError(`actionHandle: ${actionName} not found`)
  return Promise.resolve(actionHandle.handler(actionConfig))
}
