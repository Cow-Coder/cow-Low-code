import { ElFormItem, ElInput, ElOption, ElSelect, ElSlider, ElSwitch } from 'element-plus'
import type { CSSProperties } from 'vue'
import type { LibraryComponentInstanceProps, SelectOption } from '@/types/library-component'
import type { AttributePanelFormItemSchema } from '@/types/panel'
import { AttributePanelFormItemInputTypeEnum } from '@/types/panel'
import IndefiniteNumberInputBox from '@/views/home/components/home-right/components/attribute-panel/components/form-render/components/form-item-list/components/IndefiniteNumberInputBox'
import Stepper from '@/views/home/components/home-right/components/attribute-panel/components/form-render/components/form-item-list/components/Stepper'
import { SwitchWithSlots } from '@/views/home/components/home-right/components/attribute-panel/components/form-render/components/form-item-list/components/SwitchWithSlots'
import { LibraryComponentFormItemLabelPositionEnum } from '@/types/library-component'

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
  //colorPicker
  if (formItemSchema.formType === AttributePanelFormItemInputTypeEnum.colorPicker) {
    return <colorPicker class="flex-1" v-model:hex={propsData[formItemSchema.name]}></colorPicker>
  }
  //stepper
  if (formItemSchema.formType === AttributePanelFormItemInputTypeEnum.stepper) {
    return <Stepper v-model={propsData[formItemSchema.name]}></Stepper>
  }
  return undefined
}

export default (
  propsData: LibraryComponentInstanceProps,
  cursorPropsArray: AttributePanelFormItemSchema[]
) => {
  return cursorPropsArray.map((propItem) => {
    const style = {} as CSSProperties
    if (propItem.labelPosition === LibraryComponentFormItemLabelPositionEnum.top) {
      style['display'] = 'block'
    }
    if (!propItem.isNotShowRight) {
      return (
        <ElFormItem label={propItem.title} key={propItem.name} style={style}>
          {formItemChildRender(propsData, propItem)}
        </ElFormItem>
      )
    } else {
      return undefined
    }
  })
}
