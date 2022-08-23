<template>
  <el-collapse ref="collapseContainer" v-model="collapseOpenArr">
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
          <library-item :element="element" />
        </template>
      </page-draggable>
    </el-collapse-item>
  </el-collapse>
</template>

<script lang="tsx" setup>
import { type Ref, toRef } from 'vue'
import { ElCollapse } from 'element-plus'
import { useEventListener } from '@vueuse/core'
import { leftDraggableConfig } from '../config'
import LibraryItem from './library-item.vue'
import type { PropType } from 'vue'
import type { LibraryComponent } from '@/types/library-component'
import type { LibraryPanel, TabList } from '../types'
import PageDraggable from '@/components/page-draggable/index.vue'

defineOptions({
  name: 'LibraryCategoryTabPaneBase',
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

const tabsList = toRef(props.vmOptions, 'tabsList') as Ref<TabList>

// 保持折叠面板默认打开
const collapseOpenArr = ref(Object.keys(props.vmOptions.tabsList ?? {}) ?? [])

// 禁止拖拽出去又拽回来
const collapseContainer = ref<InstanceType<typeof ElCollapse>>()
onMounted(() => {
  useEventListener(
    collapseContainer.value!.$el,
    'dragover',
    (e: DragEvent) => {
      e.stopPropagation()
      e.stopImmediatePropagation()
    },
    { capture: true }
  )
  useEventListener(
    collapseContainer.value!.$el,
    'dragenter',
    (e: DragEvent) => {
      e.stopPropagation()
      e.stopImmediatePropagation()
    },
    { capture: true }
  )
})
</script>

<style lang="scss" scoped>
.library-list {
  @apply flex flex-wrap;
  :deep(.library-item) {
    flex: 0 0 50%;
  }
}
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
