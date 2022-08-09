<template>
  <library-panel-base :current-modules="currentModules" :vm-options="vmOptions" />
</template>

<script lang="tsx">
import LibraryPanelBase from './components/library-panel-base.vue'
import { LibraryNameEnum, type LibraryPanel } from '@/views/library-panel/types'
import { getLibraryModules } from '@/library'

const vmOptions = {
  name: 'GenericsLib',
  libraryName: LibraryNameEnum.generics,
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
 * @see generics-lib.manual.vue.unused
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
