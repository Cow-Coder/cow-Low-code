import { getCurrentInstance, toRef, toRefs } from 'vue'
import { CUSTOM_EVENT_EMIT_NAME, CUSTOM_EVENT_TRIGGER_NAME } from '@cow-low-code/constant'
import { isUndefined } from 'lodash-es'
import { isCustomEventTriggerName } from '@cow-low-code/utils'
import { createLibraryComponentPropItem } from '../utils/library'
import type { PropType, Ref } from 'vue'
import type {
  LibraryComponentInstanceCustomEventTriggerData,
  LibraryComponentInstanceData,
  LibraryComponentInstanceEventTriggers,
} from '@cow-low-code/types'
import type { ExtractPropTypes } from '@vue/runtime-core'

/**
 * 如果一个组件支持自定义事件那么就可以声明该prop
 */
function createCustomEventTriggerProp() {
  return {
    myInstanceData: createLibraryComponentPropItem({
      type: Object as PropType<LibraryComponentInstanceData>,
    }),
    // 只是个开关，用于事件面板显示还是隐藏自定义事件按钮
    [CUSTOM_EVENT_TRIGGER_NAME]: createLibraryComponentPropItem({
      type: Object,
    }),
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
  const myInstanceData = toRef(
    props,
    'myInstanceData'
  )! as unknown as Ref<LibraryComponentInstanceData>
  if (isUndefined(myInstanceData.value.eventTriggers)) return context

  Object.entries(myInstanceData.value.eventTriggers).forEach(([name, trigger]) => {
    if (!isCustomEventTriggerName(name)) return undefined
    const execFun = new Function(
      `context`,
      `getCurrentInstance`,
      `CUSTOM_EVENT_EMIT_NAME`,
      `THIS_EMIT_NAME`,
      (trigger as LibraryComponentInstanceCustomEventTriggerData).execCode
    )
    try {
      execFun(context, getCurrentInstance, CUSTOM_EVENT_EMIT_NAME, name)
    } catch (e) {
      console.error(`${myInstanceData.value.componentName}自定事件触发器[${name}]执行失败`, e)
    }
  })
  return context
}

export default {
  createCustomEventTriggerProp,
  applyCustomEventTriggers,
}
