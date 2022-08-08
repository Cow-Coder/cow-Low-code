<template>
  <div class="page-draggable">
    <zy-draggable
      v-bind="props.draggableConfig.draggableProp"
      :data-list="dataList"
      @handleChange="props.draggableConfig?.handleChangeF"
    >
      <template #item="{ element }">
        <div class="page-drag-slot">
          <slot name="item" :element="element" />
        </div>
      </template>
    </zy-draggable>
  </div>
</template>

<script lang="ts" setup>
import type { IDraggable } from '@/baseUi/draggable/types'
import type { ILibraryComponent } from '@/library/types'
import ZyDraggable from '@/baseUi/draggable'

const props = defineProps<{
  draggableConfig: IDraggable
  dataList: Record<string, ILibraryComponent[]>
}>()
</script>

<style lang="scss" scoped></style>
