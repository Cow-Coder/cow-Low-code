import { defineConfig } from 'vitepress'

const ogDescription =
  '移动端低代码平台、可视化拖放编辑、页面生成工具。通过 JSON 配置就能直接生成移动端UI界面，极大减少开发成本。'
// const ogImage = 'https://vitejs.dev/og-image.png'
const ogTitle = '牛搭'
const ogUrl = 'https://github.com/Cow-Coder/cow-Low-code'

const base = '/docs-cow-low-code/'

export default defineConfig({
  base,
  title: ogTitle,
  description: ogDescription,
  lang: 'zh',
  appearance: false,
  lastUpdated: true,

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: `${base}icon.svg` }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: ogTitle }],
    // ['meta', { property: 'og:image', content: ogImage }],
    ['meta', { property: 'og:url', content: ogUrl }],
    ['meta', { property: 'og:description', content: ogDescription }],
    ['meta', { name: 'theme-color', content: '#646cff' }],
  ],

  themeConfig: {
    logo: { src: '/logo.svg', alt: '牛搭' },
    siteTitle: false,
    editLink: {
      pattern: 'https://github.com/Cow-Coder/cow-Low-code/tree/main/docs/:path',
      text: '为此页提供修改建议',
    },

    socialLinks: [{ icon: 'github', link: 'https://github.com/Cow-Coder/cow-Low-code' }],

    localeLinks: {
      text: '简体中文',
      items: [{ text: 'English(0%)', link: '#' }],
    },

    nav: [
      { text: '指南', link: '/guide/summary', activeMatch: '/guide/' },
      { text: '开发', link: '/development/prepare', activeMatch: '/development/' },
      { text: '文档', link: '/document/start', activeMatch: '/document/' },
      {
        text: '相关链接',
        items: [{ text: 'Team', link: '/team' }],
      },
    ],

    sidebar: {
      '/guide/': [
        {
          text: '开始',
          items: [
            {
              text: '介绍',
              link: '/guide/summary',
            },
          ],
        },
        {
          text: '概念',
          items: [
            {
              text: '物料组件',
              link: '/guide/component',
            },
            {
              text: '事件与动作',
              link: '/guide/event-and-action',
            },
            {
              text: '样式',
              link: '/guide/style',
            },
          ],
        },
        {
          text: '基础',
          items: [
            {
              text: '预览页面',
              link: '/guide/preview',
            },
            {
              text: '预设',
              link: '/guide/preset',
            },
          ],
        },
        {
          text: '高级',
          items: [
            {
              text: '自定义动作执行器',
              link: '/guide/custom-action',
            },
            {
              text: '自定义事件触发器',
              link: '/guide/custom-trigger',
            },
          ],
        },
        {
          text: '其他',
          items: [
            {
              text: '常见问题',
              link: '/guide/question',
            },
          ],
        },
      ],
      '/development/': [
        {
          text: '起航',
          items: [
            {
              text: '准备工作',
              link: '/development/prepare',
            },
            {
              text: '开始',
              link: '/development/start',
            },
            {
              text: '文件夹结构',
              link: '/development/dictionary',
            },
            {
              text: '样式',
              link: '/development/style-design',
            },
            {
              text: '图标',
              link: '/development/icon',
            },
            {
              text: '构建与部署',
              link: '/development/build',
            },
          ],
        },
        {
          text: '规范',
          items: [
            {
              text: '代码规范',
              link: '/development/coding-style',
            },
            {
              text: '目录/命名规范',
              link: '/development/dictionary-style',
            },
            {
              text: '文案规范',
              link: '/development/copywriting-style',
            },
            {
              text: 'Git提交规范',
              link: '/development/git-style',
            },
          ],
        },
        {
          text: '进阶',
          items: [
            {
              text: '开发物料组件',
              link: '/development/add-library-component',
            },
            {
              text: '开发动作执行器',
              link: '/development/add-event-action',
            },
          ],
        },
        {
          text: '质量',
          items: [
            {
              text: 'Lint',
              link: '/development/lint',
            },
            {
              text: 'TypeScript',
              link: '/development/typescript',
            },
            {
              text: '测试',
              link: '/development/unit-test',
            },
          ],
        },
        {
          text: '其他',
          items: [
            {
              text: '通过Git更新',
              link: '/development/update-by-git',
            },
            {
              text: '常见问题',
              link: '/development/question',
            },
          ],
        },
      ],
      '/document/': [
        {
          text: '文档编写',
          items: [
            {
              text: '开始',
              link: '/document/start',
            },
            {
              text: '部分划分',
              link: '/document/divide',
            },
          ],
        },
      ],
    },
  },
})
