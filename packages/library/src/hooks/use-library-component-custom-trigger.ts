import { getCurrentInstance } from 'vue'
import { CUSTOM_EVENT_EMIT_NAME, CUSTOM_EVENT_TRIGGER_NAME } from '@cow-low-code/constant'
import type { PropType } from 'vue'
import type {
  LibraryComponentInstanceCustomEventTriggerData,
  LibraryComponentInstanceEventTriggers,
} from '@cow-low-code/types'
import type { ExtractPropTypes } from '@vue/runtime-core'

/**
 * 如果一个组件支持自定义事件那么就可以声明该prop
 */
function createCustomEventTriggerProp() {
  return {
    [CUSTOM_EVENT_TRIGGER_NAME]: {
      type: Object as PropType<LibraryComponentInstanceEventTriggers>,
    },
  }
}

/**
 * 应用自定义事件触发器
 * @param context setup函数return返回的对象，这里也传一份
 */
function applyCustomEventTriggers<T>(context: T): T {
  const instance = getCurrentInstance()!
  const props = instance.props as Readonly<
    ExtractPropTypes<ReturnType<typeof createCustomEventTriggerProp>>
  >
  if (!props[CUSTOM_EVENT_TRIGGER_NAME])
    throw new TypeError('props[CUSTOM_EVENT_TRIGGER_NAME] 不能为空')
  Object.entries(props.customEventTrigger).forEach(([name, trigger]) => {
    const execFun = new Function(
      `context`,
      `getCurrentInstance`,
      `CUSTOM_EVENT_EMIT_NAME`,
      `THIS_EMIT_NAME`,
      (trigger as LibraryComponentInstanceCustomEventTriggerData).execCode
    )
    execFun(context, getCurrentInstance, CUSTOM_EVENT_EMIT_NAME, name)
  })
  return context
}

export default {
  createCustomEventTriggerProp,
  applyCustomEventTriggers,
}
