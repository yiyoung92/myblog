import { defineConfig } from 'vitepress'
// 使用双链
import { BiDirectionalLinks } from '@nolebase/markdown-it-bi-directional-links'
// 使用任务列表
import markdownItTaskCheckbox from 'markdown-it-task-checkbox'
// 引入导航配置,搜索配置，侧边栏配置，vite配置
import { nav,search,sidebar,vite } from './configs'


// https://vitepress.dev/reference/site-config
export default defineConfig({
  // 实现阅读增强 布局调整和聚光灯效果
  vite,
  lang: 'zh-CN',
  title: "BeginnerParents",
  description: "手爸妈的快乐花园，分享收获、记录生活",
  cleanUrls: true, // 启用清洁URL
  ignoreDeadLinks: true, //关闭忽略死链，不配置即可，非常不建议设置为true
  lastUpdated: true, //首次配置不会立即生效，需git提交后爬取时间戳 //
   //启用深色模式
  appearance:'dark', 
    
  //主题大图标
  head: 
  [
    ['link',{ rel: 'icon', href: '/logo.png'}],  
  ],    
  
  // 站点地图
  sitemap: {
    hostname: 'https://blog.beginnerparents.com',
  },
  
  markdown: {
    config: (md) => {
      md.use(BiDirectionalLinks()) ,// 双链
      md.use(markdownItTaskCheckbox) //todo
    },
    image: {
      // 开启图片懒加载
      lazyLoading: true
    },

  },


  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    //左上角网页标题隐藏 
    //siteTitle: false, 
    //左上角网页标题
    siteTitle: '新手爸妈', 
    //左上角logo
    logo: '/logo.svg', 
    //导航配置
    nav,

    //移动端深浅模式文字修改 //
    darkModeSwitchLabel: '切换模式', 
    //移动端侧边栏文字更改 //
    sidebarMenuLabel:'目录', 
    //移动端返回顶部文字修改 //
    returnToTopLabel: '返回顶部',
    //侧边栏配置
    sidebar,

    // 右侧边栏标题（大纲）
    outline: { 
      level: [2,4], // 显示2-4级标题
      // level: 'deep', // 显示2-6级标题
      label: '当前页大纲' // 文字显示
    },
    // outline:false, // 关闭标题显示
    outlineTitle:'当前页大纲', //老方式设置标题
    
    // 社交链接及图标
    socialLinks: [
      {
        icon: 'telegram',// 没法使用本地小宇宙图标，先随便用一个
        link: 'https://www.xiaoyuzhoufm.com/podcast/669de5fe1ece2fb340e6c76f' // 小宇宙链接
      },
    ],
    
    // 页脚 版权信息（可以考虑增加备案号信息）
    footer: {
      message: '2025 个人博客. All rights reserved. ',
      copyright: 'Copyright © 2025-present Eason Young'
    },
    
    
    //本地搜索,并配置tags检索功能
    search,

    //上次更新时间 //
    lastUpdated: {
      text: '更新时间',
      formatOptions: {
        dateStyle: 'short', // 可选值full、long、medium、short
        timeStyle: 'short' // 可选值full、long、medium、short
      },
    },
    //自定义上下页名 //
    docFooter: { 
      prev: '上一页', 
      next: '下一页', 
    },   
  }
})
