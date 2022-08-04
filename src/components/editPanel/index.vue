<template>
  <draggable
    v-model="editableInstancedLibraryComponentData"
    class="edit"
    group="library"
    item-key="id"
  >
    <template #item="{ element }">
      <div
        :class="{ 'focus-component': isFocusComponent(element) }"
        class="edit-component-item"
        @mousedown.stop="onChoose(element)"
      >
        <component :is="parseLibraryComponent(element)" />
      </div>
    </template>
  </draggable>
</template>

<script lang="tsx" setup>
import Draggable from 'vuedraggable'
import type { ILibraryComponentInstanceData } from '@/components/editPanel/types'
import { libraryRecord } from '@/library'
import { useCodeStore } from '@/stores/code'

const codeStore = useCodeStore()
const { jsonCode: editableInstancedLibraryComponentData, focusData } = storeToRefs(codeStore)

// 根据名称解析物料组件库内的组件，这里没有注册全局组件是避免污染全局组件名称
function parseLibraryComponent(data: ILibraryComponentInstanceData) {
  // console.log(`parseLibraryComponent`, data)
  for (const libMapElementElement of libraryRecord[data.libraryName]) {
    if (libMapElementElement.name !== data.componentName) continue
    return (
      <>
        <libMapElementElement {...data.props}></libMapElementElement>
      </>
    )
  }
  throw new Error(`not found library component: ${data.libraryName}`)
}

function onChoose(data: ILibraryComponentInstanceData) {
  // console.log('onChoose', data)
  codeStore.dispatchFocus(data.uuid)
}

function isFocusComponent(data: ILibraryComponentInstanceData) {
  return data.uuid == focusData.value?.uuid
}

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
