<template>
  <monaco-editor
    ref="codeContainerRef"
    v-model="modelValue"
    class="code-container"
    :monaco-options="monacoOptions"
  />
</template>

<script lang="ts" setup>
import stringify from 'json-stringify-pretty-compact'
import type * as Monaco from 'monaco-editor'
import MonacoEditor from '@/components/monaco-editor/index.vue'
import { useCodeStore } from '@/stores/code'

defineOptions({
  name: 'CodeTab',
})

const codeStore = useCodeStore()
const { jsonCode } = storeToRefs(codeStore)
const modelValue = computed({
  get: () => stringify(jsonCode.value, { maxLength: 50 }),
  set: (val) => {
    try {
      const json = JSON.parse(val)
      jsonCode.value = val !== '' ? json : []
    } catch (e) {
      console.error('JSON解析错误', e)
      ElMessage.error('JSON解析错误')
    }
  },
})
const codeContainerRef = ref<InstanceType<typeof MonacoEditor>>()
const monacoOptions = {
  language: 'json',
  lineNumbers: 'off', //关闭显示行号
  folding: false, //关闭折叠
} as Monaco.editor.IStandaloneEditorConstructionOptions
</script>

<style scoped></style>
