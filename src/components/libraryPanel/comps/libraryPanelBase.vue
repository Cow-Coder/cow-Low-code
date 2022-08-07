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
import type { ILibraryComponent } from '@/library/types'
import type { ILibraryPanel } from '@/components/libraryPanel/types'
import PageDraggable from '@/common/page-draggable'
import { leftDraggableConfig } from '@/components/libraryPanel/config/left-draggable-config'
import LibraryItem from '@/components/libraryPanel/comps/libraryItem.vue'

const props = defineProps({
  currentModules: {
    required: true,
    type: Object as PropType<Record<string, ILibraryComponent[]>>,
  },
  vmOptions: {
    required: true,
    type: Object as PropType<ILibraryPanel>,
  },
})

// const currenLibName = toRef(props.vmOptions, 'libraryName')
const tabsList = toRef(props.vmOptions, 'tabsList')
// console.log(`tabsList`, currentModules);

// 保持折叠面板默认打开
const collapseOpenArr = ref(Object.keys(props.vmOptions.tabsList ?? {}) ?? [])
</script>

<style lang="scss" scoped></style>
