// 语言
// json
import 'monaco-editor/esm/vs/language/json/monaco.contribution'
import JsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
// js
import 'monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution'
// ts
import 'monaco-editor/esm/vs/basic-languages/typescript/typescript.contribution'
import 'monaco-editor/esm/vs/language/typescript/monaco.contribution'
import TSWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'
// css
import 'monaco-editor/esm/vs/basic-languages/css/css.contribution'
import 'monaco-editor/esm/vs/language/css/monaco.contribution'
import CssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
// html
import 'monaco-editor/esm/vs/basic-languages/html/html.contribution'
import 'monaco-editor/esm/vs/language/html/monaco.contribution'
import HtmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'

export { JsonWorker, TSWorker, CssWorker, HtmlWorker }
