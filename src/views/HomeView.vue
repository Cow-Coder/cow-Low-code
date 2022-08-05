<script lang="ts" setup>
import { ref } from 'vue'
import { IconBulb, IconClose, IconQuestionCircle } from '@arco-design/web-vue/es/icon'
import { useCodeStore } from '@/stores/code'
import libraryPanels from '@/components/libraryPanel'
import AttributePanel from '@/components/attributePanel/index.vue'
import EditPanel from '@/components/editPanel/index.vue'

// TODO:禁止自己拖入自己，从组件区域拖出去再拖入自己区域时候图标应该是禁止，不应该是默认的
//-----------页面布局
const styleHeaderHeight = 60
const codeStore = useCodeStore()

// 限制属性面板
const editPanelRef = ref<InstanceType<typeof HTMLElement>>()
const editPanelRect = useElementSize(editPanelRef)
const bodyRect = useElementSize(document.body)
const bodyWidth = computed(() => `${bodyRect.width.value}px`)
const editPanelWidth = computed(() => `${editPanelRect.width.value}px`)
// 矫正编辑器面板
const libraryPanelRef = ref<InstanceType<typeof HTMLElement>>()
const libraryPanelRect = useElementSize(libraryPanelRef)
const libraryPanelWidth = computed(() => `${libraryPanelRect.width.value}px`)

const rightPanelResizeBarOpacity = ref(0)
function onRightPanelResizeStart() {
  rightPanelResizeBarOpacity.value = 1
}

function onRightPanelResizeEnd() {
  rightPanelResizeBarOpacity.value = 0
}

function freeFocus() {
  codeStore.freeFocus()
}

//--------------顶部

// TODO: 抽离出 hooks
function resetAll() {
  codeStore.clear()
  ElMessage.success('清空所有数据成功')
}

//-----------------悬浮菜单
const isShowTrigger = ref(false)
</script>

<template>
  <el-container class="app-container">
    <!--    顶栏-->
    <el-header :height="`${styleHeaderHeight}px`" class="shadow bg-white sticky top-0 z-40">
      <el-row
        :style="{ height: `${styleHeaderHeight}px`, 'line-height': `${styleHeaderHeight}px` }"
      >
        <el-col :span="4"> LowCodeDemo</el-col>
        <el-col :span="16" />
        <el-col :span="4" class="justify-end flex items-center">
          <el-button type="danger" @click="resetAll">重置</el-button>
          <el-button type="primary">预览</el-button>
        </el-col>
      </el-row>
    </el-header>

    <!--    下部中间操作区-->
    <el-main class="flex flex-grow overflow-visible">
      <div class="main-wrapper">
        <!--        左侧面板-->
        <div ref="libraryPanelRef" class="panel panel-left">
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
              <router-view />
            </el-tab-pane>
          </el-tabs>
        </div>

        <!--        中间手机模型-->
        <div class="panel panel-main h-full" @mousedown="freeFocus">
          <div ref="editPanelRef" class="edit-wrapper">
            <edit-panel />
          </div>
        </div>

        <!--        右侧参数面板-->
        <div class="panel panel-right">
          <a-resize-box
            :directions="['left']"
            class="panel-right-wrapper"
            @moving-start="onRightPanelResizeStart"
            @moving-end="onRightPanelResizeEnd"
          >
            <attribute-panel />
          </a-resize-box>
        </div>

        <a-trigger
          v-model:popup-visible="isShowTrigger"
          update-at-scroll
          position="top"
          trigger="click"
          class="button-trigger-wrapper"
          :render-to-body="false"
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
                按住<kbd>ctrl</kbd>可以临时禁止拖动
              </a-menu-item>
            </a-menu>
          </template>
        </a-trigger>
      </div>
    </el-main>
  </el-container>
</template>

<style lang="scss" scoped>
// 属性面板距离编辑器最小距离
$blank-min-width: 100px;

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

.app-container {
  @apply min-h-screen flex-col;
  --style-header-height: v-bind(`${styleHeaderHeight}px`);
  --body-width: v-bind(bodyWidth);
  --edit-panel-width: v-bind(editPanelWidth);
  --library-panel-width: v-bind(libraryPanelWidth);
  --blank-min-width: #{$blank-min-width};

  :deep(.el-main) {
    --el-main-padding: 0;
  }

  :deep(.el-collapse-item__header) {
    --el-collapse-header-height: 35px;
  }
}

.main-wrapper {
  background-color: #f7f7f959;
  @apply flex flex-grow;
  .panel {
    @apply flex;
  }

  .panel-right,
  .panel-left {
    // 防止未悬浮情况下元素塌陷
    height: calc(100vh - var(--style-header-height));
    @apply sticky;
    top: var(--style-header-height);
  }

  .panel-left {
    width: 385px;

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

  .panel-main {
    @apply flex-grow relative;

    .edit-wrapper {
      flex-basis: 375px;
      min-height: 812px;
      max-width: 375px;
      --tw-translate-x: calc(
        (var(--body-width) - var(--edit-panel-width)) / 2 - var(--library-panel-width)
      );

      @apply flex-col flex transform-gpu;
      .edit {
        box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2);
        @apply h-full w-full flex-1;
      }
    }
  }

  .panel-right {
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

  // 悬浮菜单
  --button-trigger-bottom: 40px;
  :deep(.button-trigger-wrapper) {
    @apply fixed;
    bottom: calc(40px + var(--button-trigger-bottom));
    top: unset !important;
  }
  .button-trigger {
    @apply flex justify-center items-center rounded-full cursor-pointer transition text-white select-none fixed;
    width: 40px;
    height: 40px;
    background-color: var(--color-neutral-5);
    right: calc(var(--library-panel-width) + 40px);
    bottom: var(--button-trigger-bottom);
    &.button-trigger-active {
      background-color: var(--color-neutral-4);
    }
  }
}
</style>
