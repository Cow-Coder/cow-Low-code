import { type AttributePanelTabConfig, AttributePanelsEnum } from '@/views/attribute-panel/types'
import EventTab from '@/views/attribute-panel/components/event-tab.vue'

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
