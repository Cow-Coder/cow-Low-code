import { v4 as uuidv4 } from 'uuid'
import { cloneDeep } from 'lodash-es'
import type {
  LibraryComponent,
  LibraryComponentInstanceData,
  LibraryComponentInstanceProps,
  LibraryComponentPropItem,
  LibraryComponentProps,
  OutlineData,
} from '@/types/library-component'
import type {
  EventTriggerSchema,
  LibraryComponentInstanceActionItem,
  LibraryComponentInstanceEventTriggers,
} from '@/types/library-component-event'
import type { ComponentPropsOptions } from '@vue/runtime-core'
import type { PropType } from 'vue'
import { dispatchActionHandle } from '@/views/home/components/action-config-dialog/action'
import { useCodeStore } from '@/stores/code'
import { libraryMap } from '@/library'
import { CUSTOM_EVENT_TRIGGER_NAME } from '@/constant'

export const uuid = uuidv4

/**
 * 从物料组件克隆一个组件实例
 * @param com
 */
export function createLibraryComponentInstance(
  com: LibraryComponent
): LibraryComponentInstanceData {
  const data = {
    indexId: uuid(),
    uuid: uuid(),
    componentName: com.name,
    libraryName: com.libraryName,
    focus: false,
    eventTriggers: {},
  } as LibraryComponentInstanceData
  if (com.props) data.props = createLibraryComponentInstanceProps(com.props)
  if (com.eventTriggers) data.eventTriggers = {}

  return data
}

/**
 * 生成组件实例props
 * @param props
 */
export function createLibraryComponentInstanceProps(
  props: LibraryComponentProps
): LibraryComponentInstanceProps {
  const _props = cloneDeep(props)
  const result = {} as LibraryComponentInstanceProps
  Object.entries(_props).forEach(([propKey, propSchema]) => {
    if (propSchema.default) result[propKey] = propSchema.default
  })
  return result
}

/**
 * 生成组件实例的 事件触发器
 * @param triggersSchema
 */
export function createLibraryComponentInstanceEventTriggers(
  triggersSchema: EventTriggerSchema
): LibraryComponentInstanceEventTriggers {
  const _triggersSchema = cloneDeep(triggersSchema)
  const result = {} as LibraryComponentInstanceEventTriggers
  Object.entries(_triggersSchema).forEach(([trigger]) => {
    result[trigger] = {
      actions: [],
    }
  })
  return result
}

/**
 * 快速定义物料组件
 * @param libraryComponent
 */
export function defineLibraryComponent(libraryComponent: LibraryComponent) {
  return libraryComponent
}

/**
 * 快速创建物料组件的一个prop
 * @param data
 */
export function createLibraryComponentPropItem(data: LibraryComponentPropItem) {
  return data
}

/**
 * 批量分发某物料组件实例 的 某个事件 的 所有action
 * @param libraryData
 * @param eventTriggerName
 * @param isSync
 */
export async function dispatchEventBatch(
  libraryData: LibraryComponentInstanceData,
  eventTriggerName: string,
  isSync = true
) {
  if (!libraryData.eventTriggers) return undefined
  let actions: LibraryComponentInstanceActionItem[] = []
  for (const eventTriggersKey in libraryData.eventTriggers) {
    if (eventTriggersKey === eventTriggerName)
      actions = libraryData.eventTriggers[eventTriggerName].actions
  }
  const codeStore = useCodeStore()
  for (const action of actions) {
    if (isSync)
      await dispatchActionHandle(action.actionName, codeStore.jsonCode, libraryMap, action.config)
    else dispatchActionHandle(action.actionName, codeStore.jsonCode, libraryMap, action.config)
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
