<template>
  <el-container class="app-container">
    <!-- 顶栏 -->
    <el-header :height="styleHeaderHeight" class="shadow bg-white sticky top-0 z-40">
      <home-header :style-header-height="styleHeaderHeight" @handle-reset-all="resetAll" />
    </el-header>

    <!--    左中右操作区-->
    <el-main class="flex flex-grow overflow-visible">
      <div class="main-wrapper">
        <!-- 左侧面板 -->
        <home-left ref="libraryPanelRef" class="panel" />

        <!--  中间手机模型【画布区】 -->
        <div class="panel panel-main h-full" @mousedown="freeFocus">
          <div ref="editPanelRef" class="edit-wrapper">
            <edit-panel />
          </div>
        </div>

        <!-- 右侧参数面板 -->
        <home-right ref="attributePanelRef" class="panel" />

        <!-- 浮动提示栏 -->
        <float-tips />
      </div>
    </el-main>
  </el-container>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import EditPanel from '@/views/home/components/edit-panel.vue'
import HomeHeader from '@/views/home/components/home-header.vue'
import HomeLeft from '@/views/home/components/home-left/index.vue'
import HomeRight from '@/views/home/components/home-right/index.vue'
import FloatTips from '@/views/home/components/float-tips.vue'
import { useCodeStore } from '@/stores/code'

defineOptions({
  name: 'Home',
})

// TODO:禁止自己拖入自己，从组件区域拖出去再拖入自己区域时候图标应该是禁止，不应该是默认的
//-----------页面布局
const styleHeaderHeight = ref(`${60}px`)

// 同步 属性面板 宽度到css变量
const editPanelRef = ref<InstanceType<typeof HTMLElement>>()
const editPanelRect = reactive(useElementSize(editPanelRef))
const editPanelWidth = ref(`${editPanelRect.width}px`)
watchThrottled(editPanelRect, () => (editPanelWidth.value = `${editPanelRect.width}px`), {
  throttle: 10,
})

const bodyRect = reactive(useElementSize(document.body))
const bodyWidth = ref(`${bodyRect.width}px`)
watchThrottled(bodyRect, () => (bodyWidth.value = `${bodyRect.width}px`), {
  throttle: 10,
})

// 同步 编辑器面板 宽度到css变量
const libraryPanelRef = ref<InstanceType<typeof HTMLElement>>()
const libraryPanelRect = reactive(useElementSize(libraryPanelRef))
const libraryPanelWidth = ref(`${libraryPanelRect.width}px`)
watchThrottled(libraryPanelRect, () => (libraryPanelWidth.value = `${libraryPanelRect.width}px`), {
  throttle: 10,
})

// 同步 属性面板 宽度到css变量
const attributePanelRef = ref<InstanceType<typeof HTMLElement>>()
const attributePanelRect = reactive(useElementSize(attributePanelRef))
const attributePanelWidth = ref(`${attributePanelRect.width}px`)
watchThrottled(
  attributePanelRect,
  () => (attributePanelWidth.value = `${attributePanelRect.width}px`),
  { throttle: 10 }
)

const codeStore = useCodeStore()
function freeFocus() {
  codeStore.freeFocus()
}

function resetAll() {
  codeStore.clear()
  ElMessage.success('清空所有数据成功')
}
</script>

<style lang="scss" scoped>
$blank-min-width: 100px;

.app-container {
  @apply min-h-screen flex-col;
  --style-header-height: v-bind(styleHeaderHeight);
  --body-width: v-bind(bodyWidth);
  --edit-panel-width: v-bind(editPanelWidth);
  --library-panel-width: v-bind(libraryPanelWidth);
  --attribute-panel-width: calc(v-bind(attributePanelWidth) - 6px);
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
  .panel-main {
    @apply flex-grow relative;

    .edit-wrapper {
      flex-basis: 375px;
      min-height: $screamMinHeight;
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
}
</style>
