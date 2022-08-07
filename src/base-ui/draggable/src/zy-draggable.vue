<template>
  <div class="accept-draggable">
    <draggable
      class="library-list"
      :list="props.dataList"
      :item-key="props.itemKey"
      :group="props.group"
      :sort="props.sort"
      :disabled="props.disabled"
      @change="handleChange"
      @clone="handleClone"
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
import type { groupType } from '@/base-ui/draggable'
import { DRAGGABLE_GROUP_NAME } from '@//var-constent'

interface propsType {
  dataList: []
  group?: groupType
  itemKey?: string
  sort?: boolean
  disabled?: boolean
}

const props = withDefaults(defineProps<propsType>(), {
  group: () => ({ name: DRAGGABLE_GROUP_NAME }),
  itemKey: 'id',
  sort: true,
  disabled: false,
})

const emit = defineEmits<{
  (e: 'handleChange', evt: any): any
  (e: 'handleClone', component: any): any
}>()

const handleChange = (evt: any) => {
  emit('handleChange', evt)
}

const handleClone = (component: any) => {
  emit('handleClone', component)
}
</script>

<style lang="scss" scoped>
.library-list {
  @apply flex flex-wrap;
  .library-item {
    flex: 0 0 50%;
  }
}
</style>
