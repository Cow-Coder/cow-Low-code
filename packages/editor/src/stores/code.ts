// @ts-ignore
import type { DropType } from 'element-plus/es/components/tree/src/tree.type'
import type {
  ContainerMap,
  LibraryComponent,
  LibraryComponentInstanceData,
  LibraryComponentInstanceFocus,
  LibraryComponentsInstanceTree,
  SlotItemValue,
} from '@cow-low-code/types'
import type { ComponentPublicInstance, ComputedRef } from 'vue'
import type { TreeData } from '@/utils/map-schemes-2-outline'
import type { PageSetting } from '@cow-low-code/types/src/page'
import { libraryRecord } from '@/library'
import { arrResort, mapSchemes2Outline } from '@/utils/map-schemes-2-outline'
import { useRecurseQuerySchema } from '@/hooks/use-recurse-query-schema'

export const useCodeStore = defineStore(
  'CodeStore',
  () => {
    /**
     * 物料组件JSON树
     */
    const jsonCode = ref<LibraryComponentsInstanceTree>([])

    /**
     * 页面设置
     */
    const pageSetting = ref<PageSetting>({ title: '' })
    watch(
      () => pageSetting.value.title,
      (title) => {
        title !== '' ? useTitle(title) : undefined
      }
    )

    /**
     * 存储 物料组件ref 键值对
     */
    const componentRefMap = new Map<string, ComponentPublicInstance>()
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
     * 容器组件映射
     */
    const containerMap = ref<ContainerMap>({})
    /**
     * store恢复初始状态
     * Q: 为什么不用 store.$reset() ?
     * A: 使用持久化插件之后reset是sessionStorage的数据
     */
    function clear() {
      jsonCode.value = []
      focusData.value = undefined
      containerMap.value = {}
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
      // 拿到对应的组件实例
      const focusedCompInstanceType = useRecurseQuerySchema(focusData_?.uuid)

      if (!focusedCompInstanceType)
        throw new Error(`not found focusedLibraryComponentData(uuid): ${focusData_.uuid}`)
      const focusedLibraryComponentInstanceData =
        focusedCompInstanceType as LibraryComponentInstanceData
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

    // 删除单个组件
    function dispatchDelete(uuid: string) {
      const newJsonCode = jsonCode.value.filter((item) => item.uuid !== uuid)
      jsonCode.value = newJsonCode
      return jsonCode
    }

    // 监听 jsonSchemes 的变化。给大纲数据赋值
    const outlineData: ComputedRef<TreeData[] | undefined> = computed(() =>
      mapSchemes2Outline(jsonCode.value)
    )

    // 拖拽大纲顺序时，修改 jsonCode
    const updateJsonCodeAtDragged = (
      draggingNodeId: string,
      dropNodeId: string,
      dropType: DropType
    ) => {
      let oldIndex = 0
      let newIndex = 0
      const oldComp = jsonCode.value.find((item, index) => {
        oldIndex = index
        return item.uuid === draggingNodeId
      })
      if (oldComp) {
        // 说明是从外层开始拖拽的
        if (dropType === 'inner') {
          // 说明是拖拽到容器组件里了
          const newComp = jsonCode.value.find((item, index) => {
            newIndex = index
            return item.uuid === dropNodeId
          })
          const newSlots = newComp?.props?.slots as SlotItemValue
          newSlots?.slot0?.children.push(oldComp)
          jsonCode.value.splice(oldIndex, 1)
        } else {
          // 重新排序即可
          arrResort(jsonCode.value, oldIndex, newIndex)
        }
      } else {
        //TODO: 从树的子节点拖动时，重新渲染画布
        // 说明是从内层开始拖拽的
      }
    }

    return {
      pageSetting,
      jsonCode,
      focusData,
      draggedElement,
      outlineData,
      componentRefMap,
      containerMap,
      dispatchFocus,
      getLibraryComponentInstanceDataAndSchema,
      clear,
      freeFocus,
      updateDraggedElement,
      removeDraggedElement: removeDraggedElementAndCompId,
      updateJsonCodeAtDragged,
      dispatchDelete,
    }
  },
  {
    persist: {
      enabled: true,
      strategies: [
        {
          storage: sessionStorage,
          paths: ['jsonCode', 'pageSetting', 'outlineData'],
        },
      ],
    },
  }
)
