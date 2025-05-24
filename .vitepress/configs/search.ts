import type { DefaultTheme } from 'vitepress'

export const search: DefaultTheme.Config['search'] = { 
    provider: 'local',	
    options: {	
        locales: {	
        root: {	
            translations: {	
                button: {	
                buttonText: '搜索文档',	
                buttonAriaLabel: '搜索文档',	
                },	
                modal: {	
                noResultsText: '无法找到相关结果',	
                resetButtonTitle: '清除查询条件',	
                footer: {	
                selectText: '选择',	
                navigateText: '切换',	
                },
                },	
            },	          	
        },		  
        },
        // Add title ang tags field in frontmatter to search	
        // You can exclude a page from search by adding search: false to the page's frontmatter.	
        _render(src, env, md) {	
        // without `md.render(src, env)`, the some information will be missing from the env.	
        let html = md.render(src, env)	
        let tagsPart = ''	
        let headingPart = ''	
        let contentPart = ''	
        let fullContent = ''
        const sortContent = () => [headingPart, tagsPart, contentPart] as const	
        let { frontmatter, content } = env	
        if (!frontmatter)	
            return html	
        if (frontmatter.search === false)	
            return ''	
        contentPart = content ||= src	
        const headingMatch = content.match(/^# .*/m)	
        const hasHeading = !!(headingMatch && headingMatch[0] && headingMatch.index !== undefined)	
        if (hasHeading) {	
        const headingEnd = headingMatch.index! + headingMatch[0].length	
        headingPart = content.slice(0, headingEnd)	
        contentPart = content.slice(headingEnd)	
        }	
        else if (frontmatter.title) {	
            headingPart = `# ${frontmatter.title}`	
        }	
        const tags = frontmatter.tags	
        if (tags && Array.isArray(tags) && tags.length)	
            tagsPart = `Tags: #${tags.join(', #')}`	
        fullContent = sortContent().filter(Boolean).join('\n\n')	
        html = md.render(fullContent, env)	
        return html	
        },	  
    },
}