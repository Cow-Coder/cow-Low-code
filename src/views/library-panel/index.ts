import type { ILibraryPanel } from '@/views/library-panel/types'

const libraryPanelsObj = import.meta.glob<ILibraryPanel>('./components/*/index.(vue|jsx)', {
  eager: true,
})
const libraryPanels: Record<string, ILibraryPanel> = {}

// 添加每一个lib下面的组件
Object.entries(libraryPanelsObj).forEach(([, module]) => {
  module = module?.default || module
  if (module.libraryName) {
    libraryPanels[module.libraryName] = module
  }
})

export default libraryPanels
