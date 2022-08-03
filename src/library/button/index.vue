<template>
  <!--  TODO: van开头的组件不会自动识别 -->
  <van-button type="primary">{{ title }}</van-button>
</template>

<script lang="tsx">
import { Button } from "vant";
import { ElIcon } from "element-plus";
import { Aim } from "@element-plus/icons-vue";
import { ELibraryName } from "@/components/libraryPanel/types";
import { EAttributePanels } from "@/components/attributePanel/types";
import {
  createLibraryComponentPropItem,
  defineLibraryComponent,
} from "@/utils/library";
import { EEditableConfigItemInputType } from "@/components/editPanel/types";

export default {
  ...defineLibraryComponent({
    name: "LibButton",
    libraryName: ELibraryName.generics,
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
  }),
  props: {
    title: createLibraryComponentPropItem({
      title: "按钮名称",
      default: "按钮",
      formType: EEditableConfigItemInputType.input,
      belongToPanel: EAttributePanels.generic,
    }),
  },
};
</script>

<style lang="scss" scoped></style>
