import { type CheckboxValueType, ElButton, ElCheckbox, ElInput } from 'element-plus'
import { Popover } from '@arco-design/web-vue'
import Draggable from 'vuedraggable'
import { MoreFilled, Rank } from '@element-plus/icons-vue'
import $style from './index.module.scss'
import type { PropType } from 'vue'
import $popoverStyle from '@/assets/style/popover.module.scss'
export default defineComponent({
  name: 'IndefiniteNumberCheckBoxes',
  props: {
    modelValue: {
      required: true,
      type: Array as PropType<any[]>,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const checkList = useVModel(props, 'modelValue', emit)
    const deleteItem = (index: number) => checkList.value.splice(index, 1)
    const addItem = () => checkList.value.push({ value: '', checked: false })
    const changeCallback = (index: number) => {
      checkList.value[index].checked = !checkList.value[index].checked
      console.log('change')
    }

    const test = () => {
      console.log(checkList.value)
    }
    return () => (
      <>
        <Draggable list={checkList.value} itemKey={''} handle=".handle" onEnd={test}>
          {{
            item: ({ element, index }: any) => (
              <div
                class={[
                  $style.indefiniteNumberCheckBoxes__inputGroup,
                  $style.indefiniteNumberCheckBoxes__gap,
                  $style.indefiniteNumberCheckBoxes__checkBoxes,
                ]}
              >
                <span class={['handle', $style.indefiniteNumberCheckBoxes__handle]}>
                  <Rank />
                </span>
                <ElCheckbox
                  modelValue={element.checked}
                  onChange={() => {
                    changeCallback(index)
                  }}
                ></ElCheckbox>
                <ElInput
                  v-model={element.name}
                  class={$style.indefiniteNumberCheckBoxes__inputGroup__input}
                ></ElInput>
                <Popover
                  trigger="click"
                  position="br"
                  contentClass={$popoverStyle.popoverWithOutTitle}
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
                        <ElButton
                          class="z-10"
                          text
                          onClick={() => {
                            deleteItem(index)
                          }}
                        >
                          删除
                        </ElButton>
                      </div>
                    ),
                  }}
                </Popover>
              </div>
            ),
          }}
        </Draggable>
        <div
          class={[
            $style.indefiniteNumberCheckBoxes__buttonGroup,
            $style.indefiniteNumberCheckBoxes__gap,
          ]}
        >
          <ElButton plain onClick={addItem}>
            添加选项
          </ElButton>
          <ElButton plain>批量增加</ElButton>
        </div>
      </>
    )
  },
})
