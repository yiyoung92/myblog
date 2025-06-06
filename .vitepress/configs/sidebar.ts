// 引入侧边栏自动生成配置
import { generateSidebar } from 'vitepress-sidebar';

import type { DefaultTheme } from 'vitepress'

// export const sidebar: DefaultTheme.Config['sidebar'] = [
//     {
//     text: 'Examples',
//     items: [
//         { text: 'Markdown Examples', link: '/markdown-examples' },
//         { text: 'Runtime API Examples', link: '/api-examples' },
//         { text: '新手爸妈播客', link: '/新手爸妈播客' },
//     ]
//     }
// ]

// const vitepressSidebarOptions = {
//   /* Options... */
//   sortMenusOrderByDescending: true, //是否降序排列
// };

export const sidebar: DefaultTheme.Sidebar = generateSidebar({
    /*
    * For detailed instructions, see the links below:
    * https://vitepress-sidebar.jooy2.com/guide/api
    */
    documentRootPath: '/', //文档根目录
    // scanStartPath: null,
    // resolvePath: null,
    // useTitleFromFileHeading: true,
    // useTitleFromFrontmatter: true,
    // frontmatterTitleFieldName: 'title',
    // useFolderTitleFromIndexFile: false, //是否使用层级首页文件名做分级标题
    useFolderLinkFromIndexFile: true, //是否链接至层级首页文件
    // hyphenToSpace: true,
    // underscoreToSpace: true,
    // capitalizeFirst: false,
    // capitalizeEachWords: false,
    sortFolderTo: 'top', //是否将文件夹排到最上面
    collapsed: false, //折叠组关闭
    collapseDepth: 2, //折叠组2级菜单
    sortMenusByName: true,
    // sortMenusByFrontmatterOrder: false,
    // sortMenusByFrontmatterDate: false,
    sortMenusOrderByDescending: false,
    sortMenusOrderNumericallyFromTitle: true,
    // sortMenusOrderNumericallyFromLink: false,
    // frontmatterOrderDefaultValue: 0,
    // manualSortFileNameByPriority: ['index.md'], //手动排序，文件夹不用带后缀

    removePrefixAfterOrdering: false, //删除前缀，必须与prefixSeparator一起使用
    prefixSeparator: '.', //删除前缀的符号
    // excludeFiles: ['first.md', 'secret.md'],
    // excludeFilesByFrontmatterFieldName: 'exclude',
    // excludeFolders: ['secret-folder'],
    // includeDotFiles: false,
    // includeRootIndexFile: false, //是否包含根目录主页
    // includeFolderIndexFile: false, //是否包含层级主页
    // includeEmptyFolder: false,
    // rootGroupText: 'Contents',
    // rootGroupLink: 'https://github.com/jooy2',
    // rootGroupCollapsed: false,
    // convertSameNameSubFileToGroupIndexPage: false,
    // folderLinkNotIncludesFileName: false,
    // keepMarkdownSyntaxFromTitle: false,
    // debugPrint: false,
})
