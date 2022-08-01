<template>
  <van-image
    height="100"
    src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
    width="100"
  />
</template>

<script lang="tsx">
import type { libraryComponent } from "@/library/registerController";
import { Image as VanImage } from "vant";

export default {
  name: "LibImage",
  libraryName: "generics",
  tabName: "show",
  order: 2,
  tips: {
    title: "图片展示",
    desc: "可以用来展示一张图片，支持静态设置图片地址",
    preview: (
      <>
        <VanImage width="100" height="100"></VanImage>
      </>
    ),
  },
} as libraryComponent;
</script>

<style scoped></style>
