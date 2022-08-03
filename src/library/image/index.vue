<template>
  <van-image
    height="100"
    src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
    width="100"
  />
</template>

<script lang="tsx">
import { Image as VanImage } from "vant";
import { ElIcon } from "element-plus";
import { Aim } from "@element-plus/icons-vue";
import { ELibraryName } from "@/components/libraryPanel/types";
import {
  createEditableConfigPanelItem,
  defineLibraryComponent,
} from "@/utils/library";
import { EAttributePanels } from "@/components/attributePanel/types";
import { EEditableConfigItemInputType } from "@/components/editPanel/types";

export default defineLibraryComponent({
  name: "LibImage",
  libraryName: ELibraryName.generics,
  tabName: "show",
  order: 2,
  libraryPanelShowDetail: {
    title: "图片展示",
    icon: (
      <>
        <ElIcon size={16}>
          <Aim />
        </ElIcon>
      </>
    ),
  },
  tips: {
    title: "图片展示",
    desc: "可以用来展示一张图片，支持静态设置图片地址",
    preview: (
      <>
        <VanImage width="100" height="100"></VanImage>
      </>
    ),
  },
  editableConfig: {
    [EAttributePanels.attribute]: [
      createEditableConfigPanelItem({
        name: "url",
        title: "url链接",
        type: EEditableConfigItemInputType.input,
      }),
    ],
  },
});
</script>

<style scoped></style>
