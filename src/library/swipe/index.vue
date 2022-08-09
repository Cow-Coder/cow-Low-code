<template>
  <van-swipe
    :autoplay="autoplay"
    :duration="duration"
    :initial-swipe="initialSwipe"
    :loop="loop"
    :show-indicators="showIndicators"
    :lazy-render="lazyRender"
  >
    <van-swipe-item v-for="(url, index) in urlList" :key="index">
      <component :is="renderItem(url)" />
    </van-swipe-item>
  </van-swipe>
</template>

<script lang="tsx">
import { ElIcon } from 'element-plus'
import { Image as VanImage } from 'vant'
import { ELibraryName } from '@/views/library-panel/types'
import { createLibraryComponentPropItem, defineLibraryComponent } from '@/utils/library'
import { EAttributePanels } from '@/views/attribute-panel/types'
import { EEditableConfigItemInputType } from '@/views/edit-panel/types'
import preview from '@/library/swipe/components/preview.vue'
import { ELibraryComponentFormItemLabelPosition } from '@/library/types'

export default defineComponent({
  ...defineLibraryComponent({
    name: 'LibSwipe',
    libraryName: ELibraryName.generics,
    tabName: 'form',
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
    urlList: createLibraryComponentPropItem({
      title: '图片链接列表',
      formType: EEditableConfigItemInputType.indefiniteNumberInputBox,
      belongToPanel: EAttributePanels.generic,
      type: Array,
      default: [
        'https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg',
        'https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg',
        'https://fastly.jsdelivr.net/npm/@vant/assets/apple-3.jpeg',
        'https://fastly.jsdelivr.net/npm/@vant/assets/apple-4.jpeg',
        'https://fastly.jsdelivr.net/npm/@vant/assets/apple-5.jpeg',
      ],
      labelPosition: ELibraryComponentFormItemLabelPosition.top,
    }),
    initialSwipe: createLibraryComponentPropItem({
      title: '初始位置索引值',
      formType: EEditableConfigItemInputType.input,
      belongToPanel: EAttributePanels.generic,
      default: '0',
      type: [String, Number],
    }),
    autoplay: createLibraryComponentPropItem({
      title: '自动轮播间隔',
      formType: EEditableConfigItemInputType.input,
      belongToPanel: EAttributePanels.generic,
      default: '3000',
      type: [String, Number],
    }),
    duration: createLibraryComponentPropItem({
      title: '动画时长',
      formType: EEditableConfigItemInputType.input,
      belongToPanel: EAttributePanels.generic,
      default: '500',
      type: [String, Number],
    }),
    loop: createLibraryComponentPropItem({
      title: '循环播放',
      formType: EEditableConfigItemInputType.switch,
      belongToPanel: EAttributePanels.generic,
      default: true,
      type: Boolean,
    }),
    showIndicators: createLibraryComponentPropItem({
      title: '显示指示器',
      formType: EEditableConfigItemInputType.switch,
      belongToPanel: EAttributePanels.generic,
      default: true,
      type: Boolean,
    }),
    picWidth: createLibraryComponentPropItem({
      title: '图片宽度',
      formType: EEditableConfigItemInputType.input,
      belongToPanel: EAttributePanels.generic,
      default: '100%',
      type: [String, Number],
    }),
    picHeight: createLibraryComponentPropItem({
      title: '图片高度',
      formType: EEditableConfigItemInputType.input,
      belongToPanel: EAttributePanels.generic,
      default: '240',
      type: [String, Number],
    }),
    lazyRender: createLibraryComponentPropItem({
      title: '延迟渲染未展示的轮播',
      formType: EEditableConfigItemInputType.switch,
      belongToPanel: EAttributePanels.generic,
      default: false,
      type: Boolean,
    }),
  },
  setup(props) {
    function renderItem(maybeLink: string) {
      const isLink = maybeLink.indexOf('http') === 0
      if (isLink) {
        return (
          <VanImage
            src={maybeLink}
            fit="cover"
            width={props.picWidth}
            height={props.picHeight}
            style={{ display: 'block' }}
          ></VanImage>
        )
      }
      return <>{maybeLink}</>
    }
    return {
      renderItem,
    }
  },
})
</script>

<style lang="scss" scoped>
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
}
.my-swipe .van-swipe-item:nth-child(odd) {
  background-color: #66c6f2;
}
.my-swipe .van-swipe-item:nth-child(even) {
  background-color: #39a9ed;
}
</style>
