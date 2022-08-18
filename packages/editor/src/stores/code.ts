import type {
  LibraryComponent,
  LibraryComponentInstanceData,
  LibraryComponentInstanceFocus,
  LibraryComponentsInstanceTree,
  OutlineData,
} from '@cow-code-low-code/types'
import type { ComputedRef } from 'vue'
import { libraryMap, libraryRecord } from '@/library'
import { arrResort } from '@/utils/map-schemes-2-outline'

export const useCodeStore = defineStore(
  'CodeStore',
  () => {
    const jsonCode = ref<LibraryComponentsInstanceTree>([])
    /**
     * 想到三种方案
     * 1. 在原本组件实例数据上根据 focus:true 自动去找是哪个组件被选中了
     *    这种方案就不要下面 focusData 了，但是有个问题，需要再设置一遍其他组件 focus:false
     * 2. *使用下面 focusData 记录是哪个组件被选中了
     *    这种方案避免了 focus:true 处理唯一的问题
     * 3. 使用 focusData 记录被选中组件在JSON中的路径，根据路径就可以直达被选中组件
     *    问题是拖动组件换顺序之后要全部重新计算
     */
    const focusData = ref<LibraryComponentInstanceFocus>()

    /**
     * 被拖拽的组件
     */
    const draggedElement = ref<LibraryComponent>()

    /**
     * 大纲数据
     */
    //const outlineData = ref<OutlineData[]>([])

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
     * @param focus
     */
    function getLibraryComponentInstanceDataAndSchema(
      focus?: LibraryComponentInstanceFocus
    ): [LibraryComponentInstanceData, LibraryComponent] {
      let focusData_ = focus
      if (!focus) focusData_ = focusData.value
      if (!focusData_) throw new TypeError('focusData_和focus不能同时为undefined')
      /**
       * TODO: 这里应该加缓存，记录已经找到过的组件的uuid，缓存进键值对
       */
      let focusedLibraryComponentInstanceData: LibraryComponentInstanceData | undefined = undefined
      for (const jsonCodeElement of jsonCode.value) {
        if (jsonCodeElement?.uuid === focusData_.uuid) {
          focusedLibraryComponentInstanceData = jsonCodeElement
          break
        }
      }

      if (!focusedLibraryComponentInstanceData)
        throw new Error(`not found focusedLibraryComponentData(uuid): ${focusData_.uuid}`)

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

    // 添加被拖拽的数据
    const updateDraggedElement = (element: LibraryComponent) => {
      draggedElement.value = element
    }

    // 清空被拖拽的数据
    const removeDraggedElementAndCompId = () => {
      draggedElement.value = undefined
    }

    // 监听 jsonSchemes 的变化。给大纲数据赋值
    const outlineData: ComputedRef<OutlineData[]> = computed(() => {
      return jsonCode.value.map((item) => {
        const tempEle = libraryMap[item.componentName]
        return {
          uuid: item.uuid,
          title: tempEle.libraryPanelShowDetail.title,
        }
      })
    })

    // 拖拽大纲顺序时，修改 jsonCode
    const updateJsonCodeAtDragged = (draggingNodeId: string, dropNodeId: string) => {
      const oldIndex = jsonCode.value.findIndex((item) => item.uuid === draggingNodeId)
      const newIndex = jsonCode.value.findIndex((item) => item.uuid === dropNodeId)
      arrResort(jsonCode.value, oldIndex, newIndex)
    }

    return {
      jsonCode,
      focusData,
      draggedElement,
      outlineData,
      dispatchFocus,
      getLibraryComponentInstanceDataAndSchema,
      clear,
      freeFocus,
      updateDraggedElement,
      removeDraggedElement: removeDraggedElementAndCompId,
      updateJsonCodeAtDragged,
    }
  },
  {
    persist: {
      enabled: true,
      strategies: [
        {
          storage: sessionStorage,
          paths: ['jsonCode', 'outlineData'],
        },
      ],
    },
  }
)
