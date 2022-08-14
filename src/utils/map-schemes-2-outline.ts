import type { OutlineData } from '@/types/library-component'

export interface DisplayOutline {
  label: string
  children?: DisplayOutline
}

export const mapSchemes2Outline = (outlineData: OutlineData[]) => {
  const doneOutline: DisplayOutline[] = outlineData?.map((item) => {
    const tempOutline: DisplayOutline = {
      label: item.title,
    }
    return tempOutline
  })
  return doneOutline
}
