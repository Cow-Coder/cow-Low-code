export default function useParseTranslate(translate: string | undefined) {
  if (translate === '') return { x: 0, y: 0 }
  return {
    x: translate ? Number(translate.slice(translate.indexOf('(') + 1, translate.indexOf('px'))) : 0,
    y: translate
      ? Number(translate.slice(translate.indexOf(',') + 1, translate.indexOf(')') - 2))
      : 0,
  }
}
