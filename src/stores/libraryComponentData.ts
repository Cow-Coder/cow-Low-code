import { defineStore } from "pinia";
import { ref } from "vue";
import type { ILibraryComponentInstanceData } from "@/components/editPanel/types";

export const useLibraryComponentData = defineStore(
  "LibraryComponentData",
  () => {
    const focusData = ref<ILibraryComponentInstanceData>();

    return {
      focusData,
    };
  }
);
