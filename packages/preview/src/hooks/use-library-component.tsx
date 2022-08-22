import { libraryMap } from '@cow-low-code/library'
import { dispatchEventBatch } from '@cow-low-code/utils'
import type { ComponentPublicInstance } from 'vue'
import type { LibraryComponentInstanceData } from '@cow-low-code/types'
import { useCodeStore } from '@/stores/code'

export default function useLibraryComponent() {
  const codeStore = useCodeStore()
  const componentRefMap = codeStore.componentRefMap
  return {
    parseLibraryComponent: (data: LibraryComponentInstanceData) => {
      const component = libraryMap[data.componentName]
      if (!component) throw new Error(`library component: ${data.libraryName} not found`)

      function bindComponentRef(el: ComponentPublicInstance | null) {
        if (!el && componentRefMap.has(data.uuid)) componentRefMap.delete(data.uuid)
        else componentRefMap.set(data.uuid, el!)
      }
      return (
        <component
          ref={bindComponentRef}
          onDispatchEvent={(eventTriggerName: string) =>
            dispatchEventBatch(data, eventTriggerName, codeStore.libraryTree, componentRefMap)
          }
          {...data.props}
        ></component>
      )
    },
  }
}
