import { v4 as uuidv4 } from "uuid";
import type { IEditableConfig, ILibraryComponent } from "@/library/types";
import type {
  IEditableConfigPanelItemSchema,
  IEditableConfigValue,
  IEditableInstancedLibraryComponentData,
} from "@/components/editPanel/types";
import { EAttributePanels } from "@/components/attributePanel/types";
import { cloneDeep } from "lodash";

export const uuid = uuidv4;

/**
 * 从物料组件克隆一个组件实例
 * @param com
 */
export function createEditableInstancedLibraryComponentData(
  com: ILibraryComponent
): IEditableInstancedLibraryComponentData {
  const data = {
    uuid: uuidv4(),
    componentName: com.name,
    libraryName: com.libraryName,
    focus: false,
  };
  if (com.editableConfig) {
    Object.assign(data, {
      editableConfig: createEditableValueByConfig(com.editableConfig),
    });
  }
  return data;
}

/**
 * 生成组件实例属性
 * @param config
 */
export function createEditableValueByConfig(
  config: IEditableConfig
): IEditableConfigValue {
  const _config = cloneDeep(config);
  const result = {} as IEditableConfigValue;
  Object.entries(_config).forEach(([panelIdentifier, configSchema]) => {
    const enumPanelIdentifier =
      panelIdentifier as keyof typeof EAttributePanels;
    result[EAttributePanels[enumPanelIdentifier]] = configSchema.reduce(
      (pre, cursor) => {
        pre[cursor.name] = cursor.default ?? undefined;
        return pre;
      },
      {} as Record<string, any>
    );
  });
  return result;
}

/**
 * 快速定义物料组件
 * @param com
 */
export function defineLibraryComponent(com: ILibraryComponent) {
  return com;
}

/**
 * 快速创建物料组件可编辑的一个属性
 * @param data
 */
export function createEditableConfigPanelItem(
  data: IEditableConfigPanelItemSchema
) {
  return data;
}
