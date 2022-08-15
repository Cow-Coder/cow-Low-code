import MonacoEditorNlsPlugin, {
  Languages,
  esbuildPluginMonacoEditorNls,
} from 'vite-plugin-monaco-editor-nls'

export default {
  vitePlugin: () => {
    return MonacoEditorNlsPlugin({ locale: Languages.zh_hans })
  },
  esbuildPlugin: () => {
    return esbuildPluginMonacoEditorNls({
      locale: Languages.zh_hans,
    })
  },
}
