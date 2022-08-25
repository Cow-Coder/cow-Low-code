<template>
  <div class="home-header">
    <el-row :style="{ height: styleHeaderHeight, 'line-height': styleHeaderHeight }">
      <el-col :span="10">
        <a-space v-if="false" class="edit-action-area" size="large">
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
        <div class="logo-wrapper">
          <a
            href="https://github.com/Cow-Coder/cow-Low-code"
            title="牛搭项目地址"
            target="_blank"
            draggable="false"
          >
            <img
              src="@/assets/images/logo.svg"
              alt="牛搭项目地址"
              title="牛搭项目地址"
              class="logo"
              draggable="false"
            />
          </a>
        </div>
      </el-col>
      <el-col :span="4">
        <div v-if="false" class="logo-wrapper">
          <a
            href="https://github.com/Cow-Coder/cow-Low-code"
            title="牛搭项目地址"
            target="_blank"
            draggable="false"
          >
            <img
              src="@/assets/images/logo.svg"
              alt="牛搭项目地址"
              title="牛搭项目地址"
              class="logo"
              draggable="false"
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
          <el-button type="danger" @click="onResetAll">重置</el-button>
          <el-button type="primary" @click="onTogglePreviewDialog">预览</el-button>
          <el-button @click="togglePublishDialog">发布</el-button>
        </a-space>
      </el-col>
    </el-row>
  </div>
  <component :is="previewComponent" />
  <component :is="publishComponent" />
</template>

<script lang="ts" setup>
import { Redo as IconRedo, Undo as IconUndo } from '@icon-park/vue-next'
import usePreset from './use-preset'
import usePreview from '@/views/home/components/home-header/use-preview'
import useStateShot from '@/views/home/components/home-header/use-stateshot'
import usePublish from '@/views/home/components/home-header/use-publish'
import { useCodeStore } from '@/stores/code'

defineOptions({
  name: 'HomeHeader',
})

defineProps({
  styleHeaderHeight: {
    type: String,
    default: '60px',
  },
})

const codeStore = useCodeStore()
const onResetAll = () => {
  codeStore.clear()
  ElMessage.success('清空所有数据成功')
}

const { undo: onUndo, redo: onRedo } = useStateShot()
const { previewComponent, onTogglePreviewDialog } = usePreview()
const { presetList, choosePreset, onPresetSelectChange } = usePreset()
const { publishComponent, togglePublishDialog } = usePublish()
</script>

<style lang="scss" scoped>
.logo-wrapper {
  @apply flex items-center;
  //@apply justify-center;
  @apply justify-start;
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
