<template>
  <div>
    <van-button :type="buttonType" :size="buttonSize" :url="url" @click="onClick">{{
      title
    }}</van-button>
  </div>
</template>
<script lang="tsx">
import { ref } from 'vue'
import { Button, Dialog } from 'vant'
import 'vant/es/dialog/style'
import { ElIcon } from 'element-plus'
import { debounce } from 'lodash-es'
import {
  AttributePanelFormItemInputTypeEnum,
  AttributePanelsEnum,
  LibraryPanelTabEnum,
} from '@/types/panel'
import { createLibraryComponentPropItem, defineLibraryComponent } from '@/utils/library'
import { useMultiClick } from '@/hooks/use-multi-click'

enum EventTriggersEnum {
  click = 'click',
  doubleClick = 'doubleClick',
}

export default defineComponent({
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
      [EventTriggersEnum.click]: {
        title: '点击',
      },
      [EventTriggersEnum.doubleClick]: {
        title: '双击',
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
      default: 'default',
      selectOptions: [
        { title: 'default', value: 'default' },
        { title: 'primary', value: 'primary' },
        { title: 'success', value: 'success' },
        { title: 'info', value: 'info' },
        { title: 'warning', value: 'warning' },
        { title: 'danger', value: 'danger' },
      ],
      formType: AttributePanelFormItemInputTypeEnum.select,
      belongToPanel: AttributePanelsEnum.generic,
      type: String,
    }),
    buttonSize: createLibraryComponentPropItem({
      title: '按钮大小',
      default: 'normal',
      selectOptions: [
        { title: 'large', value: 'large' },
        { title: 'normal', value: 'normal' },
        { title: 'small', value: 'small' },
        { title: 'mimi', value: 'mimi' },
      ],
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
  /**
   * 所有物料组件触发事件都用dispatchEvent
   */
  emits: ['dispatchEvent'],
  setup(props, { emit }) {
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

    function onClick() {
      showTips(props.tips)
      emit('dispatchEvent', EventTriggersEnum.click)
    }
    function onDoubleClick() {
      emit('dispatchEvent', EventTriggersEnum.doubleClick)
    }
    function dispatchClick(count: number) {
      if (count === 1) onClick()
      else if (count === 2) onDoubleClick()
    }
    const onMultiClick = useMultiClick(dispatchClick, 200)
    return { showTips, show, onClick: onMultiClick }
  },
})
</script>

<style lang="scss" scoped />
