import { defineStore } from "pinia";
import { ref } from "vue";

export const useStorage = defineStore("Storage", () => {
  const code = ref<Record<string, unknown>>({});

  return {
    code,
  };
});
