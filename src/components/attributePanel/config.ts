import {
  EAttributePanels,
  type IAttributePanelTabConfig,
} from "@/components/attributePanel/types";

export const panelList: IAttributePanelTabConfig[] = [
  {
    title: "常规",
    name: EAttributePanels.generic,
  },
  {
    title: "外观",
    name: EAttributePanels.appearance,
  },
  {
    title: "事件",
    name: EAttributePanels.event,
  },
];
