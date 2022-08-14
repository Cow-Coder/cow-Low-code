import { computed, ref, toRefs } from 'vue'
import type {
  EventTriggerSchema,
  LibraryComponentInstanceActionItem,
  LibraryComponentInstanceCustomEventTriggerData,
  LibraryComponentInstanceEventTriggers,
} from '@/types/library-component-event'
import type { ComputedRef, SetupContext } from 'vue'
import type {
  createCustomAttributeTabEmits,
  createCustomAttributeTabProps,
} from '@/views/home/components/home-right/components/attribute-panel/util'
import type { ExtractPropTypes } from '@vue/runtime-core'
import { useCodeStore } from '@/stores/code'
import { getActionHandle } from '@/views/home/components/action-config-dialog/action'
import { libraryMap } from '@/library'
import { CUSTOM_EVENT_TRIGGER_NAME } from '@/constant'
import {
  generateCustomEventTriggerName,
  isCustomEventTriggerName,
} from '@/views/home/components/home-right/components/attribute-panel/components/event-tab-pane/util'

export default function useEventTabPane() {
  const instance = getCurrentInstance()!
  const props = instance.props as Readonly<
    ExtractPropTypes<ReturnType<typeof createCustomAttributeTabProps>>
  >
  const emit = instance.emit as SetupContext<
    ReturnType<typeof createCustomAttributeTabEmits>
  >['emit']

  const { componentSchema } = toRefs(props)
  const componentInstanceData = useVModel(props, 'componentInstanceData', emit)
  const componentInstanceEventTriggers = computed({
    get: () => componentInstanceData.value?.eventTriggers,
    set: (val) => {
      if (!val) return undefined
      componentInstanceData.value!.eventTriggers = val
    },
  })

  const collapseActiveKey = ref<string[]>([])
  /**
   * 选中组件时候展开全部
   */
  watch(componentSchema!, () => {
    if (!componentInstanceEventTriggers.value) {
      collapseActiveKey.value = []
      return undefined
    }
    collapseActiveKey.value = Object.entries(componentInstanceEventTriggers.value).map(
      ([val]) => val
    )
  })
  /**
   * 添加Trigger时候展开最后一个，同时不能影响前面折叠的
   */
  watchArray(
    () =>
      componentInstanceEventTriggers.value
        ? Object.entries(componentInstanceEventTriggers.value).map(([val]) => val)
        : [],
    (newList, oldList, added, removed) => {
      collapseActiveKey.value.push(...added)
    },
    { deep: true }
  )

  const codeStore = useCodeStore()
  function parseActionLabelAndTip(action: LibraryComponentInstanceActionItem) {
    const actionHandle = getActionHandle(action.actionName)
    if (!actionHandle) {
      console.error(`${action.actionName} actionHandle not found`)
      throw new TypeError(`${action.actionName} actionHandle not found`)
    }
    if (!actionHandle.parseTip) {
      console.error(`actionHandle '${action.actionName}' method 'parseTip' not found`)
      throw new TypeError(`actionHandle '${action.actionName}' method 'parseTip' not found`)
    }
    let tip = actionHandle.parseTip(action.config, codeStore.jsonCode, libraryMap)
    if (tip instanceof String) {
      tip = () => <>{tip}</>
    }
    return {
      tip,
      label: actionHandle.label,
    } as { tip: () => JSX.Element; label: string }
  }

  const eventTriggersSchema: ComputedRef<EventTriggerSchema> = computed(() =>
    Object.assign(componentSchema!.value!.eventTriggers ?? {}, {
      [CUSTOM_EVENT_TRIGGER_NAME]: { title: '自定义事件' },
    })
  )

  function parseCollapseHeaderLabel(
    triggerName: string,
    triggerData: ValueOf<LibraryComponentInstanceEventTriggers>,
    triggerSchema: ValueOf<EventTriggerSchema>
  ) {
    if (!isCustomEventTriggerName(triggerName)) return triggerSchema.title
    else return (triggerData as LibraryComponentInstanceCustomEventTriggerData).title
  }

  return {
    componentSchema,
  return {
    eventTriggersSchema,
    componentInstanceData,
    componentInstanceEventTriggers,
    collapseActiveKey,
    parseCollapseHeaderLabel,
    componentSchema,
    parseActionLabelAndTip,
  }
}
