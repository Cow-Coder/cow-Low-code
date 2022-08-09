import type { DefineComponent } from '@/types/library-component'
import { AttributePanelsEnum } from '@/types/panel'
import EventTab from '@/views/home/components/home-right/components/attribute-panel/components/event-tab-pane.vue'

/**
 * 单个子tab配置
 */
interface AttributePanelTabConfig {
  /**
   * 显示的文字
   */
  title: string
  /**
   * 唯一标识符
   */
  name: AttributePanelsEnum
  /**
   * 自定义组件
   */
  component?: DefineComponent
}

export const panelList: AttributePanelTabConfig[] = [
  {
    title: '常规',
    name: AttributePanelsEnum.generic,
  },
  {
    title: '外观',
    name: AttributePanelsEnum.appearance,
  },
  {
    title: '事件',
    name: AttributePanelsEnum.event,
    component: EventTab,
  },
]
