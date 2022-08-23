import type {
  LibraryComponentInstanceData,
  SlotItemValue,
  WidgetType,
} from '@/types/library-component'
import { libraryMap } from '@/library'

export interface TreeData {
  uuid: string
  label: string
  compType: WidgetType
  children?: TreeData[]
}
/**
 * 映射大纲数据 -> 变成树状结构。
 * @param jsonSchemas
 */
export const mapSchemes2Outline = (jsonSchemas: LibraryComponentInstanceData[]) => {
  if (jsonSchemas.length === 0) return
  // 返回的树结构
  const doneTreeData = [] as TreeData[]
  const tempTreeDataMap: any = {}
  // 先构建一级节点
  jsonSchemas.forEach((item) => {
    // 先将一级节点放入中 tempTreeDataMap
    const libraryInfo = libraryMap[item.componentName]
    const tempTreeData: TreeData = {
      uuid: item.uuid,
      label: libraryInfo.libraryPanelShowDetail.title,
      compType: libraryInfo.widgetType,
    }
    tempTreeDataMap[item.uuid] = tempTreeData
    doneTreeData.push(tempTreeData)
  })

  // 构建子节点
  jsonSchemas.forEach((item) => {
    const libraryInfo = libraryMap[item.componentName]
    if (libraryInfo.widgetType === 'container') {
      const slots = item?.props?.slots as SlotItemValue
      // 收集该容器中的所有插槽
      let slotCompSum: LibraryComponentInstanceData[] = []
      Object.values(slots)
        ?.filter((filterItem) => typeof filterItem !== 'string')
        .forEach((fItem: SlotItemValue) => {
          if (fItem?.children?.length) {
            slotCompSum = [...slotCompSum, ...fItem.children]
          }
        })
      const parent = tempTreeDataMap[item.uuid] as TreeData
      if (!parent?.children) {
        parent.children = []
      }
      parent.children = mapSchemes2Outline(slotCompSum)
    }
  })
  return doneTreeData
}
/**
 * 使数组重新排序
 * @param targetArr ：目标数组
 * @param oldIndex ：以前索引【被拖拽】
 * @param newIndex ：目标索引【拖拽放下后的索引】
 */
export const arrResort = (targetArr: any[], oldIndex: number, newIndex: number) => {
  if (targetArr.length === 0) return

  if (newIndex > oldIndex) {
    /*
      1、从前 -> 到后
      2、在目标位置后面添加一个被拖拽的元素
      3、将原先索引的元素删除掉
     */
    targetArr.splice(newIndex + 1, 0, targetArr[oldIndex])
    targetArr.splice(oldIndex, 1)
  } else {
    /*
      1、从后 -> 到前
      2、在目标位置添加一个被拖拽的元素
      3、将原先索引 + 1 元素删除掉
     */
    targetArr.splice(newIndex, 0, targetArr[oldIndex])
    targetArr.splice(oldIndex + 1, 1)
  }
}
