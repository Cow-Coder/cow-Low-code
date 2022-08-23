import { ElButton, ElCard, ElCheckbox, ElForm, ElFormItem, ElInput, ElTooltip } from 'element-plus'
import { Popover } from '@arco-design/web-vue'
import { Setting } from '@element-plus/icons-vue'
import $style from './index.module.scss'
import type { PropType } from 'vue'
import $popoverStyle from '@/assets/style/popover.module.scss'
export default defineComponent({
  name: 'CssPropertyInput',
  props: {
    modelValue: {
      required: true,
      type: Object,
    },
  },
  emits: ['update:modelValue'],

  setup(props, { emit }) {
    const cssArray = useVModel(props, 'modelValue', emit)
    const inputValue = computed(() => {
      const tempCss = []
      for (const item1 in cssArray.value) {
        tempCss.push(cssArray.value[item1][0])
      }
      console.log(tempCss)
      return tempCss
    })
    return () => (
      <>
        <ElInput v-model={inputValue.value}>
          {{
            append: () => (
              <Popover trigger={'click'} position={'br'}>
                {{
                  default: () => (
                    <ElButton>
                      {{
                        icon: () => <Setting />,
                      }}
                    </ElButton>
                  ),
                  content: () => <div></div>,
                }}
              </Popover>
            ),
          }}
        </ElInput>
      </>
    )
  },
})
