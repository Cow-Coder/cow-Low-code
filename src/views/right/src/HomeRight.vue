<template>
  <div class="home-right panel-right">
    <a-resize-box
      :directions="['left']"
      class="panel-right-wrapper"
      @moving-start="onRightPanelResizeStart"
      @moving-end="onRightPanelResizeEnd"
    >
      <attribute-panel />
    </a-resize-box>
  </div>
</template>

<script lang="ts" setup>
import AttributePanel from '@/components/attributePanel/index.vue'

const rightPanelResizeBarOpacity = ref(0)

function onRightPanelResizeStart() {
  rightPanelResizeBarOpacity.value = 1
}

function onRightPanelResizeEnd() {
  rightPanelResizeBarOpacity.value = 0
}
</script>

<style lang="scss" scoped>
@use '@/var-constent/css/index';

//右侧面板伸缩条
:deep(.arco-resizebox-trigger-icon-wrapper) {
  @apply transition-all;
  opacity: v-bind(rightPanelResizeBarOpacity);
}

:deep(.arco-resizebox-trigger) {
  &:hover .arco-resizebox-trigger-icon-wrapper {
    background-color: #dea9a9;
    @apply opacity-100;
  }
}

.panel-right {
  @include index.panelLeftAndRight;
  .panel-right-wrapper {
    @apply flex;
    width: 385px;
    min-width: 20vw;
    max-width: calc(var(--body-width) / 2 - var(--edit-panel-width) / 2 - var(--blank-min-width));
  }

  .el-tabs {
    @apply flex-grow flex-col;
  }
}
</style>
