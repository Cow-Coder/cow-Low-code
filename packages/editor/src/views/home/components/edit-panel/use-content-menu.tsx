import { $$dropdown, DropdownOption } from '@cow-low-code/utils'
import type { LibraryComponentInstanceData } from '@cow-low-code/types'
import { useCodeStore } from '@/stores/code'

export default function useContentMenu() {
  const codeStore = useCodeStore()
  const { focusData } = storeToRefs(codeStore)
  // 右键菜单
  const onContextMenu = (e: MouseEvent, data: LibraryComponentInstanceData) => {
    $$dropdown({
      reference: e,
      content: () => (
        <>
          <DropdownOption
            label="删除节点"
            icon="el-icon-delete"
            {...{
              onClick: () => {
                codeStore.dispatchDelete(data.uuid)
                // 删除节点后，取消选中
                focusData.value = undefined
                ElMessage.success('节点删除成功')
              },
            }}
          />
        </>
      ),
    })
  }
  return {
    onContextMenu,
  }
}
