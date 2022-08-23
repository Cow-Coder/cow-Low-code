<template>
  <kzy-draggable
    :class="$.attrs.attr"
    v-bind="props.draggableConfig.draggableProp"
    :data-list="props.dataList"
    @handle-change="props.draggableConfig?.handleChange"
    @handle-end="props.draggableConfig?.handleEnd"
  >
    <template #item="{ element }">
      <div>
        <slot name="item" :element="element" />
      </div>
    </template>
    <template #footer>
      <div>
        <slot name="footer" />
      </div>
    </template>
  </kzy-draggable>
</template>

<script lang="ts" setup>
import type { Draggable } from '@/components/base-ui/kzy-draggable/types'
import KzyDraggable from '@/components/base-ui/kzy-draggable/index.vue'

defineOptions({
  name: 'PageDraggable',
})

const props = defineProps<{
  draggableConfig: Draggable
  dataList: unknown[]
}>()
</script>

<style lang="scss" scoped></style>
