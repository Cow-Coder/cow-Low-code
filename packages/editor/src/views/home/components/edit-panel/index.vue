<template>
  <div ref="editCanvasRef" class="edit">
    <page-draggable
      :data-list="editableInstancedLibraryComponentData"
      :draggable-config="editDraggableConfigRef"
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
    </page-draggable>
  </div>
</template>

<script lang="tsx" setup>
import useContentMenu from './use-content-menu'
import useParseLibrary from './use-parse-library'
import usePreventTouch from './use-prevent-touch'
import useDragPreview from './use-drag-preview'
import PageDraggable from '@/components/page-draggable/index.vue'

defineOptions({
  name: 'EditPanel',
})

const { isDownSpace, onTouchEvent, onChoose } = usePreventTouch()
const { onContextMenu } = useContentMenu()
const {
  editDraggableConfigRef,
  isFocusComponent,
  parseLibraryComponent,
  editableInstancedLibraryComponentData,
} = useParseLibrary(isDownSpace)
const { editCanvasRef } = useDragPreview()
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
