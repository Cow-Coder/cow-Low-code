import { type ComponentPublicInstance, type Ref, ref } from 'vue'
import { libraryMap } from '@cow-low-code/library'
import { cloneDeep, isEqual } from 'lodash-es'
import { dispatchEventBatch } from '@cow-low-code/utils'
import type {
  LibraryComponentInstanceData,
  LibraryComponentInstanceEventTriggers,
} from '@cow-low-code/types'
import type { Draggable } from '@/components/base-ui/kzy-draggable/types'
import { isCustomEventTriggerName, uuid } from '@/utils/library'
import { useCodeStore } from '@/stores/code'
import { CUSTOM_EVENT_TRIGGER_NAME, DRAGGABLE_GROUP_NAME } from '@/constant'

export default function useParseLibrary(isDownSpace: Ref<boolean>) {
  const editDraggableConfigRef = ref<Draggable>({
    draggableProp: {
      group: { name: DRAGGABLE_GROUP_NAME },
      itemKey: 'indexId',
      disabled: false,
      animation: 200,
      ghostClass: 'edit-canvas-sortable-ghost',
    },
  })

  watch(isDownSpace, (val) => {
    editDraggableConfigRef.value.draggableProp.disabled = val
  })

  const codeStore = useCodeStore()
  const componentRefMap = codeStore.componentRefMap
  const { jsonCode: editableInstancedLibraryComponentData, focusData } = storeToRefs(codeStore)

  // 根据名称解析物料组件库内的组件，这里没有注册全局组件是避免污染全局组件名称
  const libraryComponentPropTriggersCacheMap = new Map<
    string,
    LibraryComponentInstanceEventTriggers
  >()

  function parseLibraryComponent(data: LibraryComponentInstanceData) {
    const component = libraryMap[data.componentName]
    if (!component) throw new Error(`library component: ${data.libraryName} not found`)
    /*
     * "props": {
     *       "title": "按钮"
     *     }
     */
    const props = cloneDeep(data.props)
    if (
      props &&
      component.props &&
      CUSTOM_EVENT_TRIGGER_NAME in component.props &&
      data.eventTriggers
    ) {
      const customTriggers = Object.fromEntries(
        Object.entries(data.eventTriggers).filter(([triggerName]) =>
          isCustomEventTriggerName(triggerName)
        )
      )
      props[CUSTOM_EVENT_TRIGGER_NAME] = customTriggers
      if (!libraryComponentPropTriggersCacheMap.has(data.indexId))
        libraryComponentPropTriggersCacheMap.set(data.indexId, customTriggers)
      else {
        if (!isEqual(libraryComponentPropTriggersCacheMap.get(data.indexId), customTriggers))
          // 修改v-for的键值 强制重新渲染组件 重新执行setup
          data.indexId = uuid()
      }
    }

    function bindComponentRef(el: ComponentPublicInstance | null) {
      if (!el && componentRefMap.has(data.uuid)) componentRefMap.delete(data.uuid)
      else componentRefMap.set(data.uuid, el!)
    }

    return (
      <component
        ref={bindComponentRef}
        onDispatchEvent={(eventTriggerName: string) =>
          dispatchEventBatch(data, eventTriggerName, codeStore.jsonCode, componentRefMap)
        }
        {...props}
      ></component>
    )
  }

  function isFocusComponent(data: LibraryComponentInstanceData) {
    return data.uuid == focusData.value?.uuid && !isDownSpace.value
  }

  return {
    editDraggableConfigRef,
    isFocusComponent,
    parseLibraryComponent,
    editableInstancedLibraryComponentData,
  }
}
