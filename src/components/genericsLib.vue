<template>
  <el-collapse>
    <!--                表单组件-->
    <el-collapse-item title="表单">
      <draggable
        :group="{ name: 'library', pull: 'clone', put: false }"
        :list="libraryArr"
        :sort="false"
        class="library-list"
        item-key="id"
      >
        <template #item="{ element }">
          <div class="library-item">
            <div class="drag-wrapper button library-component">
              <div class="component-icon">
                <el-icon :size="16">
                  <Aim />
                </el-icon>
              </div>
              <div class="desc">按钮{{ element.id }}</div>
              <div class="ask-icon">
                <el-tooltip
                  effect="light"
                  placement="right"
                  popper-class="tips-wrapper"
                >
                  <template #default>
                    <el-icon :size="16">
                      <QuestionFilled />
                    </el-icon>
                  </template>
                  <template #content>
                    <div class="tips-panel">
                      <div class="tips-title">按钮</div>
                      <div class="tips-desc">
                        用来展示一个按钮，你可以配置不同的展示样式，配置不同的点击行为。
                      </div>
                      <div class="tips-preview">
                        <el-button>Default</el-button>
                        <el-button type="primary">Primary</el-button>
                        <el-button type="success">Success</el-button>
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
    <!--                按钮组件-->
    <el-collapse-item title="按钮"> 333</el-collapse-item>
    <!--                展示组件-->
    <el-collapse-item title="展示"> 444</el-collapse-item>
  </el-collapse>
</template>

<script lang="tsx">
import draggable from "vuedraggable";

const vmOptions = {
  name: "genericsLib",
  libraryName: "generics",
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
  components: {
    draggable,
  },
};

export default vmOptions;
</script>

<script lang="tsx" setup>
import registerController from "@/library/registerController";

// console.log(`registerController`, registerController);
const currenLibName = vmOptions.libraryName;
const currentModules = registerController[currenLibName];
const libraryArr = [...new Array(8).keys()].map((e) => ({ id: e }));
</script>

<style lang="scss" scoped>
//组件使用提示
.tips-panel {
  max-width: 328px;
  min-height: 80px;
}

//左侧组件列表展示
.library-list {
  @apply flex flex-wrap;
  .library-item {
    flex: 0 0 50%;
  }
}

.library-component {
  @apply flex items-center border-solid rounded border cursor-pointer truncate;
  border-color: #e8e9eb;
  padding: 0 8px;
  width: 112px;
  height: 32px;
  margin-bottom: 12px;

  &:hover {
    border-color: #2468f2;
  }

  .desc {
    @apply flex-auto;
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
}
</style>
