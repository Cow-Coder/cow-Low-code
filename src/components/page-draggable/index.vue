<template>
  <div class="page-draggable">
    <kzy-draggable
      v-bind="props.draggableConfig.draggableProp"
      :data-list="dataList"
      @handleChange="props.draggableConfig?.handleChangeF"
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
import type { IDraggable } from '@/components/base-ui/kzy-draggable/types'
import type { ILibraryComponent } from '@/library/types'
import KzyDraggable from '@/components/base-ui/kzy-draggable/index.vue'

const props = defineProps<{
  draggableConfig: IDraggable
  dataList: Record<string, ILibraryComponent[]>
}>()
</script>

<style lang="scss" scoped></style>
