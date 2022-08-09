<template>
  <el-tabs type="border-card" class="attitude-tab-pane">
    <el-tab-pane v-for="panelItem in panelList" :key="panelItem.name" :label="panelItem.title">
      <keep-alive>
        <component
          :is="panelItem.component"
          v-if="panelItem.component"
          v-model:component-instance-data="componentData"
          :component-schema="componentSchema"
          :cursor-panel="panelItem.name"
        />
        <component
          :is="formRender(componentDataProps, panelItem.name, componentSchemaProps)"
          v-else
        />
      </keep-alive>
    </el-tab-pane>
  </el-tabs>
</template>

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
import { ref } from 'vue'
import { ElForm, ElFormItem, ElInput, ElOption, ElSelect, ElSwitch } from 'element-plus'
import { IndefiniteNumberInputBox } from './components/components/IndefiniteNumberInputBox'
import { SwitchWithSlots } from './components/components/SwitchWithSlots'
import type { CSSProperties, WritableComputedRef } from 'vue'
import type {
  LibraryComponent,
  LibraryComponentInstanceData,
  LibraryComponentInstanceProps,
  LibraryComponentProps,
} from '@/types/library-component'
import type { AttributePanelFormItemSchema, AttributePanelsEnum } from '@/types/panel'
import { AttributePanelFormItemInputTypeEnum } from '@/types/panel'
import { LibraryComponentFormItemLabelPositionEnum } from '@/types/library-component'
import { panelList } from '@/views/attribute-panel/config'
import { useCodeStore } from '@/stores/code'

defineOptions({
  name: 'AttributePanel',
})

const codeStore = useCodeStore()
const { focusData } = storeToRefs(codeStore)

const componentData = ref<LibraryComponentInstanceData>()
const componentSchema = shallowRef<LibraryComponent>()
watch(focusData, () => {
  if (!focusData.value) {
    componentSchema.value = undefined
    componentData.value = undefined
    return false
  }
  const focus = focusData.value
  /**
   * 开启vue devtool会出现 选中组件不跟手的问题，大概300ms延迟
   */
  setTimeout(() => {
    const [focusedLibraryComponentInstanceData, focusedLibraryComponentSchema] =
      codeStore.getLibraryComponentInstanceDataAndSchema(focus)
    componentData.value = focusedLibraryComponentInstanceData
    componentSchema.value = focusedLibraryComponentSchema
  }, 0)
})

const componentDataProps: WritableComputedRef<LibraryComponentInstanceProps | undefined> = computed(
  {
    get() {
      if (!componentData.value) return undefined
      return componentData.value.props
    },
    set(val) {
      if (!componentData.value) return undefined
      componentData.value.props = val
    },
  }
)
const componentSchemaProps: WritableComputedRef<LibraryComponentProps | undefined> = computed({
  get() {
    if (!componentSchema.value) return undefined
    return componentSchema.value.props
  },
  set(val) {
    if (!componentSchema.value) return undefined
    componentSchema.value.props = val
  },
})

function getLibraryComponentPropsRecordInAPanel(
  propsSchema: LibraryComponentProps,
  panel: AttributePanelsEnum
) {
  const propsFilterArr = Object.entries(propsSchema).filter((e) => e[1].belongToPanel === panel)
  return Object.fromEntries(propsFilterArr)
}

function getLibraryComponentPropsArrayInAPanel(
  propsSchema: LibraryComponentProps,
  panel: AttributePanelsEnum
) {
  return Object.entries(getLibraryComponentPropsRecordInAPanel(propsSchema, panel)).reduce(
    (previousValue, currentValue) => {
      previousValue.push({
        ...currentValue[1],
        name: currentValue[0],
      })
      return previousValue
    },
    [] as AttributePanelFormItemSchema[]
  )
}

/**
 *渲染表单
 * @param propsSchema
 * @param propsData
 * @param cursorPanel
 */
function formRender(
  propsData: LibraryComponentInstanceProps,
  cursorPanel: AttributePanelsEnum,
  propsSchema: LibraryComponentProps | undefined
) {
  if (!propsSchema) return undefined
  const $style = useCssModule()
  const cursorPropsArray = getLibraryComponentPropsArrayInAPanel(propsSchema, cursorPanel)
  // const propsDataRefs = toRefs(propsData);
  const formItemChildRender = (
    //根据prop名称渲染组件
    propsData: LibraryComponentInstanceProps,
    formItemSchema: AttributePanelFormItemSchema
  ) => {
    //input
    if (formItemSchema.formType === AttributePanelFormItemInputTypeEnum.input) {
      return <ElInput v-model={propsData[formItemSchema.name]}></ElInput>
    }
    //indefiniteNumberInputBox
    if (formItemSchema.formType === AttributePanelFormItemInputTypeEnum.indefiniteNumberInputBox) {
      const list = propsData[formItemSchema.name]
      if (!Array.isArray(list))
        throw new TypeError(
          'invalid Data at AttributePanelFormItemInputTypeEnum.indefiniteNumberInputBox'
        )
      return (
        <IndefiniteNumberInputBox
          modelValue={list}
          onUpdate:modelValue={(e: string[]) => {
            if (!Array.isArray(list))
              throw new TypeError(
                'invalid Data at AttributePanelFormItemInputTypeEnum.indefiniteNumberInputBox'
              )
            list.splice(0, list.length, ...e)
          }}
        />
      )
    }
    //switch
    if (formItemSchema.formType === AttributePanelFormItemInputTypeEnum.switch) {
      return (
        <>
          <ElSwitch v-model={propsData[formItemSchema.name]}></ElSwitch>
        </>
      )
    }
    //select
    if (formItemSchema.formType === AttributePanelFormItemInputTypeEnum.select) {
      return (
        <ElSelect v-model={propsData[formItemSchema.name]}>
          {formItemSchema.selectOptions?.map((item: string) => (
            <ElOption label={item} value={item}></ElOption>
          ))}
        </ElSelect>
      )
    }
    //
    if (formItemSchema.formType === AttributePanelFormItemInputTypeEnum.switchWithSlots) {
      return <SwitchWithSlots v-model={propsData[formItemSchema.name]}></SwitchWithSlots>
    }

    return undefined
  }
  //渲染整个props列表
  const formItemList = cursorPropsArray.map((propItem) => {
    const style = {} as CSSProperties
    if (propItem.labelPosition === LibraryComponentFormItemLabelPositionEnum.top) {
      style['display'] = 'block'
    }
    return (
      <ElFormItem label={propItem.title} key={propItem.name} style={style}>
        {formItemChildRender(propsData, propItem)}
      </ElFormItem>
    )
  })
  return (
    <ElForm class={$style.attitudePanelInner} model={propsData}>
      {formItemList}
    </ElForm>
  )
}
</script>

<style lang="scss" scoped>
.attitude-tab-pane {
  @apply flex;
  :deep(.el-tabs__content) {
    @apply p-0 flex flex-grow;
    .el-tab-pane {
      @apply flex-grow;
    }
    .el-form-item__content {
      @apply justify-end;
    }
  }
}
</style>

<style lang="scss" module>
.attitudePanelInner {
  padding: 15px;
}
</style>
