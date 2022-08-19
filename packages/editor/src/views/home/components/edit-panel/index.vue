<template>
  <div class="edit">
    <page-draggable
      :draggable-config="editDraggableConfigRef"
      :data-list="editableInstancedLibraryComponentData"
    >
      <template #item="{ element }">
        <div
          :class="{ 'focus-component': isFocusComponent(element) }"
          class="edit-component-item"
          @mousedown.capture.stop="onChoose(element)"
          @touchstart.capture="onTouchEvent"
          @touchmove.capture="onTouchEvent"
          @touchend.capture="onTouchEvent"
          @contextmenu.capture.prevent="onContextMenu($event, element)"
        >
          <component :is="parseLibraryComponent(element)" />
        </div>
      </template>
      <template v-if="draggedElement" #footer>
        <preview-dragged :element="toRaw(draggedElement)" />
      </template>
    </page-draggable>
  </div>
</template>

<script lang="tsx" setup>
import { ref } from 'vue'
import { cloneDeep, isEqual } from 'lodash-es'
import { $$dropdown, DropdownOption, dispatchEventBatch } from '@cow-low-code/utils'
import PreviewDragged from './components/preview-dragged'
import type { Draggable } from '@/components/base-ui/kzy-draggable/types'
import type { LibraryComponentInstanceData } from '@/types/library-component'
import type { LibraryComponentInstanceEventTriggers } from '@/types/event-trigger'
import { libraryMap } from '@/library'
import { useCodeStore } from '@/stores/code'
import PageDraggable from '@/components/page-draggable/index.vue'
import { CUSTOM_EVENT_TRIGGER_NAME, DRAGGABLE_GROUP_NAME } from '@/constant'
import { isCustomEventTriggerName, uuid } from '@/utils/library'

defineOptions({
  name: 'EditPanel',
})

const editDraggableConfigRef = ref<Draggable>({
  draggableProp: {
    group: { name: DRAGGABLE_GROUP_NAME },
    itemKey: 'indexId',
    disabled: false,
    animation: 200,
  },
})

const codeStore = useCodeStore()
const { jsonCode: editableInstancedLibraryComponentData, focusData } = storeToRefs(codeStore)

// 根据名称解析物料组件库内的组件，这里没有注册全局组件是避免污染全局组件名称
const libraryComponentPropTriggersCacheMap = new Map<
  // uuid
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
  return (
    <component
      onDispatchEvent={(eventTriggerName: string) =>
        dispatchEventBatch(data, eventTriggerName, codeStore.jsonCode)
      }
      {...props}
    ></component>
  )
}

const isDownSpace = ref(false)
function onChoose(data: LibraryComponentInstanceData) {
  isDownSpace.value || codeStore.dispatchFocus(data.uuid)
}

watch(isDownSpace, (val) => {
  editDraggableConfigRef.value.draggableProp.disabled = val
})

function isFocusComponent(data: LibraryComponentInstanceData) {
  return data.uuid == focusData.value?.uuid && !isDownSpace.value
}

function onTouchEvent(e: TouchEvent) {
  if (!isDownSpace.value) e.stopPropagation()
}

// 右键菜单
const onContextMenu = (e: MouseEvent, data: LibraryComponentInstanceData) => {
  $$dropdown({
    reference: e,
    content: () => (
      <>
        <DropdownOption
          label="删除节点"
          icon="el-icon-delete"
          {...{
            onClick: () => {
              codeStore.dispatchDelete(data.uuid)
            },
          }}
        />
      </>
    ),
  })
}

useEventListener(window, 'keydown', (e) => {
  if (
    (e.target as HTMLElement).nodeName === 'INPUT' ||
    (e.target as HTMLElement).nodeName === 'TEXTAREA'
  )
    return undefined
  if (e.code === 'Space') {
    isDownSpace.value = true
    e.preventDefault()
  }
})
useEventListener(window, 'keyup', (e) => {
  e.code === 'Space' ? (isDownSpace.value = false) : undefined
})

// TODO: 拖拽到编辑器时候显示真实的组件，而不是显示物料面板的按钮
const store = useCodeStore()
const { draggedElement } = storeToRefs(store)
</script>

<style lang="scss" scoped>
.focus-component {
  @apply outline-2 outline #{!important};
  outline-color: var(--el-color-primary);
}
.edit {
  @apply flex flex-col;
  :deep(.default-drag) {
    @apply flex-grow;
  }
}

.edit-component-item {
  margin: 2px 0;
  &:hover {
    @apply outline-1 outline-dashed;
    outline-color: var(--el-color-primary);
  }
}
</style>
