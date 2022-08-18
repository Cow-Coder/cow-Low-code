<template>
  <van-image :height="height" :width="width" :src="url" :fit="fit" :radius="radius" />
</template>

<script lang="tsx">
import { Image as VanImage } from 'vant'
import { ElIcon } from 'element-plus'
import {
  createLibraryComponentPropItem,
  defineLibraryComponent,
} from '@cow-code-low-code/library/src/utils/library'
import {
  AttributePanelFormItemInputTypeEnum,
  AttributePanelsEnum,
  LibraryPanelTabEnum,
} from '@cow-code-low-code/types'

export default {
  ...defineLibraryComponent({
    name: 'WidgetImage',
    libraryName: LibraryPanelTabEnum.generics,
    tabName: 'show',
    order: 2,
    libraryPanelShowDetail: {
      title: '图片展示',
      icon: () => (
        <>
          <ElIcon size={16}>
            <i-ep-aim />
          </ElIcon>
        </>
      ),
    },
    tips: {
      title: '图片展示',
      desc: '可以用来展示一张图片，支持静态设置图片地址',
      preview: () => (
        <>
          <VanImage width="100" height="100"></VanImage>
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
    url: createLibraryComponentPropItem({
      title: 'url链接:',
      formType: AttributePanelFormItemInputTypeEnum.input,
      belongToPanel: AttributePanelsEnum.generic,
      default: 'https://github.com/Cow-Coder/cow-Low-code/raw/main/src/assets/images/logo.svg',
    }),
    height: createLibraryComponentPropItem({
      title: '高度(px):',
      default: '100',
      formType: AttributePanelFormItemInputTypeEnum.input,
      belongToPanel: AttributePanelsEnum.generic,
    }),
    width: createLibraryComponentPropItem({
      title: '宽度(px):',
      default: '100',
      formType: AttributePanelFormItemInputTypeEnum.input,
      belongToPanel: AttributePanelsEnum.generic,
    }),
    radius: createLibraryComponentPropItem({
      title: '圆角大小(px):',
      default: 0,
      formType: AttributePanelFormItemInputTypeEnum.slider,
      belongToPanel: AttributePanelsEnum.generic,
    }),
    fit: createLibraryComponentPropItem({
      title: '图片填充模式:',
      selectOptions: [
        { title: 'contain', value: 'contain' },
        { title: 'cover', value: 'cover' },
        { title: 'fill', value: 'fill' },
        { title: 'none', value: 'none' },
        { title: 'scale-down', value: 'scale-down' },
      ],
      formType: AttributePanelFormItemInputTypeEnum.select,
      belongToPanel: AttributePanelsEnum.generic,
      default: 'contain',
    }),
  },
}
</script>

<style scoped></style>
