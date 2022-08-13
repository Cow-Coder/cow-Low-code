declare module 'colorpicker-v3' {
  export default class ColorPicker {
    constructor(el: HTMLElement, options: any)
    destroy(): void
    getColor(): string
    setColor(color: string): void
  }
}
