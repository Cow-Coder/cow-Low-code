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
import type { LibraryComponent } from '@/library/types'
import type { LibraryPanel } from '@/views/library-panel/types'
import PageDraggable from '@/components/page-draggable/index.vue'
import { leftDraggableConfig } from '@/views/library-panel/config/left-draggable-config'
import LibraryItem from '@/views/library-panel/components/library-item.vue'

defineOptions({
  name: 'LibraryPanel',
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

// const currenLibName = toRef(props.vmOptions, 'libraryName')
const tabsList = toRef(props.vmOptions, 'tabsList')
// console.log(`tabsList`, currentModules);

// 保持折叠面板默认打开
const collapseOpenArr = ref(Object.keys(props.vmOptions.tabsList ?? {}) ?? [])
</script>

<style lang="scss" scoped></style>
