<template>
  <el-tabs type="border-card">
    <el-tab-pane
      v-for="panelItem in panelList"
      :key="panelItem.name"
      :label="panelItem.title"
    >
      <component
        v-if="componentSchemaProps"
        :is="
          formRender(componentDataProps, panelItem.name, componentSchemaProps)
        "
      ></component>
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
   componentSchema.props.panelItem['name'][第几个表单项].type
   componentData.props.panelItem['name'].xxx属性
2. 把组件属性schema和data糅合进 panelList 里面，然后一起遍历
   问题在于当被选中物料组件变化时候又需要重新糅合一遍
 */
import { panelList } from "@/components/attributePanel/config";
import type {
  IAttributePanelFormItemSchema,
  ILibraryComponentInstanceData,
  ILibraryComponentInstanceFocus,
  ILibraryComponentInstanceProps,
} from "@/components/editPanel/types";
import { useCodeStore } from "@/stores/code";
import { storeToRefs } from "pinia";
import { ref, watch, shallowRef, type Ref, unref, toRefs, toRef } from "vue";
import { libraryRecord } from "@/library";
import type {
  ILibraryComponent,
  ILibraryComponentProps,
} from "@/library/types";
import { EEditableConfigItemInputType } from "@/components/editPanel/types";
import { EAttributePanels } from "@/components/attributePanel/types";
import { ElInput } from "element-plus";

const codeStore = useCodeStore();
const { focusData, jsonCode } = storeToRefs(codeStore);
const componentData = ref<ILibraryComponentInstanceData>();
const componentDataProps = ref<ILibraryComponentInstanceProps>();
const componentSchema = shallowRef<ILibraryComponent>();
const componentSchemaProps = shallowRef<ILibraryComponentProps>();
watch(focusData, () => {
  if (!focusData.value) return false;
  const [focusedLibraryComponentInstanceData, focusedLibraryComponentSchema] =
    codeStore.getLibraryComponentInstanceDataAndSchema(focusData.value);
  componentData.value = focusedLibraryComponentInstanceData;
  componentSchema.value = focusedLibraryComponentSchema;
  componentDataProps.value = focusedLibraryComponentInstanceData.props;
  componentSchemaProps.value = focusedLibraryComponentSchema.props;
});

function getLibraryComponentPropsRecordInAPanel(
  propsSchema: ILibraryComponentProps,
  panel: EAttributePanels
) {
  const propsFilterArr = Object.entries(propsSchema).filter(
    (e) => e[1].belongToPanel === panel
  );
  return Object.fromEntries(propsFilterArr);
}

function getLibraryComponentPropsArrayInAPanel(
  propsSchema: ILibraryComponentProps,
  panel: EAttributePanels
) {
  return Object.entries(
    getLibraryComponentPropsRecordInAPanel(propsSchema, panel)
  ).reduce((previousValue, currentValue) => {
    previousValue.push({
      ...currentValue[1],
      name: currentValue[0],
    });
    return previousValue;
  }, [] as IAttributePanelFormItemSchema[]);
}

import { ElForm, ElFormItem } from "element-plus";

/**
 * 渲染表单
 * @param propsSchema
 * @param propsData
 * @param cursorPanel
 */
function formRender(
  propsData: ILibraryComponentInstanceProps,
  cursorPanel: EAttributePanels,
  propsSchema: ILibraryComponentProps
) {
  if (!propsSchema) return undefined;
  const cursorPropsArray = getLibraryComponentPropsArrayInAPanel(
    propsSchema,
    cursorPanel
  );
  const propsDataRefs = toRefs(propsData);

  const formItemChildRender = (
    propsData: Ref,
    formItemSchema: IAttributePanelFormItemSchema
  ) => {
    console.log(`configValue`, propsData);
    if (formItemSchema.formType === EEditableConfigItemInputType.input) {
      return (
        <>
          <ElInput v-model={propsData.value}></ElInput>
        </>
      );
    }
    return undefined;
  };

  const formItemList = cursorPropsArray.map((propItem) => {
    return (
      <ElFormItem label={propItem.title} key={propItem.name}>
        {formItemChildRender(propsDataRefs[propItem.name], propItem)}
      </ElFormItem>
    );
  });
  return <ElForm model={propsData}>{formItemList}</ElForm>;
}
</script>
