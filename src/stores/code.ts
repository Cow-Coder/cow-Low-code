import { defineStore } from "pinia";
import { ref, shallowRef } from "vue";
import type { IEditableInstancedLibraryComponentData } from "@/components/editPanel/types";

export const useCode = defineStore(
  "Code",
  () => {
    const jsonCode = ref<IEditableInstancedLibraryComponentData[]>([]);

    return {
      jsonCode,
    };
  },
  {
    persist: {
      enabled: true,
      strategies: [
        {
          storage: localStorage,
        },
      ],
    },
  }
);
