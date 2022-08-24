<template>
  <div :class="widgetCssArr">
    <van-swipe
      ref="swipeRef"
      :autoplay="autoplay"
      :duration="duration"
      :initial-swipe="initialSwipe"
      :loop="loop"
      :show-indicators="showIndicators"
      :lazy-render="lazyRender"
    >
      <component :is="renderItemInner" />
    </van-swipe>
  </div>
</template>

<script lang="tsx">
import { computed, defineComponent, onMounted, ref } from 'vue'
import { Image as VanImage, SwipeItem as VantSwipeItem } from 'vant'
import {
  AttributePanelFormItemInputTypeEnum,
  AttributePanelsEnum,
  LibraryComponentFormItemLabelPositionEnum,
  LibraryPanelTabEnum,
} from '@cow-low-code/types'
import {
  createLibraryComponentPropItem,
  defineLibraryComponent,
} from '@cow-low-code/library/src/utils/library'
import { Carousel } from '@icon-park/vue-next'
import { useVModel } from '@vueuse/core'
import preview from './components/preview.vue'
import type { Swipe } from 'vant'

export default defineComponent({
  ...defineLibraryComponent({
    name: 'WidgetSwipe',
    widgetType: 'generics',
    libraryName: LibraryPanelTabEnum.generics,
    tabName: 'show',
    order: 3,
    libraryPanelShowDetail: {
      title: '轮播图',
      icon: () => <Carousel theme="outline" size="16" fill="#333" strokeWidth={3} />,
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
      formType: AttributePanelFormItemInputTypeEnum.indefiniteNumberInputBox,
      belongToPanel: AttributePanelsEnum.generic,
      type: Array,
      default: [
        'https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg',
        'https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg',
        'https://fastly.jsdelivr.net/npm/@vant/assets/apple-3.jpeg',
        'https://fastly.jsdelivr.net/npm/@vant/assets/apple-4.jpeg',
        'https://fastly.jsdelivr.net/npm/@vant/assets/apple-5.jpeg',
      ],
      labelPosition: LibraryComponentFormItemLabelPositionEnum.top,
    }),
    initialSwipe: createLibraryComponentPropItem({
      title: '初始位置索引值',
      formType: AttributePanelFormItemInputTypeEnum.input,
      belongToPanel: AttributePanelsEnum.generic,
      default: '0',
      type: [String, Number],
    }),
    autoplay: createLibraryComponentPropItem({
      title: '自动轮播间隔',
      formType: AttributePanelFormItemInputTypeEnum.input,
      belongToPanel: AttributePanelsEnum.generic,
      default: '3000',
      type: [String, Number],
    }),
    duration: createLibraryComponentPropItem({
      title: '动画时长',
      formType: AttributePanelFormItemInputTypeEnum.input,
      belongToPanel: AttributePanelsEnum.generic,
      default: '500',
      type: [String, Number],
    }),
    loop: createLibraryComponentPropItem({
      title: '循环播放',
      formType: AttributePanelFormItemInputTypeEnum.switch,
      belongToPanel: AttributePanelsEnum.generic,
      default: true,
      type: Boolean,
    }),
    showIndicators: createLibraryComponentPropItem({
      title: '显示指示器',
      formType: AttributePanelFormItemInputTypeEnum.switch,
      belongToPanel: AttributePanelsEnum.generic,
      default: true,
      type: Boolean,
    }),
    picWidth: createLibraryComponentPropItem({
      title: '图片宽度',
      formType: AttributePanelFormItemInputTypeEnum.input,
      belongToPanel: AttributePanelsEnum.generic,
      default: '100%',
      type: [String, Number],
    }),
    picHeight: createLibraryComponentPropItem({
      title: '图片高度',
      formType: AttributePanelFormItemInputTypeEnum.input,
      belongToPanel: AttributePanelsEnum.generic,
      default: '240',
      type: [String, Number],
    }),
    lazyRender: createLibraryComponentPropItem({
      title: '延迟渲染未展示的轮播',
      formType: AttributePanelFormItemInputTypeEnum.switch,
      belongToPanel: AttributePanelsEnum.generic,
      default: false,
      type: Boolean,
    }),
    widgetCss: createLibraryComponentPropItem({
      title: '控件样式',
      default: {},
      formType: AttributePanelFormItemInputTypeEnum.cssPropertyInput,
      belongToPanel: AttributePanelsEnum.appearance,
    }),
  },
  emits: ['update:widgetCss'],
  setup(props, { expose, emit }) {
    const swipeRef = ref<InstanceType<typeof Swipe>>()
    expose({
      swipeRef,
    })
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
    const isMounted = ref(false)
    onMounted(() => {
      isMounted.value = true
    })
    /**
     * 这个没办法只能这么子写，因为VantSwipeItem里面用的这种奇葩操作。导致这里动态渲染会出现一个奇葩的bug
     */
    const renderItemInner = () => {
      if (!isMounted.value) return <div></div>
      return props.urlList.map((url: string) => (
        <VantSwipeItem key={url}>
          {{
            default: () => renderItem(url),
          }}
        </VantSwipeItem>
      ))
    }
    const compCss = useVModel(props, 'widgetCss', emit, { passive: true })
    //初始化css数组
    const widgetCssArr = computed(() => {
      const tempCss = []
      for (const item1 in compCss.value) {
        tempCss.push(compCss.value[item1]?.[0])
      }
      return tempCss
    })

    return {
      swipeRef,
      renderItemInner,
      widgetCssArr,
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
