<template>
  <van-notice-bar
    :text="text"
    :color="color"
    :scrollable="scrollable"
    :wrapable="wrapable"
    :mode="mode"
    :background="background"
    :speed="speed"
    :left-icon="leftIcon"
  />
</template>

<script lang="tsx">
import { Image as VanImage } from 'vant'
import { ElIcon } from 'element-plus'
import {
  AttributePanelFormItemInputTypeEnum,
  AttributePanelsEnum,
  LibraryPanelTabEnum,
} from '@cow-low-code/types'
import {
  createLibraryComponentPropItem,
  defineLibraryComponent,
} from '@cow-low-code/library/src/utils/library'

export default {
  ...defineLibraryComponent({
    name: 'WidgetNoticeBar',
    libraryName: LibraryPanelTabEnum.generics,
    tabName: 'show',
    order: 6,
    libraryPanelShowDetail: {
      title: '通知栏',
      icon: () => (
        <>
          <ElIcon size={16}>
            <i-ep-minus />
          </ElIcon>
        </>
      ),
    },
    tips: {
      title: '通知栏',
      desc: '用于循环播放展示一组消息通知。',
      preview: () => (
        <>
          <van-notice-bar
            left-icon="volume-o"
            text="在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。"
          />
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
    text: createLibraryComponentPropItem({
      title: '标题',
      belongToPanel: AttributePanelsEnum.generic,
      formType: AttributePanelFormItemInputTypeEnum.input,
      type: [String, Number],
      default: '标题',
    }),
    color: createLibraryComponentPropItem({
      title: '文本颜色',
      belongToPanel: AttributePanelsEnum.generic,
      formType: AttributePanelFormItemInputTypeEnum.colorPicker,
      type: [String, Number],
      default: '#ed6a0c',
    }),
    background: createLibraryComponentPropItem({
      title: '背景颜色',
      belongToPanel: AttributePanelsEnum.generic,
      formType: AttributePanelFormItemInputTypeEnum.colorPicker,
      type: [String, Number],
      default: '#fffbe8',
    }),
    scrollable: createLibraryComponentPropItem({
      title: '是否开启文字滚动',
      belongToPanel: AttributePanelsEnum.generic,
      formType: AttributePanelFormItemInputTypeEnum.switch,
      type: Boolean,
      default: false,
    }),
    speed: createLibraryComponentPropItem({
      title: '文字滚动速率(px/s)',
      belongToPanel: AttributePanelsEnum.generic,
      formType: AttributePanelFormItemInputTypeEnum.input,
      type: Number,
      default: 60,
    }),
    wrapable: createLibraryComponentPropItem({
      title: '是否开启文字换行',
      belongToPanel: AttributePanelsEnum.generic,
      formType: AttributePanelFormItemInputTypeEnum.switch,
      type: Boolean,
      default: false,
    }),
    mode: createLibraryComponentPropItem({
      title: '通知栏模式',
      belongToPanel: AttributePanelsEnum.generic,
      selectOptions: [
        { title: 'closeable', value: 'closeable' },
        { title: 'link', value: 'link' },
        { title: 'none', value: '' },
      ],
      formType: AttributePanelFormItemInputTypeEnum.select,
      default: '',
    }),
    leftIcon: createLibraryComponentPropItem({
      title: '左侧图标',
      belongToPanel: AttributePanelsEnum.generic,
      selectOptions: [
        { title: 'volume-o', value: 'volume-o' },
        { title: 'info-o', value: 'info-o' },
        { title: 'close', value: 'close' },
      ],
      formType: AttributePanelFormItemInputTypeEnum.select,
      type: String,
      default: 'volume-o',
    }),
  },
}
</script>

<style scoped></style>