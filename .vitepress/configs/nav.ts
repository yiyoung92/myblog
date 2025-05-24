/* configs/nav.ts */
import type { DefaultTheme } from 'vitepress'

export const nav: DefaultTheme.Config['nav'] = [
    { text: '首页', link: '/' },
    { text: '知识库', link: '/01 知识库' },
    { text: '播客', link: '/03 新手爸妈播客' },
    {
    text: '资料库',
    items: [
        { text: '书籍', link: '/02 资料档案/书籍' },
        { text: '视频', link: '/02 资料档案/视频' },
        { text: '音乐', link: '/02 资料档案/音乐' },
    ]
    },
]