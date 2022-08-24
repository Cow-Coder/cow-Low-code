<template>
  <div class="textbox" :class="widgetCssArr">
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
import { computed, defineComponent } from 'vue'
import { ElIcon, ElInput } from 'element-plus'
import { useVModel } from '@vueuse/core'
import {
  createLibraryComponentPropItem,
  defineLibraryComponent,
} from '@cow-low-code/library/src/utils/library'
import {
  AttributePanelFormItemInputTypeEnum,
  AttributePanelsEnum,
  LibraryPanelTabEnum,
} from '@cow-low-code/types'
import { Notes } from '@icon-park/vue-next'

export default defineComponent({
  ...defineLibraryComponent({
    name: 'WidgetTextbox',
    libraryName: LibraryPanelTabEnum.generics,
    tabName: 'form',
    order: 4,
    libraryPanelShowDetail: {
      title: '文本框',
      icon: () => <Notes theme="outline" size="16" strokeWidth={3} />,
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
    widgetCss: createLibraryComponentPropItem({
      title: '控件样式',
      default: {},
      formType: AttributePanelFormItemInputTypeEnum.cssPropertyInput,
      belongToPanel: AttributePanelsEnum.appearance,
    }),
  },
  emits: ['update:widgetCss'],
  setup(props, { emit }) {
    const defaultValue = useVModel(props, 'value', emit)
    const compCss = useVModel(props, 'widgetCss', emit, { passive: true })
    const widgetCssArr = computed(() => {
      const tempCss = []
      for (const item1 in compCss.value) {
        tempCss.push(compCss.value[item1]?.[0])
      }
      return tempCss
    })

    return { defaultValue, widgetCssArr }
  },
})
</script>

<style lang="scss" scoped></style>
