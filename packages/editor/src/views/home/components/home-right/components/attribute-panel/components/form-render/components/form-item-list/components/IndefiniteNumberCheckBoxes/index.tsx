import { ElButton, ElCheckbox, ElForm, ElFormItem, ElInput } from 'element-plus'
import { Popover } from '@arco-design/web-vue'
import Draggable from 'vuedraggable'
import { CloseBold, MoreFilled, Rank } from '@element-plus/icons-vue'
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
    const addItem = () =>
      checkList.value.push({ name: '', value: '', checked: false, isEdit: false })
    const changeCallback = (index: number) => {
      checkList.value[index].checked = !checkList.value[index].checked
    }
    const editChangeCallback = (el: any) => {
      el.isEdit = !el.isEdit
    }
    const propObj = {
      handle: '.handle',
      animation: 200,
    }
    return () => (
      <>
        <Draggable
          list={checkList.value}
          itemKey={''}
          {...propObj}
          class={$style.indefiniteNumberCheckBoxes__dragableDiv}
        >
          {{
            item: ({ element, index }: any) => (
              <div>
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
                      content: () => {
                        return !element.isEdit ? (
                          <div class="flex flex-col">
                            <ElButton
                              class="z-10"
                              text
                              onClick={() => {
                                editChangeCallback(element)
                              }}
                            >
                              ??????
                            </ElButton>

                            <ElButton
                              class="z-10"
                              text
                              onClick={() => {
                                deleteItem(index)
                              }}
                            >
                              ??????
                            </ElButton>
                          </div>
                        ) : (
                          ''
                        )
                      },
                    }}
                  </Popover>
                </div>
                {element.isEdit && (
                  <div class={[$style.indefiniteNumberCheckBoxes__editBox, 'rounded-md']}>
                    <div>
                      <ElForm labelPosition="right" label-width="80px">
                        <ElFormItem label="????????????">
                          <ElInput v-model={element.name} v-focus></ElInput>
                        </ElFormItem>
                        <ElFormItem label="??????">
                          <ElInput v-model={element.value}></ElInput>
                        </ElFormItem>
                      </ElForm>
                    </div>
                    <div>
                      <ElButton
                        plain
                        size="small"
                        icon={CloseBold}
                        circle
                        onClick={() => {
                          editChangeCallback(element)
                        }}
                      />
                    </div>
                  </div>
                )}
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
            ????????????
          </ElButton>
          <ElButton plain>????????????</ElButton>
        </div>
      </>
    )
  },
})
