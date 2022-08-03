<template>
  <draggable
    v-model="editableInstancedLibraryComponentData"
    class="edit"
    group="library"
    item-key="id"
  >
    <template #item="{ element }">
      <div>
        <component
          :is="parseLibraryComponent(element)"
          @mousedown="onChoose(element)"
        ></component>
      </div>
    </template>
  </draggable>
</template>

<script lang="ts">
export default {
  name: "editPanel",
};
</script>

<script lang="ts" setup>
import type { IEditableInstancedLibraryComponentData } from "@/components/editPanel/types";
import { libraryRecord } from "@/library";
import Draggable from "vuedraggable";
import { useCode } from "@/stores/code";
import { storeToRefs } from "pinia";

const codeStore = useCode();
const { jsonCode: editableInstancedLibraryComponentData } =
  storeToRefs(codeStore);

// const emit = defineEmits(["update:moduleValue"]);

// const props = defineProps({
//   moduleValue: {
//     type: Array as PropType<IEditableInstancedLibraryComponentData[]>,
//     default: () => [],
//   },
// });
// const editableInstancedLibraryComponentData = useVModel(
//   props,
//   "moduleValue",
//   emit,
//   { passive: true }
// );

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

function onChoose(data: IEditableInstancedLibraryComponentData) {
  console.log("onChoose", data);
}

// TODO: 拖拽到编辑器时候显示真实的组件，而不是显示物料面板的按钮
</script>

<style scoped></style>
