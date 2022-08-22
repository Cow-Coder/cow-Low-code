<template>
  <div class="layout" :class="{ 'is-frame': isFrame }">
    <div class="phone" :class="{ preview: isPreview }">
      <div class="content">
        <div v-for="instance in libraryTree" :key="instance.uuid" class="library-component">
          <component :is="parseLibraryComponent(instance)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="tsx" setup>
import {
  GET_LIBRARY_COMPONENT_JSON_TREE,
  SET_LIBRARY_COMPONENT_JSON_TREE,
} from '@cow-low-code/constant/src/message'
import { useRoute } from 'vue-router'
import CryptoJS from 'crypto-js/core'
import 'crypto-js/enc-base64'
import type { MessageData } from '@cow-low-code/types/src/message'
import { useCodeStore } from '@/stores/code'
import useLibraryComponent from '@/hooks/use-library-component'
import usePreventDrag from '@/hooks/use-prevent-drag'
defineOptions({
  name: 'HomeView',
})

const codeStore = useCodeStore()
const { libraryTree, __APP_PREVIEW__, pageSetting } = storeToRefs(codeStore)
const { parseLibraryComponent } = useLibraryComponent()
usePreventDrag()

const isFrame = computed(() => top !== self)
const isPreview = computed(() => {
  if (pageSetting.value?.isPreview !== undefined) return pageSetting.value?.isPreview
  return __APP_PREVIEW__
})

if (__APP_PREVIEW__) {
  // 在editor中预览页面
  useEventListener('message', (e: MessageEvent<MessageData>) => {
    if (!e.source || e.source === self) return undefined
    const dataSource = e.data as MessageData
    if (!dataSource.msg) return undefined
    switch (dataSource.msg) {
      case GET_LIBRARY_COMPONENT_JSON_TREE:
        window.parent.postMessage(
          {
            msg: SET_LIBRARY_COMPONENT_JSON_TREE,
            data: JSON.stringify(toRaw(libraryTree.value)),
          } as MessageData,
          '*'
        )
        break

      case SET_LIBRARY_COMPONENT_JSON_TREE:
        libraryTree.value = JSON.parse(dataSource.data)
        window.parent.postMessage({ msg: 'ok' } as MessageData, '*')
        break
    }
  })
  // 传递hash直接预览真实页面
  try {
    const { hash } = useRoute()
    const json = CryptoJS.enc.Base64.parse(hash.slice(1)).toString(CryptoJS.enc.Utf8)
    codeStore.dispatchPageJson(JSON.parse(json))
  } catch (e) {
    console.error('解码失败', e)
  }
}
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
    @apply flex-grow flex-col flex w-full;
    &.preview {
      @apply bg-center bg-no-repeat bg-contain;
      background-image: url('@/assets/images/phone.png');
      padding: 55px 14px 47px;
      margin: var(--phone-mockup-margin) 0;
      width: calc(
        calc(100vh - var(--phone-mockup-margin) * 2) * var(--phone-mockup-width-height-ratio)
      );
    }

    .content {
      @apply flex-grow flex-col flex overflow-y-auto overflow-x-hidden w-full;
      //background-color: #9dddff;
    }
  }
}
</style>
