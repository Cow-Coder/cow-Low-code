<template>
  <div class="library-item">
    <div class="drag-wrapper button library-component">
      <div class="component-icon">
        <component :is="props.element.libraryPanelShowDetail.icon" />
      </div>
      <div class="desc">{{ props.element.libraryPanelShowDetail.title }}</div>
      <div class="ask-icon">
        <el-tooltip effect="light" placement="right" :popper-class="$style.tipsWrapper">
          <template #default>
            <el-icon size="16">
              <!-- TODO: 换一个icon -->
              <i-ep-question-filled />
            </el-icon>
          </template>
          <template #content>
            <div class="tips-panel">
              <div class="tips-title">{{ props.element.tips.title }}</div>
              <div v-if="props.element.tips.desc" class="tips-desc">
                {{ props.element.tips.desc }}
              </div>
              <div class="tips-preview">
                <component :is="props.element.tips.preview" />
              </div>
            </div>
          </template>
        </el-tooltip>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { LibraryComponent } from '@/types/library-component'

/**
 * 左侧物料组件的按钮
 */
defineOptions({
  name: 'LibraryItem',
})

const props = defineProps<{
  element: LibraryComponent
}>()

const $style = useCssModule()
</script>

<style lang="scss" module>
//组件使用提示
.tipsWrapper {
  @apply shadow;
  padding: 11px;
}
</style>

<style lang="scss" scoped>
// 组件使用提示
.tips-panel {
  max-width: 328px;
  min-height: 80px;
}

.library-component {
  @apply flex items-center border-solid rounded border cursor-pointer;
  border-color: #e8e9eb;
  padding: 0 8px;
  width: 112px;
  height: 32px;
  margin-bottom: 12px;

  &:hover {
    border-color: #2468f2;

    .ask-icon {
      @apply flex;
    }
  }

  .desc {
    @apply flex-auto truncate;
    padding: 0 8px;
  }

  .ask-icon,
  .component-icon {
    @apply flex justify-center items-center;
    flex: 0 0 16px;
  }

  .component-icon {
    width: 16px;
    height: 16px;
  }

  .ask-icon {
    @apply hidden;
  }
}
</style>
