<template>
  <!--  TODO: van开头的组件不会自动识别 -->
  <van-button :type="buttonType" :size="buttonSize" :url="url" @click="showTips(isShowTips)">{{
    title
  }}</van-button>
</template>
<script lang="ts"></script>
<script lang="tsx">
import { Button, Dialog } from 'vant'
import { ElIcon, ElInput } from 'element-plus'
import { ELibraryName } from '@/components/libraryPanel/types'
import { EAttributePanels } from '@/components/attributePanel/types'
import { createLibraryComponentPropItem, defineLibraryComponent } from '@/utils/library'
import { EEditableConfigItemInputType } from '@/components/editPanel/types'

export default {
  ...defineLibraryComponent({
    name: 'LibButton',
    libraryName: ELibraryName.generics,
    tabName: 'show',
    order: 1,
    libraryPanelShowDetail: {
      title: '按钮',
      icon: () => (
        <>
          <ElIcon size={16}>
            <i-ep-aim />
          </ElIcon>
        </>
      ),
    },
    tips: {
      title: '按钮',
      desc: '用来展示一个按钮，你可以配置不同的展示样式，配置不同的点击行为。',
      preview: () => (
        <>
          <Button>按钮jsx</Button>
          <Button type="primary">按钮jsx</Button>
          <Button type="success" plain>
            按钮jsx
          </Button>
        </>
      ),
    },
  }),
  props: {
    title: createLibraryComponentPropItem({
      title: '按钮名称',
      default: '按钮',
      formType: EEditableConfigItemInputType.input,
      belongToPanel: EAttributePanels.generic,
    }),
    buttonType: createLibraryComponentPropItem({
      title: '按钮类型',
      default: 'defalut',
      selectOptions: ['defalut', 'primary', 'success', 'info', 'warning', 'danger'],
      formType: EEditableConfigItemInputType.select,
      belongToPanel: EAttributePanels.generic,
      type: String,
    }),
    buttonSize: createLibraryComponentPropItem({
      title: '按钮大小',
      default: 'normal',
      selectOptions: ['large', 'normal', 'small', 'mimi'],
      formType: EEditableConfigItemInputType.select,
      belongToPanel: EAttributePanels.generic,
      type: String,
    }),
    to: createLibraryComponentPropItem({
      title: '路由导航',
      default: '',
      formType: EEditableConfigItemInputType.input,
      belongToPanel: EAttributePanels.generic,
      type: String,
    }),
    url: createLibraryComponentPropItem({
      title: 'url跳转',
      default: '',
      formType: EEditableConfigItemInputType.input,
      belongToPanel: EAttributePanels.generic,
      type: String,
    }),
    isShowTips: createLibraryComponentPropItem({
      title: '提示弹框',
      default: false,
      formType: EEditableConfigItemInputType.switchWithSlots,
      belongToPanel: EAttributePanels.generic,
      type: String,
    }),
  },
}
</script>

<style lang="scss" scoped></style>
