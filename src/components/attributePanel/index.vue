<template>
  <el-tabs type="border-card">
    <el-tab-pane
      v-for="panelItem in panelList"
      :key="panelItem.name"
      :label="panelItem.title"
    >
      <el-form
        v-if="
          componentSchema &&
          getPanelEditableConfigByEnumPanel(componentSchema, panelItem['name'])
        "
        :model="
          getPanelEditableConfigByEnumPanel(componentData, panelItem['name'])
        "
      >
        <el-form-item
          v-for="formItemSchema in getPanelEditableConfigByEnumPanel(
            componentSchema,
            panelItem['name']
          )"
          :key="formItemSchema.name"
          :label="formItemSchema.title"
        >
          <component
            :is="
              formItemChildRender(
                componentData,
                panelItem['name'],
                formItemSchema
              )
            "
          ></component>
        </el-form-item>
      </el-form>
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="tsx">
export default {
  name: "attributePanel",
};
</script>

<script lang="tsx" setup>
/*
这里有两种遍历方式
1. 纯粹遍历 panelList
   问题在于组件属性schema和data全部都要从起点开始拿
   比如
   componentSchema.editableConfig.panelItem['name'][第几个表单项].type
   componentData.editableConfig.panelItem['name'].xxx属性
2. 把组件属性schema和data糅合进 panelList 里面，然后一起遍历
   问题在于当被选中物料组件变化时候又需要重新糅合一遍
 */
import { panelList } from "@/components/attributePanel/config";
import type {
  IEditableConfigPanelItemSchema,
  IEditableConfigValue,
  IEditableInstancedLibraryComponentData,
  IEditableInstancedLibraryComponentDataAtFocus,
} from "@/components/editPanel/types";
import { useCodeStore } from "@/stores/code";
import { storeToRefs } from "pinia";
import { ref, watch, shallowRef, type Ref, unref, toRefs } from "vue";
import { libraryRecord } from "@/library";
import type { ILibraryComponent } from "@/library/types";
import { EEditableConfigItemInputType } from "@/components/editPanel/types";
import { EAttributePanels } from "@/components/attributePanel/types";
import { ElInput } from "element-plus";

const componentData = ref<IEditableInstancedLibraryComponentData>();
const componentSchema = shallowRef<ILibraryComponent>();

const codeStore = useCodeStore();
const { focusData, jsonCode } = storeToRefs(codeStore);

function getPanelEditableConfigByEnumPanel(
  component:
    | ILibraryComponent
    | IEditableInstancedLibraryComponentData
    | Ref<ILibraryComponent | IEditableInstancedLibraryComponentData>,
  panel: EAttributePanels
) {
  const _component = unref(component);
  if (!_component.editableConfig) return undefined;
  return _component.editableConfig[panel];
}

function getEditableConfigDataValue<T = any>(
  component:
    | IEditableInstancedLibraryComponentData
    | Ref<IEditableInstancedLibraryComponentData>,
  panel: EAttributePanels,
  formItemName: string
): Ref<T> {
  const editableConfig = getPanelEditableConfigByEnumPanel(component, panel);
  if (!editableConfig)
    throw new Error(`not found editableConfig of panel: ${panel}`);
  const _editableConfig = toRefs(editableConfig);
  return _editableConfig[formItemName];
}

function formItemChildRender(
  component:
    | IEditableInstancedLibraryComponentData
    | Ref<IEditableInstancedLibraryComponentData>,
  panel: EAttributePanels,
  formItemSchema: IEditableConfigPanelItemSchema
) {
  const _component = unref(component);
  const configValue = getEditableConfigDataValue(
    _component,
    panel,
    formItemSchema.name
  );
  console.log(`configValue`, configValue);
  if (formItemSchema.type === EEditableConfigItemInputType.input) {
    return (
      <>
        <ElInput v-model={configValue.value}></ElInput>
      </>
    );
  }
  return undefined;
}

/**
 * 获取当前选中组件的数据和定义
 * @param focusData
 */
function getLibraryComponentInstanceDataAndSchemaByFocusData(
  focusData: IEditableInstancedLibraryComponentDataAtFocus
): [IEditableInstancedLibraryComponentData, ILibraryComponent] {
  let focusedLibraryComponentData = undefined;
  for (const jsonCodeElement of jsonCode.value) {
    if (jsonCodeElement.uuid && jsonCodeElement.uuid === focusData.uuid) {
      // console.log(`jsonCodeElement`, jsonCodeElement, jsonCode);
      focusedLibraryComponentData = jsonCodeElement;
      break;
    }
  }
  if (!focusedLibraryComponentData)
    throw new Error(
      `not found focusedLibraryComponentData(uuid): ${focusData.uuid}`
    );
  let focusedLibraryComponentSchema = undefined;
  for (const e of libraryRecord[focusedLibraryComponentData.libraryName]) {
    if (e.name == focusedLibraryComponentData.componentName) {
      focusedLibraryComponentSchema = e;
      break;
    }
  }
  if (!focusedLibraryComponentSchema)
    throw new Error(
      `not found focusedLibraryComponentSchema(name): ${focusedLibraryComponentData.componentName}`
    );
  return [focusedLibraryComponentData, focusedLibraryComponentSchema];
}
watch(focusData, () => {
  if (!focusData.value) return false;
  const [focusedLibraryComponentData, focusedLibraryComponentSchema] =
    getLibraryComponentInstanceDataAndSchemaByFocusData(focusData.value);
  componentData.value = unref(focusedLibraryComponentData);
  componentSchema.value = unref(focusedLibraryComponentSchema);
});
</script>
