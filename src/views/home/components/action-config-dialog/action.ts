import type { ActionHandlerSchema } from '@/views/home/components/action-config-dialog/types'
import type { LibraryComponent, LibraryComponentInstanceData } from '@/types/library-component'

const allModules = import.meta.glob<ActionHandlerSchema>(`./action-handlers/*/index.(tsx|ts)`, {
  import: 'default',
  eager: true,
})

export function parseActionChildren(modules: Record<string, ActionHandlerSchema>) {
  return Object.entries(modules)
    .map(([, module]) => module)
    .sort((a, b) => {
      if (!a?.order || !b?.order) return 0
      return a?.order - b?.order
    })
}

/**
 * 所有物料组件通用action
 */
export const commonActions = parseActionChildren(allModules)

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
 * @param libraryComponentInstanceTree
 * @param libraryComponentSchemaMap
 * @param actionConfig
 */
export function dispatchActionHandle(
  actionName: string,
  libraryComponentInstanceTree: LibraryComponentInstanceData[],
  libraryComponentSchemaMap: Record<string, LibraryComponent>,
  actionConfig?: any
) {
  const actionHandle = getActionHandle(actionName)
  if (!actionHandle || !actionHandle.handler)
    throw new TypeError(`actionHandle: ${actionName} not found`)
  return Promise.resolve(
    actionHandle.handler(actionConfig, libraryComponentInstanceTree, libraryComponentSchemaMap)
  )
}
