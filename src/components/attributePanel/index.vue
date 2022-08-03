<template>
  <el-tabs type="border-card">
    <el-tab-pane v-for="item in panelList" :key="item.name" :label="item.title">
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts">
export default {
  name: "attributePanel",
};
</script>

<script lang="ts" setup>
import { panelList } from "@/components/attributePanel/config";
</script>

<style scoped></style>
