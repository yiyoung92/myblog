import type { DefaultTheme } from 'vitepress'

export const vite = { 
    optimizeDeps: {
    exclude: [ 
        '@nolebase/vitepress-plugin-enhanced-readabilities/client', 
        'vitepress', 
        '@nolebase/ui', 
    ], 
    },
    ssr: { 
    noExternal: [ 
        // 如果还有别的依赖需要添加的话，并排填写和配置到这里即可 //
        //阅读增强 调整布局和聚光灯效果
        '@nolebase/vitepress-plugin-enhanced-readabilities', 
        '@nolebase/ui', 
        // 高亮目标标题
        '@nolebase/vitepress-plugin-highlight-targeted-heading', 
    ], 
    }, 
}
