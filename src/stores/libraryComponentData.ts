import { defineStore } from "pinia";
import { ref } from "vue";
import type { IEditableInstancedLibraryComponentData } from "@/components/editPanel/types";

export const useLibraryComponentData = defineStore(
  "LibraryComponentData",
  () => {
    const focusData = ref<IEditableInstancedLibraryComponentData>();

    return {
      focusData,
    };
  }
);
