import type { ILibraryPanel } from '@/components/libraryPanel/types'

const libraryPanelsObj = import.meta.glob<ILibraryPanel>('./*/index.(vue|jsx)', {
  eager: true,
})
const libraryPanels: Record<string, ILibraryPanel> = {}

// 添加每一个lib下面的组件
Object.entries(libraryPanelsObj).forEach(([, module]) => {
  module = module?.default || module
  libraryPanels[module.libraryName] = module
})

export default libraryPanels
