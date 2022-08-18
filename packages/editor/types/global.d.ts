type ValueOf<T> = T[keyof T]
type Data = Record<string, unknown>

declare module 'colorpicker-v3' {
  declare const _default: {
    install: (app: App) => void
  }
  export default _default
}
