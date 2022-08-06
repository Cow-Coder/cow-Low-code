<template>
  <el-tabs type="border-card">
    <el-tab-pane v-for="panelItem in panelList" :key="panelItem.name" :label="panelItem.title">
      <component
        :is="formRender(componentDataProps, panelItem.name, componentSchemaProps)"
        v-if="componentSchemaProps"
      />
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
import { ElForm, ElFormItem, ElInput } from 'element-plus'
import { IndefiniteNumberInputBox } from './components/formRender/indefiniteNumberInputBox'
import type {
  IAttributePanelFormItemSchema,
  ILibraryComponentInstanceData,
  ILibraryComponentInstanceProps,
} from '@/components/editPanel/types'
import type { ILibraryComponent, ILibraryComponentProps } from '@/library/types'
import type { EAttributePanels } from '@/components/attributePanel/types'
import type { CSSProperties, WritableComputedRef } from 'vue'
import { EEditableConfigItemInputType } from '@/components/editPanel/types'
import { panelList } from '@/components/attributePanel/config'
import { useCodeStore } from '@/stores/code'
import { ELibraryComponentFormItemLabelPosition } from '@/library/types'

const codeStore = useCodeStore()
const { focusData } = storeToRefs(codeStore)

const componentData = ref<ILibraryComponentInstanceData>()
const componentSchema = shallowRef<ILibraryComponent>()
watch(focusData, () => {
  if (!focusData.value) {
    componentSchema.value = undefined
    return false
  }
  const focus = focusData.value
  /**
   * TODO: 临时解决一下选中组件不跟手的问题，大概300ms延迟
   */
  setTimeout(() => {
    const [focusedLibraryComponentInstanceData, focusedLibraryComponentSchema] =
      codeStore.getLibraryComponentInstanceDataAndSchema(focus)
    componentData.value = focusedLibraryComponentInstanceData
    componentSchema.value = focusedLibraryComponentSchema
  }, 0)
})

const componentDataProps: WritableComputedRef<ILibraryComponentInstanceProps | undefined> =
  computed({
    get() {
      if (!componentData.value) return undefined
      return componentData.value.props
    },
    set(val) {
      if (!componentData.value) return undefined
      componentData.value.props = val
    },
  })
const componentSchemaProps: WritableComputedRef<ILibraryComponentProps | undefined> = computed({
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
  propsSchema: ILibraryComponentProps,
  panel: EAttributePanels
) {
  const propsFilterArr = Object.entries(propsSchema).filter((e) => e[1].belongToPanel === panel)
  return Object.fromEntries(propsFilterArr)
}

function getLibraryComponentPropsArrayInAPanel(
  propsSchema: ILibraryComponentProps,
  panel: EAttributePanels
) {
  return Object.entries(getLibraryComponentPropsRecordInAPanel(propsSchema, panel)).reduce(
    (previousValue, currentValue) => {
      previousValue.push({
        ...currentValue[1],
        name: currentValue[0],
      })
      return previousValue
    },
    [] as IAttributePanelFormItemSchema[]
  )
}

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
  if (!propsSchema) return undefined
  const cursorPropsArray = getLibraryComponentPropsArrayInAPanel(propsSchema, cursorPanel)
  // const propsDataRefs = toRefs(propsData);

  const formItemChildRender = (
    propsData: ILibraryComponentInstanceProps,
    formItemSchema: IAttributePanelFormItemSchema
  ) => {
    const $style = useCssModule('form')
    // console.log(`configValue`, propsData);
    if (formItemSchema.formType === EEditableConfigItemInputType.input) {
      return <ElInput v-model={propsData[formItemSchema.name]}></ElInput>
    }
    if (formItemSchema.formType === EEditableConfigItemInputType.indefiniteNumberInputBox) {
      const list = propsData[formItemSchema.name]
      if (!Array.isArray(list))
        throw new TypeError('invalid Data at EEditableConfigItemInputType.indefiniteNumberInputBox')
      return (
        <IndefiniteNumberInputBox
          modelValue={list}
          onUpdate:modelValue={(e: string[]) => {
            if (!Array.isArray(list))
              throw new TypeError(
                'invalid Data at EEditableConfigItemInputType.indefiniteNumberInputBox'
              )
            list.splice(0, list.length, ...e)
          }}
        />
      )
    }
    return undefined
  }

  const formItemList = cursorPropsArray.map((propItem) => {
    const style = {} as CSSProperties
    if (propItem.labelPosition === ELibraryComponentFormItemLabelPosition.top) {
      style['display'] = 'block'
    }
    return (
      <ElFormItem label={propItem.title} key={propItem.name} style={style}>
        {formItemChildRender(propsData, propItem)}
      </ElFormItem>
    )
  })
  return <ElForm model={propsData}>{formItemList}</ElForm>
}
</script>

<script lang="tsx">
export default {
  name: 'AttributePanel',
}
</script>

<style lang="scss" module="form">
.indefiniteNumberInput {
  &__popover {
    @apply p-0;
    :global(.arco-popover-content) {
      @apply mt-0;
      width: 100px;
      :global(.el-button + .el-button) {
        @apply ml-0;
      }
    }
  }
  &__inputGroup {
    @apply flex content-between w-full;
    &__input {
      margin-right: 12px;
    }
  }

  &__buttonGroup {
    @apply flex content-around w-full;
  }

  &__gap {
    margin-top: 10px;

    &:first-child {
      @apply mt-0;
    }
  }
}
</style>
