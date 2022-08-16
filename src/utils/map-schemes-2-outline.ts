import type { OutlineData } from '@/types/library-component'

export interface TreeData {
  uuid?: string
  label: string
  children?: TreeData[]
}
/**
 * 映射大纲数据 -> 变成树状结构。
 * @param outlineData
 */
export const mapSchemes2Outline = (outlineData: OutlineData[]) => {
  const doneOutline: TreeData[] = outlineData?.map((item) => {
    return {
      uuid: item.uuid,
      label: item.title,
    }
  })
  return doneOutline
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
