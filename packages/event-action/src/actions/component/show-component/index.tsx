import { defineComponent, markRaw, ref, toRaw } from 'vue'
import { type CascaderProps, ElCascader, ElForm, ElFormItem } from 'element-plus'
import {
  defineActionHandler,
  getActionHandleDefaultProps,
  mixLibraryComponentInstanceDataWidthLibraryComponentSchemaLabel,
} from '@cow-code-low-code/event-action/src/utils/util'

type Props = {
  componentUUID: string
}

export default defineActionHandler<Props>({
  name: 'ShowComponent',
  order: 9,
  label: '显示组件',
  description: '显示所选组件',
  parseTip(config, libraryComponentInstanceTree, libraryComponentSchemaMap) {
    const componentName = libraryComponentInstanceTree.find(
      (e) => e.uuid === config.componentUUID
    )!.componentName
    const name = libraryComponentSchemaMap[componentName].libraryPanelShowDetail.title
    return () => (
      <>
        显示&nbsp;<span style={{ color: '#2468f2' }}>{name}</span>&nbsp;组件
      </>
    )
  },
  handler(config) {
    // TODO: 待开发
    console.log(11)
  },
  configPanel: markRaw(
    defineComponent({
      name: 'ShowComponentConfigPanel',
      props: {
        ...getActionHandleDefaultProps<Props>(),
      },
      setup(props, { expose }) {
        let initValue = ''
        if (props.actionConfig) initValue = toRaw(props.actionConfig.componentUUID)
        const formResult = {
          componentUUID: initValue,
        }
        const options = mixLibraryComponentInstanceDataWidthLibraryComponentSchemaLabel(
          props.libraryComponentSchemaMap!,
          props.libraryComponentInstanceTree!
        )
        const cascaderValue = ref<string[]>([initValue])
        const render = () => (
          <>
            <ElForm model={formResult}>
              <ElFormItem label="选择组件">
                <ElCascader
                  v-model={cascaderValue.value}
                  options={options as any}
                  clearable={true}
                  props={
                    {
                      value: 'uuid',
                    } as CascaderProps
                  }
                ></ElCascader>
              </ElFormItem>
            </ElForm>
          </>
        )

        function exportConfig() {
          formResult.componentUUID = cascaderValue.value[0]
          return formResult
        }
        /**
         * 如果此action有配置属性则必须要导出名为 `exportConfig` 的函数
         * dialog会调用此函数来获取config的值
         */
        expose({
          exportConfig,
        })
        return render
      },
    })
  ),
})
