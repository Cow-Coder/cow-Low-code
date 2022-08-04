<template>
  <el-collapse v-model="collapseOpenArr">
    <!--                表单组件-->
    <el-collapse-item
      v-for="(tabItemVal, tabItemKey) in currentModules"
      :key="tabItemKey"
      :name="tabItemKey"
      :title="tabsList[tabItemKey].title"
    >
      <draggable
        :clone="onCloneCallback"
        :group="{ name: 'library', pull: 'clone', put: false }"
        :list="tabItemVal"
        :sort="false"
        class="library-list"
        item-key="id"
      >
        <template #item="{ element }">
          <div class="library-item">
            <div class="drag-wrapper button library-component">
              <div class="component-icon">
                <component
                  :is="element.libraryPanelShowDetail.icon"
                ></component>
              </div>
              <div class="desc">{{ element.libraryPanelShowDetail.title }}</div>
              <div class="ask-icon">
                <el-tooltip
                  effect="light"
                  placement="right"
                  popper-class="tips-wrapper"
                >
                  <template #default>
                    <el-icon :size="16">
                      <!--                      TODO: 换一个icon-->
                      <QuestionFilled />
                    </el-icon>
                  </template>
                  <template #content>
                    <div class="tips-panel">
                      <div class="tips-title">{{ element.tips.title }}</div>
                      <div v-if="element.tips.desc" class="tips-desc">
                        {{ element.tips.desc }}
                      </div>
                      <div class="tips-preview">
                        <component :is="element.tips.preview"></component>
                      </div>
                    </div>
                  </template>
                </el-tooltip>
              </div>
            </div>
          </div>
        </template>
      </draggable>
    </el-collapse-item>
  </el-collapse>
</template>

<script lang="tsx">
/**
 * 完全自行控制
 */
import {
  ELibraryName,
  type ILibraryPanel,
} from "@/components/libraryPanel/types";

const vmOptions = {
  name: "genericsLib",
  libraryName: ELibraryName.generics,
  libraryTitle: "通用组件",
  tabsList: {
    show: {
      title: "展示",
    },
    form: {
      title: "表单",
    },
    container: {
      title: "容器",
    },
  },
} as ILibraryPanel;

/**
 * 这里是手动处理面板物料
 * 如果要自动处理，参考
 * @see index.vue
 */
export default vmOptions;
</script>

<script lang="tsx" setup>
import { getLibraryModules } from "@/library";
import { ref } from "vue";
import type { ILibraryComponent } from "@/library/types";
import { createLibraryComponentInstance } from "@/utils/library";
import Draggable from "vuedraggable";

const currentModules = getLibraryModules(vmOptions.libraryName);
const tabsList = vmOptions.tabsList;

// 保持折叠面板默认打开
const collapseOpenArr = ref(Object.keys(vmOptions.tabsList ?? {}) ?? []);

/**
 * 当drop事件发生的时候，此函数的返回值会push到目标容器list中
 * @param original
 */
function onCloneCallback(original: ILibraryComponent) {
  // console.log(`original`, original);
  return createLibraryComponentInstance(original);
}
</script>

<style lang="scss">
//组件使用提示
.tips-wrapper {
  @apply shadow;
  padding: 11px;
}
</style>

<style lang="scss" scoped>
// 组件使用提示
.tips-panel {
  max-width: 328px;
  min-height: 80px;
}

// 左侧组件列表展示
.library-list {
  @apply flex flex-wrap;
  .library-item {
    flex: 0 0 50%;
  }
}

// 清除折叠面板边框
.el-collapse {
  @apply border-transparent #{!important};
  :deep(.el-collapse-item__wrap),
  :deep(.el-collapse-item__header) {
    @apply border-transparent #{!important};
  }

  // 缩小折叠面板边距，默认的太宽了
  :deep(.el-collapse-item__content) {
    padding-bottom: 0;
  }
}

.library-component {
  @apply flex items-center border-solid rounded border cursor-pointer;
  border-color: #e8e9eb;
  padding: 0 8px;
  width: 112px;
  height: 32px;
  margin-bottom: 12px;

  &:hover {
    border-color: #2468f2;

    .ask-icon {
      @apply flex;
    }
  }

  .desc {
    @apply flex-auto truncate;
    padding: 0 8px;
  }

  .ask-icon,
  .component-icon {
    @apply flex justify-center items-center;
    flex: 0 0 16px;
  }

  .component-icon {
    width: 16px;
    height: 16px;
  }

  .ask-icon {
    @apply hidden;
  }
}
</style>
