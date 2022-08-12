import { type CascaderProps, ElCascader, ElForm, ElFormItem } from 'element-plus'
import type { ComponentPublicInstance, Ref } from 'vue'
import type { LibraryComponent, LibraryComponentInstanceData } from '@/types/library-component'
import {
  defineActionHandler,
  getActionHandleDefaultProps,
} from '@/views/home/components/action-config-dialog/util'

type Props = {
  chooseComponent: Ref<ComponentPublicInstance>
}

type ProxyLibraryComponentInstanceData = LibraryComponentInstanceData & {
  /**
   * 组件中文名，对应LibraryComponent.libraryPanelShowDetail.title
   */
  label: string
}

export default defineActionHandler<Props>({
  name: 'HideComponent',
  order: 10,
  label: '隐藏组件',
  description: '隐藏所选组件',
  parseTip(config) {
    return `隐藏xxx组件`
  },
  handler(config) {
    console.log(11)
  },
  configPanel: markRaw(
    defineComponent({
      name: 'HideComponentConfigPanel',
      props: {
        ...getActionHandleDefaultProps<Props>(),
      },
      setup(props, { expose }) {
        const formResult = ref({
          componentUUID: '',
        })
        console.log(`props.libraryComponentSchemaRecord`, props.libraryComponentSchemaMap)
        function proxyGet(target: Record<any, any>, property: any): any {
          if (target[property]) return new Proxy(target[property], { get: proxyGet })
          else if (target[property] !== 'object') return target[property]
          else if (property === 'label')
            return props.libraryComponentSchemaMap![
              (target as LibraryComponent).libraryPanelShowDetail.title
            ]
          else return undefined
        }
        const options = new Proxy(props.libraryComponentInstanceTree!, {
          get: proxyGet,
        }) as ProxyLibraryComponentInstanceData[]
        const render = () => (
          <>
            <ElForm model={formResult}>
              <ElFormItem label="选择组件">
                <ElCascader
                  v-model={formResult.value.componentUUID}
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
          return ''
        }
        expose({
          exportConfig,
        })
        return render
      },
    })
  ),
})
