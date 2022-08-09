<template>
  <div class="page-draggable">
    <kzy-draggable
      v-bind="props.draggableConfig.draggableProp"
      :data-list="dataList"
      @handle-change="props.draggableConfig?.handleChange"
    >
      <template #item="{ element }">
        <div class="page-drag-slot">
          <slot name="item" :element="element" />
        </div>
      </template>
    </kzy-draggable>
  </div>
</template>

<script lang="ts" setup>
import type { Draggable } from '@/components/base-ui/kzy-draggable/types'
import type { LibraryComponent } from '@/types/library-component'
import KzyDraggable from '@/components/base-ui/kzy-draggable/index.vue'

const props = defineProps<{
  draggableConfig: Draggable
  dataList: Record<string, LibraryComponent[]>
}>()
</script>

<style lang="scss" scoped></style>
