import type { Preset } from './type'

export default function usePresetEvent(): Preset {
  return {
    label: '事件演示',
    json: `
[
  {
    "uuid": "5f95cb22-90fe-4314-a70c-34881149d103",
    "componentName": "WidgetButton",
    "libraryName": "generics",
    "focus": false,
    "eventTriggers": {
      "customEventTrigger__1df0bb98-6bb9-4d57-8320-511fbfa48ebf": {
        "execCode": "\\r\\n// 这里的代码会在对应组件setup中的一个匿名函数里执行\\r\\n// 本函数有四个参数，分别是\\r\\n// 1. context 一般对应setup的返回值\\r\\n// 2. getCurrentInstance 对应setup中的getCurrentInstance函数实例\\r\\n// 3. CUSTOM_EVENT_EMIT_NAME vue中emit的事件名。常量，目前是\`dispatchEvent\`，vue中emit的事件名\\r\\n// 4. THIS_EMIT_NAME 当前事件触发器的唯一标识符\\r\\n\\r\\n\\r\\nconst instance = getCurrentInstance()\\r\\nconst props = instance.props\\r\\nconst emit = instance.emit\\r\\n\\r\\nfunction injectDispatchClick(count) {\\r\\n  console.log(count)\\r\\n  context.dispatchClick(count)\\r\\n  if (count === 3) {\\r\\n    // 激活其他事件触发器\\r\\n    emit(CUSTOM_EVENT_EMIT_NAME, \`doubleClick\`)\\r\\n  }\\r\\n  else if (count === 4) {\\r\\n    // 激活自身事件触发器\\r\\n    emit(CUSTOM_EVENT_EMIT_NAME, THIS_EMIT_NAME)\\r\\n  }\\r\\n}\\r\\nconst multiClick = context.useMultiClick(injectDispatchClick, 200)\\r\\ncontext.onClick = () => {\\r\\n  multiClick()\\r\\n}",
        "title": "三四击事件",
        "description": "连续快速三次点击触发双击事件，四击触发本事件",
        "actions": [
          {
            "actionName": "EnableComponent",
            "uuid": "cd686b9d-a500-4913-9268-1811badab8a6",
            "config": {
              "componentUUID": "5f95cb22-90fe-4314-a70c-34881149d103"
            }
          },
          {
            "actionName": "ShowComponent",
            "uuid": "56f37050-b58f-481b-8bd2-667f13dee635",
            "config": {
              "componentUUID": "5f95cb22-90fe-4314-a70c-34881149d103"
            }
          },
          {
            "actionName": "OpenPage",
            "uuid": "5e3daca9-e626-4d96-b27d-036e7359eb5a",
            "config": {
              "openMode": "jumpLink",
              "config": {
                "url": "https://www.baidu.com/s?ie=UTF-8&wd=baidu",
                "blank": true
              }
            }
          }
        ]
      },
      "doubleClick": {
        "actions": [
          {
            "actionName": "OpenPage",
            "uuid": "9e2becf8-e423-4dab-84ce-cbd2c49f44e4",
            "config": {
              "openMode": "jumpLink",
              "config": {
                "url": "http://127.0.0.1:5173/",
                "blank": true
              }
            }
          }
        ]
      }
    },
    "props": {
      "title": "按钮",
      "buttonType": "default",
      "buttonSize": "normal",
      "customEventTrigger": {}
    },
    "indexId": "e5eb4e98-92e1-4dbc-ac53-1415ffa2a1f3"
  },
  {
    "indexId": "bbfa3ae8-f11e-4ec2-91ee-65082317a0e7",
    "uuid": "ee92aed9-be44-4933-98f4-d24cbe64b54f",
    "componentName": "WidgetSwipe",
    "libraryName": "generics",
    "focus": false,
    "eventTriggers": {},
    "props": {
      "urlList": [
        "https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg",
        "https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg",
        "https://fastly.jsdelivr.net/npm/@vant/assets/apple-3.jpeg",
        "https://fastly.jsdelivr.net/npm/@vant/assets/apple-4.jpeg",
        "https://fastly.jsdelivr.net/npm/@vant/assets/apple-5.jpeg"
      ],
      "initialSwipe": "0",
      "autoplay": "3000",
      "duration": "500",
      "loop": true,
      "showIndicators": true,
      "picWidth": "100%",
      "picHeight": "240"
    }
  }
]`,
  }
}