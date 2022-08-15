<template>
  <page-draggable
    class="edit"
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
      >
        <component :is="parseLibraryComponent(element)" />
      </div>
    </template>
  </page-draggable>
  <template v-if="draggedElement">
    <preview-dragged :element="toRaw(draggedElement)" />
  </template>
</template>

<script lang="tsx" setup>
import { ref } from 'vue'
import type { Draggable } from '@/components/base-ui/kzy-draggable/types'
import type { LibraryComponentInstanceData } from '@/types/library-component'
import PreviewDragged from '@/utils/previewDragged.tsx'
import { libraryRecord } from '@/library'
import { useCodeStore } from '@/stores/code'
import PageDraggable from '@/components/page-draggable/index.vue'
import { DRAGGABLE_GROUP_NAME } from '@/constant'
import { dispatchEventBatch } from '@/utils/library'

defineOptions({
  name: 'EditPanel',
})

const editDraggableConfigRef = ref<Draggable>({
  draggableProp: {
    group: { name: DRAGGABLE_GROUP_NAME },
    itemKey: 'id',
    disabled: false,
    animation: 200,
  },
})

const codeStore = useCodeStore()
const { jsonCode: editableInstancedLibraryComponentData, focusData } = storeToRefs(codeStore)

// 根据名称解析物料组件库内的组件，这里没有注册全局组件是避免污染全局组件名称
function parseLibraryComponent(data: LibraryComponentInstanceData) {
  /**
   * TODO: 可以不用每次都遍历，把libraryRecord用Object.fromEntries转成键值对
   */
  for (const libMapElementElement of libraryRecord[data.libraryName]) {
    if (libMapElementElement.name !== data.componentName) continue
    /*
     * "props": {
     *       "title": "按钮"
     *     }
     */
    return (
      <libMapElementElement
        onDispatchEvent={(eventTriggerName: string) => dispatchEventBatch(data, eventTriggerName)}
        {...data.props}
      ></libMapElementElement>
    )
  }
  throw new Error(`not found library component: ${data.libraryName}`)
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

useEventListener(window, 'keydown', (e) => {
  e.code === 'Space' ? (isDownSpace.value = true) : undefined
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
  outline-color: $color-primary;
}

.edit-component-item {
  margin: 2px 0;
  &:hover {
    @apply outline-1 outline-dashed;
    outline-color: $color-primary;
  }
}
</style>
