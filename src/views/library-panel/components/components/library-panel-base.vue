<template>
  <el-collapse v-model="collapseOpenArr">
    <!-- 表单组件 -->
    <el-collapse-item
      v-for="(tabItemVal, tabItemKey) in currentModules"
      :key="tabItemKey"
      :name="tabItemKey"
      :title="tabsList[tabItemKey].title"
    >
      <page-draggable
        :draggable-config="leftDraggableConfig"
        :data-list="tabItemVal"
        class="library-list"
      >
        <template #item="{ element }">
          <library-item class="library-item" :element="element" />
        </template>
      </page-draggable>
    </el-collapse-item>
  </el-collapse>
</template>

<script lang="tsx" setup>
import type { PropType } from 'vue'
import type { LibraryComponent } from '@/types/library-component'
import type { LibraryPanel } from '@/views/library-panel/types'
import PageDraggable from '@/components/page-draggable/index.vue'
import { leftDraggableConfig } from '@/views/library-panel/config'
import LibraryItem from '@/views/library-panel/components/components/library-item.vue'

defineOptions({
  name: 'LibraryPanelBase',
})

const props = defineProps({
  currentModules: {
    required: true,
    type: Object as PropType<Record<string, LibraryComponent[]>>,
  },
  vmOptions: {
    required: true,
    type: Object as PropType<LibraryPanel>,
  },
})

const tabsList = toRef(props.vmOptions, 'tabsList')

// 保持折叠面板默认打开
const collapseOpenArr = ref(Object.keys(props.vmOptions.tabsList ?? {}) ?? [])
</script>

<style lang="scss" scoped>
// 清除折叠面板边框
.el-collapse {
  @apply border-transparent #{!important};
  :deep(.el-collapse-item__wrap),
  :deep(.el-collapse-item__header) {
    @apply border-transparent #{!important};
  }

  // 缩小折叠面板边距，默认的太宽了
  :deep(.el-collapse-item__content) {
    padding-bottom: 0;
  }
}
</style>
