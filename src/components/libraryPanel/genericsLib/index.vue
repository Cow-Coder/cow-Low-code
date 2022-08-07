<template>
  <library-panel-base :current-modules="currentModules" :vm-options="vmOptions" />
</template>

<script lang="tsx">
import { ELibraryName, type ILibraryPanel } from '@/components/libraryPanel/types'
import LibraryPanelBase from '@/components/libraryPanel/comps/libraryPanelBase.vue'
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
} as ILibraryPanel

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
