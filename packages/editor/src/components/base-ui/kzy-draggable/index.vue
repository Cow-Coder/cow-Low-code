<template>
  <draggable
    :class="$.attrs.class ?? 'default-drag'"
    :list="props.dataList"
    :item-key="props.itemKey"
    :group="props.group"
    :sort="props.sort"
    :disabled="props.disabled"
    :clone="props.handleClone"
    :move="props.handleMove"
    @end="handleEnd"
    @change="handleChange"
  >
    <template #item="{ element }">
      <div class="library-item">
        <slot name="item" :element="element" />
      </div>
    </template>
    <template #footer>
      <div class="footer">
        <slot name="footer" />
      </div>
    </template>
  </draggable>
</template>

<script lang="ts" setup>
import Draggable from 'vuedraggable'
import type { CloneDrag, GroupDrag, MoveDrag } from '@/components/base-ui/kzy-draggable/types'
import { DRAGGABLE_GROUP_NAME } from '@//constant'

defineOptions({
  name: 'KZYDraggable',
})

interface DragProps {
  dataList: unknown[]
  group?: GroupDrag
  itemKey?: string
  sort?: boolean
  disabled?: boolean
  libraryClass?: boolean
  handleClone?: CloneDrag
  handleMove?: MoveDrag
}

const props = withDefaults(defineProps<DragProps>(), {
  group: () => ({ name: DRAGGABLE_GROUP_NAME }),
  itemKey: 'id',
  sort: true,
  disabled: false,
  libraryClass: false,
})

const emit = defineEmits<{
  (e: 'handleChange', evt: any): any
  (e: 'handleEnd'): any
}>()

const handleChange = (evt: any) => {
  emit('handleChange', evt.item)
}

const handleEnd = () => {
  emit('handleEnd')
}
</script>
