<template>
  <div class="home-header">
    <el-row :style="{ height: props.styleHeaderHeight, 'line-height': props.styleHeaderHeight }">
      <el-col :span="4"> LowCodeDemo</el-col>
      <el-col :span="16" />
      <el-col :span="4" class="justify-end flex items-center">
        <el-button type="danger" @click="handleResetAll">重置</el-button>
        <el-button type="primary">预览</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
interface propsType {
  styleHeaderHeight?: string
}

const props = withDefaults(defineProps<propsType>(), {
  styleHeaderHeight: '60px',
})

const emits = defineEmits<{
  (e: 'handleResetAll'): void
}>()

const handleResetAll = () => {
  emits('handleResetAll')
}
</script>

<style lang="scss" scoped></style>
