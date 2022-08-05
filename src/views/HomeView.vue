<script lang="ts" setup>
import { ref } from 'vue'
import { IconBulb, IconClose, IconQuestionCircle } from '@arco-design/web-vue/es/icon'
import { useCodeStore } from '@/stores/code'
import libraryPanels from '@/components/libraryPanel'
import AttributePanel from '@/components/attributePanel/index.vue'
import EditPanel from '@/components/editPanel/index.vue'

// TODO:禁止自己拖入自己，从组件区域拖出去再拖入自己区域时候图标应该是禁止，不应该是默认的
//-----------页面布局
const styleHeaderHeight = '60px'
const codeStore = useCodeStore()

const editPanelRef = ref<InstanceType<typeof HTMLElement>>()
const editPanelRect = useElementBounding(editPanelRef)
const maxWidthRightPanel = computed(() => {
  return `${useWindowSize().width.value - editPanelRect.right.value - 100}px`
})
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
  <el-container class="app-container h-screen">
    <!--    顶栏-->
    <el-header :height="styleHeaderHeight" class="shadow">
      <el-row :style="{ height: styleHeaderHeight, 'line-height': styleHeaderHeight }">
        <el-col :span="4"> LowCodeDemo</el-col>
        <el-col :span="16" />
        <el-col :span="4" class="justify-end flex items-center">
          <el-button type="danger" @click="resetAll">重置</el-button>
          <el-button type="primary">预览</el-button>
        </el-col>
      </el-row>
    </el-header>

    <!--    下部中间操作区-->
    <el-main>
      <div class="main-wrapper h-full">
        <!--        左侧面板-->
        <div class="panel panel-left h-full">
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
          <a-trigger
            v-model:popup-visible="isShowTrigger"
            trigger="click"
            position="top"
            update-at-scroll
          >
            <div class="button-trigger" :class="{ 'button-trigger-active': isShowTrigger }">
              <IconClose v-if="isShowTrigger" />
              <IconQuestionCircle v-else />
            </div>
            <template #content>
              <a-menu
                :style="{ marginBottom: '-4px' }"
                mode="popButton"
                :tooltip-props="{ position: 'left' }"
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

        <!--        右侧参数面板-->
        <div class="panel panel-right h-full">
          <a-resize-box
            class="panel-right-wrapper"
            :directions="['left']"
            @moving-start="onRightPanelResizeStart"
            @moving-end="onRightPanelResizeEnd"
          >
            <attribute-panel />
          </a-resize-box>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<style lang="scss" scoped>
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
  :deep(.el-main) {
    --el-main-padding: 0;
  }

  :deep(.el-collapse-item__header) {
    --el-collapse-header-height: 35px;
  }
}

.main-wrapper {
  @apply relative;
  .panel {
    @apply flex absolute;
  }

  .panel-left {
    width: 385px;
    @apply left-0 top-0;

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
    @apply flex-1 relative;

    // 悬浮菜单
    .button-trigger {
      @apply flex justify-center items-center absolute rounded-full cursor-pointer transition-all text-white select-none;
      bottom: 40px;
      right: 40px;
      width: 40px;
      height: 40px;
      background-color: var(--color-neutral-5);
    }
    .button-trigger.button-trigger-active {
      background-color: var(--color-neutral-4);
    }

    .edit-wrapper {
      flex-basis: 375px;
      min-height: 812px;
      max-width: 375px;

      @apply flex-col flex m-auto;
      .edit {
        box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2);
        @apply h-full w-full flex-1;
      }
    }
  }

  .panel-right {
    @apply right-0 top-0;
    .panel-right-wrapper {
      @apply flex;
      width: 385px;
      min-width: 20vw;
      max-width: v-bind(maxWidthRightPanel);
    }

    .el-tabs {
      @apply flex-grow flex-col;
    }
  }
}
</style>
