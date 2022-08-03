<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";

//-----------页面布局
const styleHeaderHeight = "60px";

interface IPanelWidth {
  left: number;
  main: number;
  right: number;
}

const panelWidth = ref<IPanelWidth>({
  left: 20,
  main: 60,
  right: 20,
});
const stylePanelWidth = computed(() => {
  return new Proxy(panelWidth.value, {
    get: (target, property: keyof IPanelWidth, receiver) => {
      return `${target[property]}%`;
    },
  });
});

//----------左侧组件栏
import libraryPanels from "@/components/libraryPanel";
import CodePanel from "@/components/codePanel/index.vue";

//-------------拖拽、数据核心
// TODO:禁止自己拖入自己，从组件区域拖出去再拖入自己区域时候图标应该是禁止，不应该是默认的
import EditPanel from "@/components/editPanel/index.vue";

//-------------右侧面板
import AttributePanel from "@/components/attributePanel/index.vue";
</script>

<template>
  <el-container class="app-container h-screen">
    <!--    顶栏-->
    <el-header :height="styleHeaderHeight" class="shadow">
      <el-row
        :style="{ height: styleHeaderHeight, 'line-height': styleHeaderHeight }"
      >
        <el-col :span="4"> LowCodeDemo</el-col>
        <el-col :span="16"></el-col>
        <el-col :span="4" class="justify-end flex items-center">
          <el-button type="danger">重置</el-button>
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
                <component :is="panel"></component>
              </keep-alive>
            </el-tab-pane>
            <!--            代码面板-->
            <el-tab-pane label="代码">
              <code-panel></code-panel>
            </el-tab-pane>
          </el-tabs>
        </div>

        <!--        中间手机模型-->
        <div class="panel panel-main h-full">
          <div class="edit-wrapper">
            <edit-panel></edit-panel>
          </div>
        </div>

        <!--        右侧参数面板-->
        <div class="panel panel-right h-full">
          <attribute-panel></attribute-panel>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<style lang="scss" scoped>
.app-container {
  :deep(.el-main) {
    --el-main-padding: 0;
  }

  :deep(.el-collapse-item__header) {
    --el-collapse-header-height: 35px;
  }
}

.main-wrapper {
  @apply flex;
  .panel {
    @apply flex;
  }

  .panel-left {
    width: max(v-bind("stylePanelWidth.left"), 385px);

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
    @apply flex-1;

    .edit-wrapper {
      flex-basis: 375px;
      min-height: 812px;

      @apply flex-col flex m-auto;
      .edit {
        box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2);
        @apply h-full w-full flex-1;
      }
    }
  }

  .panel-right {
    width: max(v-bind("stylePanelWidth.left"), 385px);

    .el-tabs {
      @apply flex-grow flex-col;
    }
  }
}
</style>
