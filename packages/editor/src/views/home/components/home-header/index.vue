<template>
  <div class="home-header">
    <el-row :style="{ height: props.styleHeaderHeight, 'line-height': props.styleHeaderHeight }">
      <el-col :span="4">
        <div class="logo-wrapper">
          <div class="logo" />
        </div>
      </el-col>
      <el-col :span="10" />
      <el-col :span="10" class="justify-end flex items-center">
        <a-space size="large">
          <el-select
            v-model="choosePreset"
            clearable
            filterable
            placeholder="选择预设"
            @change="onPresetSelectChange"
          >
            <el-option v-for="val in presetList" :key="val.label" :value="val.label" />
          </el-select>
          <el-button type="danger" @click="handleResetAll">重置</el-button>
          <el-button type="primary" @click="preview.onTogglePreviewDialog">预览</el-button>
        </a-space>
      </el-col>
    </el-row>
  </div>
  <component :is="preview.previewComponent" />
</template>

<script lang="ts" setup>
import usePresetEvent from './use-preset-event'
import type { Preset } from './type'
import { useCodeStore } from '@/stores/code'
import usePreview from '@/views/home/components/home-header/use-preview'

defineOptions({
  name: 'HomeHeader',
})

const preview = usePreview()

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

// 预设
const codeStore = useCodeStore()
const presetList = reactive<Preset[]>([usePresetEvent()])
const choosePreset = ref<string>('')
function onPresetSelectChange(val: string) {
  if (val === '') return undefined
  const found = presetList.find((e) => e.label === val)!
  if (found.json === '') return undefined
  new Promise(() => {
    codeStore.jsonCode = JSON.parse(found.json)
    ElMessage.success(`已加载: ${found.label}`)
  })
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
