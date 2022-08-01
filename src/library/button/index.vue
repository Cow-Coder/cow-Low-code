<template>
  <el-button>按钮template</el-button>
</template>

<script lang="tsx">
import type { libraryComponent } from "@/library/registerController";
import { Button } from "vant";
import { ElIcon } from "element-plus";
import { Aim } from "@element-plus/icons-vue";

export default {
  name: "LibButton",
  libraryName: "generics",
  tabName: "show",
  order: 1,
  libraryPanelShowDetail: {
    title: "按钮",
    icon: (
      <>
        <ElIcon size={16}>
          <Aim />
        </ElIcon>
      </>
    ),
  },
  tips: {
    title: "按钮",
    desc: "用来展示一个按钮，你可以配置不同的展示样式，配置不同的点击行为。",
    preview: (
      <>
        <Button>按钮jsx</Button>
        <Button type="primary">按钮jsx</Button>
        <Button type="success" plain>
          按钮jsx
        </Button>
      </>
    ),
  },
  setup() {
    return {};
  },
} as libraryComponent;
</script>

<style lang="scss" scoped></style>
