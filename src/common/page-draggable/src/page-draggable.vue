<template>
  <div class="page-draggable">
    <zy-draggable
      v-bind="props.draggableConfig.draggableProp"
      :data-list="dataList"
      @handleChange="props.draggableConfig?.handleChangeF"
      @handleClone="props.draggableConfig?.handleCloneF"
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
import type { IDraggable } from '@/base-ui/draggable/type'
import ZyDraggable from '@/base-ui/draggable'

const props = defineProps<{
  draggableConfig: IDraggable
  dataList: any
}>()
</script>

<style lang="scss" scoped></style>
