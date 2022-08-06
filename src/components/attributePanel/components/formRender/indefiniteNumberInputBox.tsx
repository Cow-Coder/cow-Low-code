import { ElButton, ElInput } from 'element-plus'
import { Popover } from '@arco-design/web-vue'
import { toRefs } from '@vueuse/core'
import { MoreFilled } from '@element-plus/icons-vue'
import $style from './form.module.scss'
import type { PropType } from 'vue'

export const IndefiniteNumberInputBox = defineComponent({
  name: 'IndefiniteNumberInputBox',
  props: {
    modelValue: {
      required: true,
      type: Array as PropType<string[]>,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const list = useVModel(props, 'modelValue', emit)
    const currentPopoverShowIndex = ref(-1)
    const popoverShow = computed(() => {
      return (index: number) => index === currentPopoverShowIndex.value
    })
    function addInput() {
      list.value.push('')
    }
    function deleteInput(index: number) {
      return () => {
        list.value.splice(index, 1)
        currentPopoverShowIndex.value = -1
      }
    }
    return () => (
      <>
        {list.value.map((val, index) => (
          <div
            class={[$style.indefiniteNumberInput__inputGroup, $style.indefiniteNumberInput__gap]}
          >
            <ElInput
              class={$style.indefiniteNumberInput__inputGroup__input}
              v-model={list.value[index]}
            ></ElInput>
            <Popover
              trigger="click"
              position="br"
              contentClass={$style.indefiniteNumberInput__popover}
              popupVisible={popoverShow.value(index)}
              onUpdate:popupVisible={(e) =>
                e ? (currentPopoverShowIndex.value = index) : (currentPopoverShowIndex.value = -1)
              }
            >
              {{
                default: () => (
                  <ElButton plain style={{ padding: '8px' }}>
                    {{
                      icon: () => <MoreFilled />,
                    }}
                  </ElButton>
                ),
                content: () => (
                  <div class="flex flex-col">
                    <ElButton class="z-10" text>
                      编辑
                    </ElButton>
                    <ElButton class="z-10" text onClick={deleteInput(index)}>
                      删除
                    </ElButton>
                  </div>
                ),
              }}
            </Popover>
          </div>
        ))}
        <div class={[$style.indefiniteNumberInput__buttonGroup, $style.indefiniteNumberInput__gap]}>
          <ElButton plain onClick={addInput}>
            添加选项
          </ElButton>
          <ElButton plain>批量增加</ElButton>
        </div>
      </>
    )
  },
})