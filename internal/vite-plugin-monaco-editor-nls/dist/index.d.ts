import type { Plugin } from 'vite';
import type { Plugin as EsbuildPlugin } from 'esbuild';
export declare enum Languages {
    bg = "bg",
    cs = "cs",
    de = "de",
    en_gb = "en-gb",
    es = "es",
    fr = "fr",
    hu = "hu",
    id = "id",
    it = "it",
    ja = "ja",
    ko = "ko",
    nl = "nl",
    pl = "pl",
    ps = "ps",
    pt_br = "pt-br",
    ru = "ru",
    tr = "tr",
    uk = "uk",
    zh_hans = "zh-hans",
    zh_hant = "zh-hant"
}
export interface Options {
    locale: Languages;
    localeData?: Record<string, any>;
}
/**
 * 在vite中dev模式下会使用esbuild对node_modules进行预编译，导致找不到映射表中的filepath，
 * 需要在预编译之前进行替换
 * @param options 替换语言包
 * @returns
 */
export declare function esbuildPluginMonacoEditorNls(options?: Options): EsbuildPlugin;
/**
 * 使用了monaco-editor-nls的语言映射包，把原始localize(data, message)的方法，替换成了localize(path, data, defaultMessage)
 * vite build 模式下，使用rollup处理
 * @param options 替换语言包
 * @returns
 */
export default function (options?: Options): Plugin;
