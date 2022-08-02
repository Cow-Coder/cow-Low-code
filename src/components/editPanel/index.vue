<template>
  <draggable
    v-model="editableInstancedLibraryComponentData"
    class="edit"
    group="library"
    item-key="id"
  >
    <template #item="{ element }">
      <div>
        <component :is="parseLibraryComponent(element)"></component>
      </div>
    </template>
  </draggable>
</template>

<script lang="ts">
import draggable from "vuedraggable";

export default {
  name: "editPanel",
  components: {
    draggable,
  },
};
</script>

<script lang="ts" setup>
import type { IEditableInstancedLibraryComponentData } from "@/components/editPanel/types";
import { useVModel } from "@vueuse/core";
import { libraryRecord } from "@/library";
import type { PropType } from "vue";

const emit = defineEmits(["update:moduleValue"]);

const props = defineProps({
  moduleValue: {
    type: Array as PropType<IEditableInstancedLibraryComponentData[]>,
    default: () => [],
  },
});
const editableInstancedLibraryComponentData = useVModel(
  props,
  "moduleValue",
  emit,
  { passive: true }
);

// 根据名称解析物料组件库内的组件，这里没有注册全局组件是避免污染全局组件名称
function parseLibraryComponent(data: IEditableInstancedLibraryComponentData) {
  console.log(`parseLibraryComponent`, data);
  for (const libMapElementElement of libraryRecord[data.libraryName]) {
    if (libMapElementElement.name === data.componentName) {
      return libMapElementElement;
    }
  }
  throw new Error(`not found library component: ${data.libraryName}`);
}
</script>

<style scoped></style>
