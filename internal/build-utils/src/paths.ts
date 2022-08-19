import { resolve } from 'path'

export const projRoot = resolve(__dirname, '..', '..', '..')
export const pkgRoot = resolve(projRoot, 'packages')
export const editorRoot = resolve(pkgRoot, 'editor')
export const buildRoot = resolve(projRoot, 'internal', 'build')

/** `/dist` */
export const buildOutput = resolve(projRoot, 'dist')
/** `/dist/editor` */
export const editorOutput = resolve(buildOutput, 'editor')
/** `/dist/preview` */
export const previewOutput = resolve(buildOutput, 'preview')
