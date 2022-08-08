import { createStyleImportPlugin } from 'vite-plugin-style-import'

/**
 * arco.design 手动导入的方式按需加载组件样式
 * @link https://arco.design/vue/docs/start#%E6%8C%89%E9%9C%80%E5%8A%A0%E8%BD%BD
 */
export default function configArcoStyleImportPlugin() {
  return createStyleImportPlugin({
    libs: [
      {
        libraryName: '@arco-design/web-vue',
        esModule: true,
        resolveStyle: (name) => {
          // The use of this part of the component must depend on the parent, so it can be ignored directly.
          // 这部分组件的使用必须依赖父级，所以直接忽略即可。
          const ignoreList = [
            'config-provider',
            'anchor-link',
            'sub-menu',
            'menu-item',
            'menu-item-group',
            'breadcrumb-item',
            'form-item',
            'step',
            'card-grid',
            'card-meta',
            'collapse-panel',
            'collapse-item',
            'descriptions-item',
            'list-item',
            'list-item-meta',
            'table-column',
            'table-column-group',
            'tab-pane',
            'tab-content',
            'timeline-item',
            'tree-node',
            'skeleton-line',
            'skeleton-shape',
            'grid-item',
            'carousel-item',
            'doption',
            'option',
            'optgroup',
            'icon',
          ]
          // List of components that need to map imported styles
          // 需要映射引入样式的组件列表
          const replaceList = {
            'typography-text': 'typography',
            'typography-title': 'typography',
            'typography-paragraph': 'typography',
            'typography-link': 'typography',
            'dropdown-button': 'dropdown',
            'input-password': 'input',
            'input-search': 'input',
            'input-group': 'input',
            'radio-group': 'radio',
            'checkbox-group': 'checkbox',
            'layout-sider': 'layout',
            'layout-content': 'layout',
            'layout-footer': 'layout',
            'layout-header': 'layout',
            'month-picker': 'date-picker',
            'range-picker': 'date-picker',
            row: 'grid', // 'grid/row.less'
            col: 'grid', // 'grid/col.less'
            'avatar-group': 'avatar',
            'image-preview': 'image',
            'image-preview-group': 'image',
          } as Record<string, string>
          if (ignoreList.includes(name)) return ''
          // eslint-disable-next-line no-prototype-builtins
          return replaceList.hasOwnProperty(name)
            ? `@arco-design/web-vue/es/${replaceList[name]}/style/css.js`
            : `@arco-design/web-vue/es/${name}/style/css.js`
          // less
          // return `@arco-design/web-vue/es/${name}/style/index.js`;
        },
      },
    ],
  })
}
