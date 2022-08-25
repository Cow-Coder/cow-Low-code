import { type ComponentPublicInstance, type Ref, ref } from 'vue'
import { libraryMap } from '@cow-low-code/library'
import { cloneDeep, isEqual, isUndefined } from 'lodash-es'
import { dispatchEventBatch } from '@cow-low-code/utils'
import type { LibraryComponentInstanceData } from '@cow-low-code/types'
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
  function parseLibraryComponent(data: LibraryComponentInstanceData) {
    // 组件
    const component = libraryMap[data.componentName]
    if (!component) throw new Error(`library component: ${data.libraryName} not found`)

    // 绑定每个组件ref，自定义动作需要拿到ref对物料组件进行操作
    function bindComponentRef(el: ComponentPublicInstance | null) {
      if (!el && componentRefMap.has(data.uuid)) componentRefMap.delete(data.uuid)
      else componentRefMap.set(data.uuid, el!)
    }

    // 事件
    const handleDispatchEvent = (eventTriggerName: string) => {
      dispatchEventBatch(data, eventTriggerName, codeStore.jsonCode, componentRefMap)
    }
    return { WidgetItem: component, widgetProps: data.props, handleDispatchEvent, bindComponentRef }
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
