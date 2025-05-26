import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'
import "./style.css";
import IndexList from './indexList.vue'

import { h } from 'vue'

import { 
  NolebaseEnhancedReadabilitiesMenu, 
  NolebaseEnhancedReadabilitiesScreenMenu, 
} from '@nolebase/vitepress-plugin-enhanced-readabilities/client'

import '@nolebase/vitepress-plugin-enhanced-readabilities/client/style.css'

import {  
  NolebaseHighlightTargetedHeading,  
} from '@nolebase/vitepress-plugin-highlight-targeted-heading/client'

import '@nolebase/vitepress-plugin-highlight-targeted-heading/client/style.css' 

// mark 高亮特效
import '@nolebase/vitepress-plugin-enhanced-mark/client/style.css'
// 标签组件
const Tags = () => {
  const { frontmatter } = useData()
  const tags = frontmatter.value.tags
  if (!tags || !tags.length) return null
  return h(
    'div',
    { class: 'vp-tags' },
    tags.map((tag: string) =>
      h('span', { class: 'vp-tag' }, `#${tag}`)
    )
  )
}

export default {
  ...DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      // 阅读增强菜单
      // 为较宽的屏幕的导航栏添加阅读增强菜单
      'nav-bar-content-after': () => h(NolebaseEnhancedReadabilitiesMenu),
      // 为较窄的屏幕（通常是小于 iPad Mini）添加阅读增强菜单
      'nav-screen-content-after': () => h(NolebaseEnhancedReadabilitiesScreenMenu),
      // 高亮目标标题
      // 'layout-top': () => [h(NolebaseHighlightTargetedHeading)],

      // 在标题上方插入标签（如果还需要）
      'doc-before': () => h(Tags)
    })
  },
  enhanceApp({ app }) {
    app.component('IndexList', IndexList)
  }
}
