<template>
  <library-panel-base
    :vm-options="vmOptions"
    :current-modules="currentModules"
  ></library-panel-base>
</template>

<script lang="tsx">
import {
  ELibraryName,
  type ILibraryPanel,
} from "@/components/libraryPanel/types";
import LibraryPanelBase from "@/components/libraryPanel/libraryPanelBase.vue";
import { getLibraryModules } from "@/library";

const vmOptions = {
  name: "genericsLib",
  libraryName: ELibraryName.generics,
  libraryTitle: "通用组件",
  tabsList: {
    show: {
      title: "展示",
    },
    form: {
      title: "表单",
    },
    container: {
      title: "容器",
    },
  },
} as ILibraryPanel;

export default {
  ...vmOptions,
  components: {
    LibraryPanelBase,
  },
  setup() {
    const currentModules = getLibraryModules(vmOptions.libraryName);
    return {
      vmOptions,
      currentModules,
    };
  },
};
</script>
