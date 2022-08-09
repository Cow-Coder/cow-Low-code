import { type AttributePanelTabConfig, EAttributePanels } from '@/views/attribute-panel/types'
import EventTab from '@/views/attribute-panel/components/event-tab.vue'

export const panelList: AttributePanelTabConfig[] = [
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
