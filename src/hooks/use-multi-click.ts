/**
 * 单击事件转N击事件
 * @param fun 回调函数
 * @param wait 两次点击间隔时间，毫秒。最后一次点击后 再过wait毫秒无点击视为连击结束
 */
export function useMultiClick(fun: (count: number) => any, wait = 200) {
  let timer: ReturnType<typeof setTimeout> | undefined = undefined,
    count = 0
  return () => {
    clearTimeout(timer)
    count += 1
    timer = setTimeout(() => {
      fun(count)
      count = 0
      timer = undefined
    }, wait)
  }
}
