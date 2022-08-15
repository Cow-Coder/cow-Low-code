<template>
  <div class="home-header panel panel-left">
    <a-resize-box
      v-model:width="panelWidth"
      :directions="['right']"
      class="panel-wrapper"
      @moving-start="panelResizeBarOpacity = 1"
      @moving-end="panelResizeBarOpacity = 0"
    >
      <el-tabs v-model="currentTab" tab-position="left" type="border-card">
        <el-tab-pane
          v-for="(panel, libraryName) in libraryPanels"
          :key="libraryName"
          :label="panel.libraryTitle"
        >
          <keep-alive>
            <component :is="panel" />
          </keep-alive>
        </el-tab-pane>
        <!-- 大纲结构面板 -->
        <el-tab-pane label="大纲" lazy>
          <outline-panel />
        </el-tab-pane>
        <!-- 代码面板 -->
        <el-tab-pane label="代码" name="code-tab-pane" lazy>
          <code-panel />
        </el-tab-pane>
      </el-tabs>
    </a-resize-box>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { ElTabPane } from 'element-plus'
import libraryPanels from './components/library-category-tab-panes'
import CodePanel from '@/views/home/components/home-left/components/code-tab-pane.vue'
import OutlinePanel from '@/views/home/components/home-left/components/outline-panel/index.vue'

defineOptions({
  name: 'HomeLeft',
})

const currentTab = ref('0')
const panelResizeBarOpacity = ref(0)
const panelResizeBarDisplay = computed(() => {
  return currentTab.value === 'code-tab-pane' ? 'flex' : 'none'
})
const tabWidthMemoryRecord = reactive<Record<string, number>>({})
const panelWidth = computed({
  get: () => {
    return tabWidthMemoryRecord[currentTab.value]
  },
  set: (val) => {
    tabWidthMemoryRecord[currentTab.value] = val
  },
})
</script>

<style lang="scss" scoped>
@use '@/views/home/index.scss';
.panel-left {
  @include index.panelLeftAndRight;
  .el-tabs {
    @apply flex-grow;
    :deep(.el-tabs__content) {
      @apply h-full;
      .el-tab-pane {
        @apply h-full;
      }
    }
  }
}

// 面板伸缩条
:deep(.arco-resizebox-trigger) {
  .arco-resizebox-trigger-icon-wrapper {
    @apply transition-all;
    opacity: v-bind(panelResizeBarOpacity);
    display: v-bind(panelResizeBarDisplay);
  }
  &:hover .arco-resizebox-trigger-icon-wrapper {
    @apply opacity-100;
  }
}
</style>
