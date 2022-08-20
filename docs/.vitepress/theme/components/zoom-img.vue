<script setup>
import { withBase } from 'vitepress'
import { ElImage } from 'element-plus'
import 'element-plus/theme-chalk/base.css'
import 'element-plus/theme-chalk/el-image.css'
import 'element-plus/theme-chalk/el-image-viewer.css'

defineProps({
  src: String,
})
</script>

<template>
  <p>
    <el-image :src="withBase(src)" :preview-src-list="[withBase(src)]" :hide-on-click-modal="true"
      >{{}}</el-image
    >
  </p>
</template>

<style></style>
