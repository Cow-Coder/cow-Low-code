/* eslint-disable @typescript-eslint/ban-types */

import type { ComponentOptionsBase, ComponentPublicInstance } from 'vue'
import type {
  AllowedComponentProps,
  ComponentCustomProps,
  ComponentOptionsMixin,
  ComponentPropsOptions,
  ComputedOptions,
  CreateComponentPublicInstance,
  EmitsOptions,
  ExtractDefaultPropTypes,
  ExtractPropTypes,
  MethodOptions,
  ObjectEmitsOptions,
  VNodeProps,
} from '@vue/runtime-core'

type EmitsToProps<T extends EmitsOptions> = T extends string[]
  ? {
      [K in string & `on${Capitalize<T[number]>}`]?: (...args: any[]) => any
    }
  : T extends ObjectEmitsOptions
  ? {
      [K in string & `on${Capitalize<string & keyof T>}`]?: K extends `on${infer C}`
        ? T[Uncapitalize<C>] extends null
          ? (...args: any[]) => any
          : (...args: T[Uncapitalize<C>] extends (...args: infer P) => any ? P : never) => any
        : never
    }
  : {}
type ComponentPublicInstanceConstructor<
  T extends ComponentPublicInstance<Props, RawBindings, D, C, M> = ComponentPublicInstance<any>,
  Props = any,
  RawBindings = any,
  D = any,
  C extends ComputedOptions = ComputedOptions,
  M extends MethodOptions = MethodOptions
> = {
  __isFragment?: never
  __isTeleport?: never
  __isSuspense?: never
  new (...args: any[]): T
}
type PublicProps = VNodeProps & AllowedComponentProps & ComponentCustomProps

declare global {
  type DefineComponent<
    PropsOrPropOptions = {},
    RawBindings = {},
    D = {},
    C extends ComputedOptions = ComputedOptions,
    M extends MethodOptions = MethodOptions,
    Mixin extends ComponentOptionsMixin = ComponentOptionsMixin,
    Extends extends ComponentOptionsMixin = ComponentOptionsMixin,
    E extends EmitsOptions = {},
    EE extends string = string,
    PP = PublicProps,
    Props = Readonly<
      PropsOrPropOptions extends ComponentPropsOptions
        ? ExtractPropTypes<PropsOrPropOptions>
        : PropsOrPropOptions
    > &
      ({} extends E ? {} : EmitsToProps<E>),
    Defaults = ExtractDefaultPropTypes<PropsOrPropOptions>
  > = ComponentPublicInstanceConstructor<
    CreateComponentPublicInstance<
      Props,
      RawBindings,
      D,
      C,
      M,
      Mixin,
      Extends,
      E,
      PP & Props,
      Defaults,
      true
    > &
      Props
  > &
    ComponentOptionsBase<Props, RawBindings, D, C, M, Mixin, Extends, E, EE, Defaults> &
    PP
}
