import { dispatchActionHandle } from '@cow-low-code/event-action'
import { libraryMap } from '@cow-low-code/library'
import { CUSTOM_EVENT_TRIGGER_NAME } from '@cow-low-code/constant'
import { v4 as uuid } from 'uuid'
import type {
  LibraryComponentInstanceActionItem,
  LibraryComponentInstanceData,
  LibraryComponentsInstanceTree,
} from '@cow-low-code/types'

/**
 * 批量分发某物料组件实例 的 某个事件 的 所有action
 * @param libraryData
 * @param eventTriggerName
 * @param libraryComponentsInstanceTree
 * @param isSync
 */
export async function dispatchEventBatch(
  libraryData: LibraryComponentInstanceData,
  eventTriggerName: string,
  libraryComponentsInstanceTree: LibraryComponentsInstanceTree,
  isSync = true
) {
  if (!libraryData.eventTriggers) return undefined
  let actions: LibraryComponentInstanceActionItem[] = []
  for (const eventTriggersKey in libraryData.eventTriggers) {
    if (eventTriggersKey === eventTriggerName)
      actions = libraryData.eventTriggers[eventTriggerName].actions
  }
  for (const action of actions) {
    if (isSync)
      await dispatchActionHandle(
        action.actionName,
        libraryComponentsInstanceTree,
        libraryMap,
        action.config
      )
    else
      dispatchActionHandle(
        action.actionName,
        libraryComponentsInstanceTree,
        libraryMap,
        action.config
      )
  }
}

/**
 * 判断name是否为自定义事件
 * @example
 * 自定义事件格式 customEventTrigger__uuid
 * .e.g customEventTrigger__e582f8db-b5ce-44df-9330-049e97cd40cf
 * @param name
 */
export function isCustomEventTriggerName(name: string) {
  const uuidReg = new RegExp(
    `^${CUSTOM_EVENT_TRIGGER_NAME}__[a-f\\d]{4}(?:[a-f\\d]{4}-){4}[a-f\\d]{12}$`
  )
  return uuidReg.test(name)
}

/**
 * 生成一个自定义事件触发器的name
 * @example
 * 自定义事件格式 customEventTrigger__uuid
 * .e.g customEventTrigger__e582f8db-b5ce-44df-9330-049e97cd40cf
 */
export function generateCustomEventTriggerName() {
  return `${CUSTOM_EVENT_TRIGGER_NAME}__${uuid()}`
}
