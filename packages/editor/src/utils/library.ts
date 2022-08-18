import { v4 as uuidv4 } from 'uuid'
import { isCustomEventTriggerName as isCustomEventTriggerNameFun } from '@cow-low-code/utils'

export const uuid = uuidv4

export const isCustomEventTriggerName = isCustomEventTriggerNameFun

// /**
//  * 生成组件实例的 事件触发器
//  * @param triggersSchema
//  */
// export function createLibraryComponentInstanceEventTriggers(
//   triggersSchema: EventTriggerSchema
// ): LibraryComponentInstanceEventTriggers {
//   const _triggersSchema = cloneDeep(triggersSchema)
//   const result = {} as LibraryComponentInstanceEventTriggers
//   Object.entries(_triggersSchema).forEach(([trigger]) => {
//     result[trigger] = {
//       actions: [],
//     }
//   })
//   return result
// }
