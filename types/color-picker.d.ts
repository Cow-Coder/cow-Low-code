/* eslint-disable @typescript-eslint/ban-types */
export {}

declare global {
  const colorPicker: import('vue').DefineComponent<
    {
      hex: {
        type: StringConstructor[]
      }
      modelValue: {
        type: StringConstructor
      }
      rgba: {
        type: StringConstructor
      }
      defaultColor: {
        type: StringConstructor
        default: string
      }
      btnStyle: {
        type: ObjectConstructor[]
      }
      opacity: {
        type: (StringConstructor | NumberConstructor)[]
        default(): number
      }
      showOpacity: {
        type: BooleanConstructor
        default(): boolean
      }
      standardColor: {
        type: ArrayConstructor
        default(): string[]
      }
      themeColor: {
        type: ArrayConstructor
        default(): string[]
      }
    },
    () => void,
    unknown,
    {},
    {},
    import('vue').ComponentOptionsMixin,
    import('vue').ComponentOptionsMixin,
    {
      input: (value: string) => void
    } & {
      change: (value: { hex: string; rgba: string }) => void
    } & {
      finish: (value: { hex: string; rgba: string }) => void
    } & {
      'update:hex': (hex: string) => void
    } & {
      'update:rgba': (rgba: string) => void
    } & {
      close: (value: { hex: string; rgba: string }) => void
    } & {
      'update:modelValue': (value: string) => void
    },
    string,
    import('vue').VNodeProps &
      import('vue').AllowedComponentProps &
      import('vue').ComponentCustomProps,
    Readonly<
      import('vue').ExtractPropTypes<{
        hex: {
          type: StringConstructor[]
        }
        modelValue: {
          type: StringConstructor
        }
        rgba: {
          type: StringConstructor
        }
        defaultColor: {
          type: StringConstructor
          default: string
        }
        btnStyle: {
          type: ObjectConstructor[]
        }
        opacity: {
          type: (StringConstructor | NumberConstructor)[]
          default(): number
        }
        showOpacity: {
          type: BooleanConstructor
          default(): boolean
        }
        standardColor: {
          type: ArrayConstructor
          default(): string[]
        }
        themeColor: {
          type: ArrayConstructor
          default(): string[]
        }
      }>
    > & {
      onChange?: (value: { hex: string; rgba: string }) => any
      onInput?: (value: string) => any
      onFinish?: (value: { hex: string; rgba: string }) => any
      onClose?: (value: { hex: string; rgba: string }) => any
      'onUpdate:hex'?: (hex: string) => any
      'onUpdate:rgba'?: (rgba: string) => any
      'onUpdate:modelValue'?: (value: string) => any
    },
    {
      opacity: string | number
      defaultColor: string
      showOpacity: boolean
      standardColor: unknown[]
      themeColor: unknown[]
    }
  >
}
