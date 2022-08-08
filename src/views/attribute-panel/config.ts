import { EAttributePanels, type IAttributePanelTabConfig } from '@/views/attribute-panel/types'
import EventTab from '@/views/attribute-panel/components/event-tab/index.vue'

export const panelList: IAttributePanelTabConfig[] = [
  {
    title: '常规',
    name: EAttributePanels.generic,
  },
  {
    title: '外观',
    name: EAttributePanels.appearance,
  },
  {
    title: '事件',
    name: EAttributePanels.event,
    component: EventTab,
  },
]
