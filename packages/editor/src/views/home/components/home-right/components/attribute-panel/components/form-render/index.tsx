import { ElForm } from 'element-plus'
import type {
  LibraryComponentInstanceProps,
  LibraryComponentProps,
} from '@/types/library-component'
import type { AttributePanelFormItemSchema, AttributePanelsEnum } from '@/types/panel'
import FormItemList from '@/views/home/components/home-right/components/attribute-panel/components/form-render/components/form-item-list'

/**
 *渲染表单
 * @param propsSchema
 * @param propsData
 * @param cursorPanel
 * @param withElFormWrapper 返回是否包裹 ElForm
 */
export default function formRender(
  propsData: LibraryComponentInstanceProps,
  cursorPanel: AttributePanelsEnum,
  propsSchema: LibraryComponentProps | undefined,
  withElFormWrapper = true
) {
  if (!propsSchema) return undefined

  const $style = useCssModule()

  const cursorPropsArray = Object.entries(propsSchema)
    .filter((e) => e[1].belongToPanel === cursorPanel)
    .reduce((previousValue, currentValue) => {
      previousValue.push({
        ...currentValue[1],
        name: currentValue[0],
      })
      return previousValue
    }, [] as AttributePanelFormItemSchema[])

  if (withElFormWrapper)
    return (
      <>
        <ElForm class={$style.attitudePanelInner} model={propsData}>
          {FormItemList(propsData, cursorPropsArray)}
        </ElForm>
      </>
    )
  else return <>{FormItemList(propsData, cursorPropsArray)}</>
}
