<template>
  <div class="layout">
    <div class="phone">
      <div class="content">
        <div v-for="instance in libraryTree" :key="instance.uuid" class="library-component">
          <component :is="parseLibraryComponent(instance)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="tsx" setup>
import { libraryMap } from '@cow-low-code/library'
import { dispatchEventBatch } from '@cow-low-code/utils'
import type { LibraryComponentInstanceData } from '@cow-low-code/types'
import { useCodeStore } from '@/stores/code'

defineOptions({
  name: 'HomeView',
})

const codeStore = useCodeStore()
const { libraryTree } = storeToRefs(codeStore)

function parseLibraryComponent(data: LibraryComponentInstanceData) {
  const component = libraryMap[data.componentName]
  if (!component) throw new Error(`library component: ${data.libraryName} not found`)
  return (
    <component
      onDispatchEvent={(eventTriggerName: string) =>
        dispatchEventBatch(data, eventTriggerName, codeStore.libraryTree)
      }
      {...data.props}
    ></component>
  )
}

useEventListener(
  'dragstart',
  (e: DragEvent) => {
    if (!e.target) return undefined
    const target = e.target as HTMLElement
    const tagName = target.tagName.toLowerCase()
    if (tagName === 'img' || tagName === 'a') e.preventDefault()
  },
  { capture: true }
)
</script>

<style lang="scss" scoped>
.layout {
  --phone-mockup-width-height-ratio: 0.49315;
  @apply w-screen h-screen flex flex-col items-center;

  .phone {
    @apply flex-grow flex-col flex bg-center bg-no-repeat bg-contain;
    background-image: url('@/assets/images/phone.png');
    //padding: 48px 13px 25px;
    padding: 55px 14px 47px;
    margin: 50px 0;
    width: calc(calc(100vh - 50px * 2) * var(--phone-mockup-width-height-ratio));
    .content {
      @apply flex-grow flex-col flex overflow-y-auto overflow-x-hidden;
      //background-color: #9dddff;
    }
  }
}
</style>
