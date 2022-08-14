import { CUSTOM_EVENT_TRIGGER_NAME } from '@/constant'
import { uuid } from '@/utils/library'

/**
 * 判断name是否为自定义事件
 * @example
 * 自定义事件格式 customEventTrigger__uuid
 * .e.g customEventTrigger__e582f8db-b5ce-44df-9330-049e97cd40cf
 * @param name
 */
export function isCustomEventTriggerName(name: string) {
  const uuidReg = new RegExp(
    `^${CUSTOM_EVENT_TRIGGER_NAME}__[a-f\\d]{4}(?:[a-f\\d]{4}-){4}[a-f\\d]{12}$`
  )
  return uuidReg.test(name)
}

/**
 * 生成一个自定义事件触发器的name
 * @example
 * 自定义事件格式 customEventTrigger__uuid
 * .e.g customEventTrigger__e582f8db-b5ce-44df-9330-049e97cd40cf
 */
export function generateCustomEventTriggerName() {
  return `${CUSTOM_EVENT_TRIGGER_NAME}__${uuid()}`
}
