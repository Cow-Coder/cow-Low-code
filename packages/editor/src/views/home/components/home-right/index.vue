<template>
  <div class="home-right panel-right">
    <a-resize-box
      :directions="['left']"
      class="panel-wrapper"
      @moving-start="rightPanelResizeBarOpacity = 1"
      @moving-end="rightPanelResizeBarOpacity = 0"
    >
      <attribute-panel />
    </a-resize-box>
  </div>
</template>

<script lang="ts" setup>
import AttributePanel from '@/views/home/components/home-right/components/attribute-panel/index.vue'

defineOptions({
  name: 'HomeRight',
})

const rightPanelResizeBarOpacity = ref(0)
</script>

<style lang="scss" scoped>
@use '@/views/home/index.scss';

//右侧面板伸缩条
:deep(.arco-resizebox-trigger-icon-wrapper) {
  @apply transition-all;
  opacity: v-bind(rightPanelResizeBarOpacity);
}

:deep(.arco-resizebox-trigger) {
  &:hover .arco-resizebox-trigger-icon-wrapper {
    @apply opacity-100;
  }
}

.panel-right {
  @include index.panelLeftAndRight;
  @apply right-0;
  .el-tabs {
    @apply flex-grow flex-col w-full;
  }
}
</style>
