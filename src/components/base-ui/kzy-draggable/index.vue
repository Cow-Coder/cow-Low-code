<template>
  <div class="accept-draggable">
    <draggable
      :class="props.libraryClass ? 'library-list' : 'default-drag'"
      :list="props.dataList"
      :item-key="props.itemKey"
      :group="props.group"
      :sort="props.sort"
      :disabled="props.disabled"
      :clone="props.handleClone"
      :move="props.handleMove"
      @change="handleChange"
    >
      <template #item="{ element }">
        <div class="library-item">
          <slot name="item" :element="element" />
        </div>
      </template>
    </draggable>
  </div>
</template>

<script lang="ts" setup>
import Draggable from 'vuedraggable'
import type { cloneType, groupType, moveType } from '@/components/base-ui/kzy-draggable/types'
import type { ILibraryComponent } from '@/library/types'
import { DRAGGABLE_GROUP_NAME } from '@//constant'

interface propsType {
  dataList: Record<string, ILibraryComponent[]>
  group?: groupType
  itemKey?: string
  sort?: boolean
  disabled?: boolean
  libraryClass?: boolean
  handleClone?: cloneType
  handleMove?: moveType
}

const props = withDefaults(defineProps<propsType>(), {
  group: () => ({ name: DRAGGABLE_GROUP_NAME }),
  itemKey: 'id',
  sort: true,
  disabled: false,
  libraryClass: false,
})

const emit = defineEmits<{
  (e: 'handleChange', evt: any): any
}>()

const handleChange = (evt: any) => {
  emit('handleChange', evt)
}
</script>

<style lang="scss" scoped>
.library-list {
  @apply flex flex-wrap;
  .library-item {
    flex: 0 0 50%;
  }
}

.default-drag {
  min-height: $screamMinHeight;
}
</style>
