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
          @mousedown.stop="onChoose(element)"
          @touchstart.capture="onTouchEvent"
          @touchmove.capture="onTouchEvent"
          @touchend.capture="onTouchEvent"
          @contextmenu.prevent="onContextMenu($event, element)"
        >
          <widget-render
            :widget-element="element"
            :is-down-space="isDownSpace"
            :container-map="containerMap"
          >
            <template v-for="(value, slotKey) in element.props?.slots" :key="slotKey" #[slotKey]>
              <slot-item
                :children="value.children"
                :slot-key="slotKey"
                :is-down-space="isDownSpace"
                :on-touch-event="onTouchEvent"
                :on-choose="onChoose"
                :on-context-menu="onContextMenu"
                :container="element"
              />
            </template>
          </widget-render>
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
import SlotItem from './components/slot-item.vue'
import WidgetRender from './components/widget-render.vue'
import type { LibraryComponentInstanceData } from '@cow-low-code/types'
import PageDraggable from '@/components/page-draggable/index.vue'
import { useCodeStore } from '@/stores/code'

defineOptions({
  name: 'EditPanel',
})

const { isDownSpace, onTouchEvent, onChoose } = usePreventTouch()
const { onContextMenu } = useContentMenu()
const { editDraggableConfigRef, isFocusComponent, editableInstancedLibraryComponentData } =
  useParseLibrary(isDownSpace)
//TODO: fix：The node to be removed is not a child of this node.
// const { editCanvasRef } = useDragPreview()
const store = useCodeStore()
const { containerMap } = storeToRefs(store)
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
