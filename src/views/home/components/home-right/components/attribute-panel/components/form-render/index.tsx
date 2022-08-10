import { ElForm, ElFormItem, ElInput, ElOption, ElSelect, ElSlider, ElSwitch } from 'element-plus'
import { SwitchWithSlots } from './components/SwitchWithSlots'
import IndefiniteNumberInputBox from './components/IndefiniteNumberInputBox'
import type {
  LibraryComponentInstanceProps,
  LibraryComponentProps,
  SelectOption,
} from '@/types/library-component'
import type { AttributePanelFormItemSchema, AttributePanelsEnum } from '@/types/panel'
import type { CSSProperties } from 'vue'
import { LibraryComponentFormItemLabelPositionEnum } from '@/types/library-component'
import { AttributePanelFormItemInputTypeEnum } from '@/types/panel'

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
export default function formRender(
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
        <>
          <ElSelect v-model={propsData[formItemSchema.name]}>
            {formItemSchema.selectOptions?.map((item: SelectOption) => (
              <ElOption label={item.title} value={item.value} />
            ))}
          </ElSelect>
        </>
      )
    }
    //switchWithSlots
    if (formItemSchema.formType === AttributePanelFormItemInputTypeEnum.switchWithSlots) {
      return <SwitchWithSlots v-model={propsData[formItemSchema.name]}></SwitchWithSlots>
    }
    //slider
    if (formItemSchema.formType === AttributePanelFormItemInputTypeEnum.slider) {
      return <ElSlider v-model={propsData[formItemSchema.name]}></ElSlider>
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
