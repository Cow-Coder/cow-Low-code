<template>
  <div class="layout" :class="{ 'is-frame': isFrame }">
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
import {
  GET_LIBRARY_COMPONENT_JSON_TREE,
  SET_LIBRARY_COMPONENT_JSON_TREE,
} from '@cow-low-code/constant/src/message'
import type { LibraryComponentInstanceData } from '@cow-low-code/types'
import type { MessageData } from '@cow-low-code/types/src/message'
import { useCodeStore } from '@/stores/code'

defineOptions({
  name: 'HomeView',
})

const codeStore = useCodeStore()
const { libraryTree } = storeToRefs(codeStore)

const isFrame = computed(() => top !== self)

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

useEventListener('message', (e: MessageEvent<MessageData>) => {
  if (!e.source || e.source === self) return undefined
  const dataSource = e.data as MessageData
  if (!dataSource.msg) return undefined
  switch (dataSource.msg) {
    case GET_LIBRARY_COMPONENT_JSON_TREE:
      window.parent.postMessage(
        {
          msg: SET_LIBRARY_COMPONENT_JSON_TREE,
          data: libraryTree.value,
        } as MessageData,
        '*'
      )
      break

    case SET_LIBRARY_COMPONENT_JSON_TREE:
      libraryTree.value = dataSource.data
      window.parent.postMessage({ msg: 'ok' } as MessageData, '*')
      break
  }
})
</script>

<style lang="scss" scoped>
.layout {
  @apply w-screen h-screen flex flex-col items-center;
  --phone-mockup-width-height-ratio: 0.49315;
  --phone-mockup-margin: 50px;
  &.is-frame {
    --phone-mockup-margin: 0px;
  }

  .phone {
    @apply flex-grow flex-col flex bg-center bg-no-repeat bg-contain;
    background-image: url('@/assets/images/phone.png');
    padding: 55px 14px 47px;
    margin: var(--phone-mockup-margin) 0;
    width: calc(
      calc(100vh - var(--phone-mockup-margin) * 2) * var(--phone-mockup-width-height-ratio)
    );
    .content {
      @apply flex-grow flex-col flex overflow-y-auto overflow-x-hidden;
      //background-color: #9dddff;
    }
  }
}
</style>
