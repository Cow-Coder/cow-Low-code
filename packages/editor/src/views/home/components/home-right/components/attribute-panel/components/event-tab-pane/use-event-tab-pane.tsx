import { computed, ref, toRefs } from 'vue'
import { getActionHandle } from '@cow-low-code/event-action'
import { isString } from 'lodash-es'
import type {
  EventTriggerSchema,
  LibraryComponentInstanceActionItem,
  LibraryComponentInstanceCustomEventTriggerData,
  LibraryComponentInstanceEventTriggers,
} from '@/types/event-trigger'
import type { ComputedRef, SetupContext } from 'vue'
import type {
  createCustomAttributeTabEmits,
  createCustomAttributeTabProps,
} from '@/views/home/components/home-right/components/attribute-panel/util'
import type { ExtractPropTypes } from '@vue/runtime-core'
import { isCustomEventTriggerName } from '@/utils/library'
import { useCodeStore } from '@/stores/code'
import { libraryMap } from '@/library'
import { CUSTOM_EVENT_TRIGGER_NAME } from '@/constant'

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
      if (!val || !componentInstanceData.value?.eventTriggers) return undefined
      componentInstanceData.value.eventTriggers = val
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
    let tip = actionHandle.parseTip(
      action.config,
      codeStore.jsonCode,
      libraryMap,
      codeStore.componentRefMap
    )
    if (isString(tip)) {
      tip = () => <>{tip}</>
    }
    return {
      tip,
      label: actionHandle.label,
    } as { tip: () => JSX.Element; label: string }
  }

  const eventTriggersSchema: ComputedRef<EventTriggerSchema | undefined> = computed(() => {
    const triggers = Object.assign(
      componentSchema!.value!.eventTriggers ?? {},
      CUSTOM_EVENT_TRIGGER_NAME in (componentSchema!.value!.props ?? {})
        ? {
            [CUSTOM_EVENT_TRIGGER_NAME]: { title: '自定义事件' },
          }
        : {}
    )
    if (Object.entries(triggers).length === 0) return undefined
    return triggers
  })

  function parseCollapseHeaderLabel(
    triggerName: string,
    triggerData: ValueOf<LibraryComponentInstanceEventTriggers>
  ) {
    if (!isCustomEventTriggerName(triggerName)) return eventTriggersSchema.value![triggerName].title
    else return (triggerData as LibraryComponentInstanceCustomEventTriggerData).title
  }

  return {
    componentSchema,
    eventTriggersSchema,
    componentInstanceData,
    componentInstanceEventTriggers,
    collapseActiveKey,
    parseCollapseHeaderLabel,
    parseActionLabelAndTip,
  }
}
