<template>
  <div class="float-tips">
    <a-trigger
      v-model:popup-visible="isShowTrigger"
      :render-to-body="false"
      class="button-trigger-wrapper"
      position="top"
      trigger="click"
      update-at-scroll
    >
      <div :class="{ 'button-trigger-active': isShowTrigger }" class="button-trigger">
        <IconClose v-if="isShowTrigger" />
        <IconQuestionCircle v-else />
      </div>
      <template #content>
        <a-menu
          :style="{ marginBottom: '-4px' }"
          :tooltip-props="{ position: 'left' }"
          mode="popButton"
        >
          <a-menu-item>
            <template #icon>
              <IconBulb />
            </template>
            <div>按住<kbd>space</kbd>可以临时预览页面 鼠标右键可以查看更多操作</div>
          </a-menu-item>
        </a-menu>
      </template>
    </a-trigger>
  </div>
</template>

<script lang="ts" setup>
import { IconBulb, IconClose, IconQuestionCircle } from '@arco-design/web-vue/es/icon'

defineOptions({
  name: 'FloatTips',
})
// 悬浮菜单
const isShowTrigger = ref(false)
</script>

<style lang="scss" scoped>
.float-tips {
  // 悬浮菜单
  --button-trigger-bottom: 40px;

  :deep(.button-trigger-wrapper) {
    @apply fixed;
    bottom: calc(40px + var(--button-trigger-bottom));
    right: calc(var(--attribute-panel-width) + 40px - 4px);
    left: unset !important;
    top: unset !important;
  }

  .button-trigger {
    @apply flex justify-center items-center rounded-full cursor-pointer transition text-white select-none fixed;
    width: 40px;
    height: 40px;
    background-color: var(--color-neutral-5);
    right: calc(var(--attribute-panel-width) + 40px);
    bottom: var(--button-trigger-bottom);

    &.button-trigger-active {
      background-color: var(--color-neutral-4);
    }
  }
}
</style>
