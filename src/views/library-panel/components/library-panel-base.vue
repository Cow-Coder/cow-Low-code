<template>
  <library-panel-base :current-modules="currentModules" :vm-options="vmOptions" />
</template>

<script lang="tsx">
import { ELibraryName, type LibraryPanel } from '@/views/library-panel/types'
import LibraryPanelBase from '@/views/library-panel/index.vue'
import { getLibraryModules } from '@/library'

const vmOptions = {
  name: 'genericsLib',
  libraryName: ELibraryName.generics,
  libraryTitle: '通用组件',
  tabsList: {
    show: {
      title: '展示',
    },
    form: {
      title: '表单',
    },
    container: {
      title: '容器',
    },
  },
} as LibraryPanel

/**
 * 这里是自动处理面板物料
 * 如果要自行完全控制，参考
 * @see manual.vue
 */
export default {
  ...vmOptions,
  components: {
    LibraryPanelBase,
  },
  setup() {
    const currentModules = getLibraryModules(vmOptions.libraryName)
    return {
      vmOptions,
      currentModules,
    }
  },
}
</script>
