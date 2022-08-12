import { v4 as uuidv4 } from 'uuid'
import { cloneDeep } from 'lodash-es'
import type {
  LibraryComponent,
  LibraryComponentInstanceData,
  LibraryComponentInstanceProps,
  LibraryComponentPropItem,
  LibraryComponentProps,
} from '@/types/library-component'
import type {
  EventTrigger,
  LibraryComponentInstanceActionItem,
  LibraryComponentInstanceEventTriggers,
} from '@/types/library-component-event'
import { dispatchActionHandle } from '@/views/home/components/action-config-dialog/action'

export const uuid = uuidv4

/**
 * 从物料组件克隆一个组件实例
 * @param com
 */
export function createLibraryComponentInstance(
  com: LibraryComponent
): LibraryComponentInstanceData {
  const data = {
    uuid: uuid(),
    componentName: com.name,
    libraryName: com.libraryName,
    focus: false,
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
  triggersSchema: EventTrigger
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

export function createLibraryComponentInstanceEventAction(
  actionName: string
): ValueOf<LibraryComponentInstanceEventTriggers> {
  return {
    actions: [],
  }
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
 * 批量分发某个事件下的所有action
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
  for (const action of actions) {
    if (isSync) await dispatchActionHandle(action.actionName, action.config)
    else dispatchActionHandle(action.actionName, action.config)
  }
}
