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
</template>

<script lang="tsx" setup>
import type { ILibraryComponentInstanceData } from '@/components/editPanel/types'
import { libraryRecord } from '@/library'
import { useCodeStore } from '@/stores/code'
import { editDraggableConfig } from '@/components/editPanel/config/edit-draggable-config'
import PageDraggable from '@/common/pageDraggable/page-draggable.vue'

const codeStore = useCodeStore()
const { jsonCode: editableInstancedLibraryComponentData, focusData } = storeToRefs(codeStore)

// 根据名称解析物料组件库内的组件，这里没有注册全局组件是避免污染全局组件名称
function parseLibraryComponent(data: ILibraryComponentInstanceData) {
  // console.log(`parseLibraryComponent`, data)
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
    return <libMapElementElement {...data.props}></libMapElementElement>
  }
  throw new Error(`not found library component: ${data.libraryName}`)
}

function onChoose(data: ILibraryComponentInstanceData) {
  // console.log('onChoose', data)
  codeStore.dispatchFocus(data.uuid)
}

const isDownCtrlLeft = ref(false)
function isFocusComponent(data: ILibraryComponentInstanceData) {
  return data.uuid == focusData.value?.uuid && !isDownCtrlLeft.value
}

const editDraggableConfigRef = computed(() => {
  const draggableProp = editDraggableConfig.draggableProp
  draggableProp.disabled = isDownCtrlLeft.value
  return editDraggableConfig
})

function onTouchEvent(e: TouchEvent) {
  if (!e.ctrlKey) e.stopPropagation()
}

useEventListener(window, 'keydown', (e) => {
  e.code === 'ControlLeft' ? (isDownCtrlLeft.value = true) : undefined
})
useEventListener(window, 'keyup', () => (isDownCtrlLeft.value = false))

// TODO: 拖拽到编辑器时候显示真实的组件，而不是显示物料面板的按钮
</script>

<script lang="tsx">
export default {
  name: 'EditPanel',
}
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
