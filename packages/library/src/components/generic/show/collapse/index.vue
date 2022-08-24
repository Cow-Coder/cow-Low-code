<template>
  <div class="collapse" :class="widgetCssArr">
    <van-collapse v-model="activeNames">
      <van-collapse-item :title="title" name="1">
        {{ content }}
      </van-collapse-item>
    </van-collapse>
  </div>
</template>

<script lang="tsx">
import { defineComponent, ref, watch } from 'vue'
import { ElIcon } from 'element-plus'
import { useVModel } from '@vueuse/core'
import {
  AttributePanelFormItemInputTypeEnum,
  AttributePanelsEnum,
  LibraryPanelTabEnum,
} from '@cow-low-code/types'
import {
  createLibraryComponentPropItem,
  defineLibraryComponent,
} from '@cow-low-code/library/src/utils/library'
import Preview from './components/preview.vue'

export default defineComponent({
  ...defineLibraryComponent({
    name: 'WidgetCollapse',
    libraryName: LibraryPanelTabEnum.generics,
    tabName: 'show',
    order: 5,
    libraryPanelShowDetail: {
      title: '折叠面板',
      icon: () => (
        <>
          <ElIcon size={16}>
            <i-ep-Fold />
          </ElIcon>
        </>
      ),
    },
    tips: {
      title: '折叠面板',
      desc: '将一组内容放置在多个折叠面板中，点击面板的标题可以展开或收缩其内容。',
      preview: Preview,
    },
  }),
  props: {
    defaultFold: createLibraryComponentPropItem({
      title: '是否默认展开',
      belongToPanel: AttributePanelsEnum.generic,
      formType: AttributePanelFormItemInputTypeEnum.switch,
      type: Boolean,
      default: true,
    }),
    title: createLibraryComponentPropItem({
      title: '标题',
      belongToPanel: AttributePanelsEnum.generic,
      formType: AttributePanelFormItemInputTypeEnum.input,
      type: [String, Number],
      default: '标题',
    }),
    content: createLibraryComponentPropItem({
      title: '默认内容',
      belongToPanel: AttributePanelsEnum.generic,
      formType: AttributePanelFormItemInputTypeEnum.input,
      type: String,
      default: 'Display constant！',
    }),
    widgetCss: createLibraryComponentPropItem({
      title: '控件样式',
      default: {},
      formType: AttributePanelFormItemInputTypeEnum.cssPropertyInput,
      belongToPanel: AttributePanelsEnum.appearance,
    }),
  },
  setup(props, { emit }) {
    const activeNames = ref<string[]>(['1'])
    watch(useVModel(props, 'defaultFold', emit), (newValue) => {
      activeNames.value = newValue ? ['1'] : []
    })
    const compCss = computed({
      get() {
        return props.widgetCss
      },
      set(newV) {
        props.widgetCss = newV
      },
    })
    //初始化css数组
    const widgetCssArr = computed(() => {
      const tempCss = []
      for (const item1 in compCss.value) {
        tempCss.push(compCss.value[item1]?.[0])
      }
      return tempCss
    })
    return { activeNames, widgetCssArr }
  },
})
</script>

<style lang="scss" scoped></style>
