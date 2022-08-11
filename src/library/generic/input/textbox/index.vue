<template>
  <div class="textbox">
    <van-cell-group inset>
      <van-field
        v-model="defaultValue"
        :name="name"
        :label="title"
        :type="type"
        :placeholder="placeholder"
      />
    </van-cell-group>
  </div>
</template>

<script lang="tsx">
import { ElIcon, ElInput } from 'element-plus'
import { createLibraryComponentPropItem, defineLibraryComponent } from '@/utils/library'
import {
  AttributePanelFormItemInputTypeEnum,
  AttributePanelsEnum,
  LibraryPanelTabEnum,
} from '@/types/panel'

export default defineComponent({
  ...defineLibraryComponent({
    name: 'WidgetTextbox',
    libraryName: LibraryPanelTabEnum.generics,
    tabName: 'form',
    order: 4,
    libraryPanelShowDetail: {
      title: '文本框',
      icon: () => (
        <>
          <ElIcon size={16}>
            <i-ep-document />
          </ElIcon>
        </>
      ),
    },
    tips: {
      title: '单行文本框',
      desc: '文本输入框，支持普通文本、密码、URL、邮箱等多种内容输入',
      preview: () => (
        <>
          <ElInput
            inputStyle={{
              display: 'flex',
              margin: '0 auto',
              padding: '10px 0',
              width: '160px',
              height: '50px',
            }}
            size="large"
            placeholder="Please input content"
          />
        </>
      ),
    },
  }),
  props: {
    name: createLibraryComponentPropItem({
      title: '字段名',
      belongToPanel: AttributePanelsEnum.generic,
      formType: AttributePanelFormItemInputTypeEnum.input,
      type: String,
      required: true,
      default: 'text',
    }),
    title: createLibraryComponentPropItem({
      title: '标题',
      belongToPanel: AttributePanelsEnum.generic,
      formType: AttributePanelFormItemInputTypeEnum.input,
      type: String,
      default: '文本',
    }),
    type: createLibraryComponentPropItem({
      title: '类型',
      belongToPanel: AttributePanelsEnum.generic,
      formType: AttributePanelFormItemInputTypeEnum.select,
      selectOptions: [
        { title: '文本', value: 'text' },
        { title: '密码', value: 'password' },
        { title: '数字', value: 'number' },
        { title: '手机号', value: 'tel' },
        { title: '整数', value: 'digit' },
      ],
      type: String,
      default: 'text',
    }),
    value: createLibraryComponentPropItem({
      title: '默认值',
      belongToPanel: AttributePanelsEnum.generic,
      formType: AttributePanelFormItemInputTypeEnum.input,
      type: String,
      default: '',
    }),
    placeholder: createLibraryComponentPropItem({
      title: '占位符',
      belongToPanel: AttributePanelsEnum.generic,
      formType: AttributePanelFormItemInputTypeEnum.input,
      type: String,
      default: 'Please input content!',
    }),
  },
  setup(props, { emit }) {
    const defaultValue = useVModel(props, 'value', emit)
    return { defaultValue }
  },
})
</script>

<style lang="scss" scoped></style>
