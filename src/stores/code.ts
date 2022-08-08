import type {
  ILibraryComponentInstanceData,
  ILibraryComponentInstanceFocus,
} from '@/views/edit-panel/types'
import type { ILibraryComponent } from '@/library/types'
import { libraryRecord } from '@/library'

export const useCodeStore = defineStore(
  'CodeStore',
  () => {
    const jsonCode = ref<ILibraryComponentInstanceData[]>([])
    /**
     * 想到三种方案
     * 1. 在原本组件实例数据上根据 focus:true 自动去找是哪个组件被选中了
     *    这种方案就不要下面 focusData 了，但是有个问题，需要再设置一遍其他组件 focus:false
     * 2. *使用下面 focusData 记录是哪个组件被选中了
     *    这种方案避免了 focus:true 处理唯一的问题
     * 3. 使用 focusData 记录被选中组件在JSON中的路径，根据路径就可以直达被选中组件
     *    问题是拖动组件换顺序之后要全部重新计算
     */
    const focusData = ref<ILibraryComponentInstanceFocus>()

    /**
     * store恢复初始状态
     * Q: 为什么不用 store.$reset() ?
     * A: 使用持久化插件之后reset是sessionStorage的数据
     */
    function clear() {
      jsonCode.value = []
      focusData.value = undefined
    }

    function dispatchFocus(uuid: string, path?: string) {
      focusData.value = {
        uuid,
        path: path ?? '',
      }
      return focusData
    }
    function freeFocus() {
      focusData.value = undefined
    }

    /**
     * 获取当前选中组件的数据和定义
     * @param focusData
     */
    function getLibraryComponentInstanceDataAndSchema(
      focusData: ILibraryComponentInstanceFocus
    ): [ILibraryComponentInstanceData, ILibraryComponent] {
      /**
       * TODO: 这里应该加缓存，记录已经找到过的组件的uuid，缓存进键值对
       */
      let focusedLibraryComponentInstanceData = undefined
      for (const jsonCodeElement of jsonCode.value) {
        if (jsonCodeElement.uuid && jsonCodeElement.uuid === focusData.uuid) {
          // console.log(`jsonCodeElement`, jsonCodeElement, jsonCode);
          focusedLibraryComponentInstanceData = jsonCodeElement
          break
        }
      }
      if (!focusedLibraryComponentInstanceData)
        throw new Error(`not found focusedLibraryComponentData(uuid): ${focusData.uuid}`)

      let focusedLibraryComponentSchema = undefined
      for (const e of libraryRecord[focusedLibraryComponentInstanceData.libraryName]) {
        if (e.name == focusedLibraryComponentInstanceData.componentName) {
          focusedLibraryComponentSchema = e
          break
        }
      }
      if (!focusedLibraryComponentSchema)
        throw new Error(
          `not found focusedLibraryComponentSchema(name): ${focusedLibraryComponentInstanceData.componentName}`
        )
      return [focusedLibraryComponentInstanceData, focusedLibraryComponentSchema]
    }

    return {
      jsonCode,
      focusData,
      dispatchFocus,
      getLibraryComponentInstanceDataAndSchema,
      clear,
      freeFocus,
    }
  },
  {
    persist: {
      enabled: true,
      strategies: [
        {
          storage: sessionStorage,
          paths: ['jsonCode'],
        },
      ],
    },
  }
)
