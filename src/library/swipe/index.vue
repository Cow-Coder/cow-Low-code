<template>
  <van-swipe :autoplay="3000" class="my-swipe" indicator-color="white">
    <van-swipe-item>1</van-swipe-item>
    <van-swipe-item>2</van-swipe-item>
    <van-swipe-item>3</van-swipe-item>
    <van-swipe-item>4</van-swipe-item>
  </van-swipe>
</template>

<script lang="tsx">
import { ElIcon } from 'element-plus'
import { ELibraryName } from '@/components/libraryPanel/types'
import { createLibraryComponentPropItem, defineLibraryComponent } from '@/utils/library'
import { EAttributePanels } from '@/components/attributePanel/types'
import { EEditableConfigItemInputType } from '@/components/editPanel/types'
import { preview } from '@/library/swipe/preview'

export default {
  ...defineLibraryComponent({
    name: 'LibSwipe',
    libraryName: ELibraryName.generics,
    tabName: 'show',
    order: 3,
    libraryPanelShowDetail: {
      title: '轮播图',
      icon: () => (
        <>
          <ElIcon size={16}>
            <i-ep-copy-document />
          </ElIcon>
        </>
      ),
    },
    tips: {
      title: '图片展示',
      desc: '可以用来展示一张图片，支持静态设置图片地址',
      preview,
    },
  }),
  props: {
    url: createLibraryComponentPropItem({
      title: '图片链接列表',
      formType: EEditableConfigItemInputType.input,
      belongToPanel: EAttributePanels.generic,
    }),
  },
}
</script>

<style lang="scss" scoped>
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: $color-success;
}
</style>
