import {
  EAttributePanels,
  type IAttributePanelTabConfig,
} from "@/components/attributePanel/types";

export const panelList: IAttributePanelTabConfig[] = [
  {
    title: "属性",
    name: EAttributePanels.appearance,
  },
  {
    title: "外观",
    name: EAttributePanels.attribute,
  },
  {
    title: "事件",
    name: EAttributePanels.event,
  },
];
