import { defineStore } from "pinia";
import { ref, shallowRef } from "vue";
import type {
  ILibraryComponentInstanceData,
  ILibraryComponentInstanceDataAtFocus,
} from "@/components/editPanel/types";

export const useCodeStore = defineStore(
  "CodeStore",
  () => {
    const jsonCode = ref<ILibraryComponentInstanceData[]>([]);
    /**
     * 想到三种方案
     * 1. 在原本组件实例数据上根据 focus:true 自动去找是哪个组件被选中了
     *    这种方案就不要下面 focusData 了，但是有个问题，需要再设置一遍其他组件 focus:false
     * 2. *使用下面 focusData 记录是哪个组件被选中了
     *    这种方案避免了 focus:true 处理唯一的问题
     * 3. 使用 focusData 记录被选中组件在JSON中的路径，根据路径就可以直达被选中组件
     *    问题是拖动组件换顺序之后要全部重新计算
     */
    const focusData = ref<ILibraryComponentInstanceDataAtFocus>();

    function dispatchFocus(uuid: string, path?: string) {
      focusData.value = {
        uuid,
        path: path ?? "",
      };
      return focusData;
    }

    return {
      jsonCode,
      focusData,
      dispatchFocus,
    };
  },
  {
    persist: {
      enabled: true,
      strategies: [
        {
          storage: sessionStorage,
          paths: ["jsonCode"],
        },
      ],
    },
  }
);
