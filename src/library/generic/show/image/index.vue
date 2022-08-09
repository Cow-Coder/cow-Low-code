<template>
  <van-image height="100" :src="url" width="100" />
</template>

<script lang="tsx">
import { Image as VanImage } from 'vant'
import { ElIcon } from 'element-plus'
import {
  AttributePanelFormItemInputTypeEnum,
  AttributePanelsEnum,
  LibraryPanelTabEnum,
} from '@/types/panel'
import { createLibraryComponentPropItem, defineLibraryComponent } from '@/utils/library'

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
  }),
  props: {
    url: createLibraryComponentPropItem({
      title: 'url链接',
      formType: AttributePanelFormItemInputTypeEnum.input,
      belongToPanel: AttributePanelsEnum.generic,
    }),
  },
}
</script>

<style scoped></style>
