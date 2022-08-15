import type { OutlineData } from '@/types/library-component'
import type { TreeData } from '@/components/base-ui/kzy-tree-control/types'

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
