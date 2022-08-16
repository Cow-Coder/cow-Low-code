import type { OutlineData } from '@/types/library-component'

export interface TreeData {
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
      label: item.title,
    }
  })
  return doneOutline
}
