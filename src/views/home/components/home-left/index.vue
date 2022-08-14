<template>
  <div class="home-header panel panel-left">
    <el-tabs tab-position="left" type="border-card">
      <el-tab-pane
        v-for="(panel, libraryName) in libraryPanels"
        :key="libraryName"
        :label="panel.libraryTitle"
      >
        <keep-alive>
          <component :is="panel" />
        </keep-alive>
      </el-tab-pane>
      <!--            代码面板-->
      <el-tab-pane label="代码">
        <code-panel />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts" setup>
import libraryPanels from './components/library-category-tab-panes'
import CodePanel from '@/views/home/components/home-left/components/code-tab-pane.vue'

defineOptions({
  name: 'HomeLeft',
})
</script>

<style lang="scss" scoped>
@use '@/views/home/index.scss';
.panel-left {
  width: 385px;
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
</style>
