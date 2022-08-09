<template>
  <div>
    <!--  TODO: van开头的组件不会自动识别 -->
    <van-button :type="buttonType" :size="buttonSize" :url="url" @click="showTips(tips)">{{
      title
    }}</van-button>
  </div>
</template>
<script lang="tsx">
import { ref } from 'vue'
import { Button, Dialog } from 'vant'
import 'vant/es/dialog/style'
import { ElIcon, ElInput } from 'element-plus'
import {
  AttributePanelFormItemInputTypeEnum,
  AttributePanelsEnum,
  LibraryPanelTabEnum,
} from '@/types/panel'
import { createLibraryComponentPropItem, defineLibraryComponent } from '@/utils/library'

export default {
  ...defineLibraryComponent({
    name: 'WidgetButton',
    libraryName: LibraryPanelTabEnum.generics,
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
    eventTriggers: {
      click: {
        title: '点击',
      },
      enter: {
        title: '鼠标移入',
      },
      leave: {
        title: '鼠标移出',
      },
    },
  }),
  props: {
    title: createLibraryComponentPropItem({
      title: '按钮名称',
      default: '按钮',
      formType: AttributePanelFormItemInputTypeEnum.input,
      belongToPanel: AttributePanelsEnum.generic,
    }),
    buttonType: createLibraryComponentPropItem({
      title: '按钮类型',
      default: 'defalut',
      selectOptions: ['defalut', 'primary', 'success', 'info', 'warning', 'danger'],
      formType: AttributePanelFormItemInputTypeEnum.select,
      belongToPanel: AttributePanelsEnum.generic,
      type: String,
    }),
    buttonSize: createLibraryComponentPropItem({
      title: '按钮大小',
      default: 'normal',
      selectOptions: ['large', 'normal', 'small', 'mimi'],
      formType: AttributePanelFormItemInputTypeEnum.select,
      belongToPanel: AttributePanelsEnum.generic,
      type: String,
    }),
    to: createLibraryComponentPropItem({
      title: '路由导航',
      default: '',
      formType: AttributePanelFormItemInputTypeEnum.input,
      belongToPanel: AttributePanelsEnum.generic,
      type: String,
    }),
    url: createLibraryComponentPropItem({
      title: 'url跳转',
      default: '',
      formType: AttributePanelFormItemInputTypeEnum.input,
      belongToPanel: AttributePanelsEnum.generic,
      type: String,
    }),
    tips: createLibraryComponentPropItem({
      title: '提示弹框',
      default: '',
      formType: AttributePanelFormItemInputTypeEnum.switchWithSlots,
      belongToPanel: AttributePanelsEnum.generic,
      type: String,
    }),
  },
  setup() {
    const show = ref(false)

    //提示弹框
    const showTips = (tips: string) => {
      if (tips.length) {
        show.value = true
        Dialog.confirm({ message: tips })
          .then((e) => {
            console.log(e)
          })
          .catch((err) => {
            console.log(err)
          })
      }
    }
    return { showTips, show }
  },
}
</script>

<style lang="scss" scoped />
