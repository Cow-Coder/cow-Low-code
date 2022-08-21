<template>
  <div class="home-header">
    <el-row :style="{ height: props.styleHeaderHeight, 'line-height': props.styleHeaderHeight }">
      <el-col :span="10">
        <a-space class="edit-action-area" size="large">
          <div class="edit-action">
            <el-link :underline="false" title="撤销" @click="onUndo">
              <icon-undo theme="outline" size="19" :stroke-width="3" />
            </el-link>
          </div>
          <div class="edit-action">
            <el-link :underline="false" title="重做" @click="onRedo">
              <icon-redo theme="outline" size="19" :stroke-width="3" />
            </el-link>
          </div>
        </a-space>
      </el-col>
      <el-col :span="4">
        <div class="logo-wrapper">
          <a href="https://github.com/Cow-Coder/cow-Low-code" title="牛搭项目地址" target="_blank">
            <img
              src="@/assets/images/logo.svg"
              alt="牛搭项目地址"
              title="牛搭项目地址"
              class="logo"
              @dragstart.prevent
            />
          </a>
        </div>
      </el-col>
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
          <el-button type="primary" @click="onTogglePreviewDialog">预览</el-button>
        </a-space>
      </el-col>
    </el-row>
  </div>
  <component :is="previewComponent" />
</template>

<script lang="ts" setup>
import { Redo as IconRedo, Undo as IconUndo } from '@icon-park/vue-next'
import usePreset from './use-preset'
import usePreview from '@/views/home/components/home-header/use-preview'
import useStateShot from '@/views/home/components/home-header/use-stateshot'

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

const { undo: onUndo, redo: onRedo } = useStateShot()
const { previewComponent, onTogglePreviewDialog } = usePreview()
const { presetList, choosePreset, onPresetSelectChange } = usePreset()
</script>

<style lang="scss" scoped>
.logo-wrapper {
  @apply flex items-center justify-center;
  height: var(--style-header-height);
  line-height: var(--style-header-height);
  .logo {
    height: 50px;
    //background: url('/src/assets/images/logo.svg') center no-repeat;
  }
}

.edit-action-area {
  @apply flex items-center select-none;
  .edit-action {
  }
}
</style>
