<template>
  <div class="demo-collapse">
    <el-collapse v-model="activeNames">
      <el-collapse-item title="标题1" name="1" disabled>
        <div>这是折叠面板的内容！！！</div>
      </el-collapse-item>
      <el-collapse-item title="标题2" name="2">
        <div>Simplify the process: keep operating process simple and intuitive;</div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'Preview',
})
const activeNames = ref(['1', '2'])
</script>

<style lang="scss" scoped></style>
