<template>
  <div ref="panelRef" class="home-header panel panel-left">
    <a-resize-box
      v-model:width="panelWidth"
      :directions="['right']"
      class="panel-wrapper panel-left-wrapper"
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
        <!-- 设置面板 -->
        <el-tab-pane label="设置" name="setting-pane" lazy>
          <setting-panel />
        </el-tab-pane>
      </el-tabs>

      <!--      底部提示-->
      <div class="other-icons">
        <a-space direction="vertical" size="large">
          <div class="docs icon">
            <el-tooltip placement="right" content="查看文档">
              <el-link
                :underline="false"
                href="https://cow-coder.github.io/docs-cow-low-code/"
                target="_blank"
              >
                <icon-doc-detail theme="outline" size="19" :stroke-width="4" />
              </el-link>
            </el-tooltip>
          </div>
          <div class="about icon">
            <el-tooltip placement="right" content="关于项目">
              <el-link
                :underline="false"
                href="https://github.com/Cow-Coder/cow-Low-code"
                target="_blank"
              >
                <icon-info theme="outline" size="19" :stroke-width="4" />
              </el-link>
            </el-tooltip>
          </div>
        </a-space>
      </div>
    </a-resize-box>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { ElTabPane } from 'element-plus'
import { DocDetail as IconDocDetail, Info as IconInfo } from '@icon-park/vue-next'
import libraryPanels from './components/library-category-tab-panes'
import CodePanel from './components/code-tab-pane.vue'
import OutlinePanel from './components/outline-panel.vue'
import SettingPanel from './components/setting-panel.vue'
import { useTabResizeStore } from '@/stores/tab-resize'

defineOptions({
  name: 'HomeLeft',
})

const panelRef = ref<HTMLElement>()
// 左下角about等图标居中处理
const tabsNavWidth = ref<string>()
onMounted(() => {
  nextTick(() => {
    const tabsNav = ref<HTMLElement>(panelRef.value!.querySelector('.el-tabs__nav-wrap')!)
    const tabsNavSize = useElementBounding(tabsNav)
    tabsNavWidth.value = `${tabsNavSize.width.value}px`
  })
})

const currentTab = ref('0')

// 伸缩杆显示与隐藏
const panelResizeBarOpacity = ref(0)
const panelResizeBarDisplay = computed(() => {
  return currentTab.value === 'code-tab-pane' ? 'flex' : 'none'
})

// 面板缩放记忆功能
const tabResizeStore = useTabResizeStore()
const { tabWidthRecord } = storeToRefs(tabResizeStore)
const panelWidth = computed({
  get: () => {
    return tabWidthRecord.value[currentTab.value]
  },
  set: (val) => {
    tabWidthRecord.value[currentTab.value] = val
  },
})
</script>

<style lang="scss" scoped>
@use '@/views/home/index.scss';
.panel-left {
  @include index.panelLeftAndRight;
  z-index: 51;
  .el-tabs {
    @apply flex-grow;
    :deep(.el-tabs__content) {
      @apply h-full;
      .el-tab-pane {
        @apply h-full;
      }
    }
  }

  .panel-left-wrapper {
    @apply relative;
    --tabs-nav-width: v-bind(tabsNavWidth);
    .other-icons {
      @apply absolute;
      left: calc(var(--tabs-nav-width) / 2);
      transform: translateX(-50%);
      bottom: 30px;
      .icon {
        color: rgba(0, 0, 0, 0.5);
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

.el-tabs--border-card {
  & > :deep(.el-tabs__content) {
    @apply p-0;
  }
}

:deep(.el-tabs__header.is-left) {
  @apply mr-0;
}
</style>
