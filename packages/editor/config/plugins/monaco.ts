import MonacoEditorNlsPlugin, {
  Languages,
  esbuildPluginMonacoEditorNls,
} from '@cow-low-code/vite-plugin-monaco-editor-nls'

import zh from '@cow-low-code/vscode-language-pack-zh-hans/translations/main.i18n.json'

export default {
  vitePlugin: () => {
    return MonacoEditorNlsPlugin({
      locale: Languages.zh_hans,
      /**
       * The weight of `localedata` is higher than that of `locale`
       */
      localeData: zh.contents,
    })
  },
  esbuildPlugin: () => {
    return esbuildPluginMonacoEditorNls({
      locale: Languages.zh_hans,
      /**
       * The weight of `localedata` is higher than that of `locale`
       */
      localeData: zh.contents,
    })
  },
}
