<template>
  <div class="home-header">
    <el-row :style="{ height: props.styleHeaderHeight, 'line-height': props.styleHeaderHeight }">
      <el-col :span="4">
        <div class="logo-wrapper">
          <div class="logo" />
        </div>
      </el-col>
      <el-col :span="16" />
      <el-col :span="4" class="justify-end flex items-center">
        <el-button type="danger" @click="handleResetAll">重置</el-button>
        <el-button type="primary">预览</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'HomeHeader',
})

interface HeaderProps {
  styleHeaderHeight?: string
}

const props = withDefaults(defineProps<HeaderProps>(), {
  styleHeaderHeight: '60px',
})

const emits = defineEmits<{
  (e: 'handleResetAll'): void
}>()

const handleResetAll = () => {
  emits('handleResetAll')
}
</script>

<style lang="scss" scoped>
.logo-wrapper {
  @apply flex items-center;
  height: var(--style-header-height);
  line-height: var(--style-header-height);
  .logo {
    @apply w-full;
    height: 50px;
    background: url('/src/assets/images/logo.svg') no-repeat;
  }
}
</style>
