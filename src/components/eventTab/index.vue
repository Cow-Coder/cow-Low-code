<template>
  <a-collapse
    class="event-tab-collapse"
    :default-active-key="[1, 2, 3]"
    :bordered="false"
    expand-icon-position="right"
  >
    <a-collapse-item
      v-for="(val, index) in new Array(3)"
      :key="index"
      header="Beijing Toutiao Technology Co., Ltd."
    >
      <template #extra>
        <div class="flex">
          <a-space>
            <plus theme="outline" size="16" fill="#333" />
            <delete theme="outline" size="16" fill="#333" />
          </a-space>
        </div>
      </template>
      <div>Beijing Toutiao Technology Co., Ltd.</div>
      <div>Beijing Toutiao Technology Co., Ltd.</div>
      <div>Beijing Toutiao Technology Co., Ltd.</div>
    </a-collapse-item>
  </a-collapse>
</template>

<script lang="ts" setup>
import { Delete, Plus } from '@icon-park/vue-next'
</script>

<script lang="ts">
export default defineComponent({
  name: 'EventTab',
})
</script>

<style lang="scss" scoped>
.event-tab-collapse {
  :deep(.arco-collapse-item-content) {
    @apply bg-transparent;
  }
}
</style>
