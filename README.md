# BeginnerParents - 新手爸妈的快乐花园

一个基于 VitePress 构建的新手爸妈知识分享平台，记录从备孕到育儿的点点滴滴。

## 🌟 项目特色

- **📚 知识库**：涵盖儿童保险、婴幼儿健康、育儿技巧等实用知识
- **🎙️ 播客节目**：《新手爸妈播客》记录真实的育儿经历和感悟
- **📖 资料收集**：精选育儿书籍、视频、音乐等优质资源
- **🔗 双向链接**：文章间智能关联，构建知识网络
- **📱 响应式设计**：完美适配移动端和桌面端

## 🚀 快速开始

### 环境要求

- Node.js 16+
- pnpm 10.10.0+

### 安装依赖

```bash
pnpm install
```

### 本地开发

```bash
pnpm run docs:dev
```

访问 `http://localhost:5173` 查看网站

### 构建部署

```bash
pnpm run docs:build
```

### 预览构建结果

```bash
pnpm run docs:preview
```

## 📁 项目结构

```
myblog/
├── 01 知识库/           # 育儿知识文章
├── 02 资料库/           # 资源收集整理
├── 03 新手爸妈播客/     # 播客节目文档
├── 5 - Templates/       # 文档模板
├── .vitepress/          # VitePress 配置
├── public/              # 静态资源
└── index.md             # 首页
```

## 🛠️ 技术栈

- **框架**: VitePress
- **样式**: Tailwind CSS
- **增强插件**: Nolebase 系列插件
- **图表**: Mermaid
- **包管理**: pnpm

## ✨ 核心功能

### 文档增强
- ✅ 任务列表支持
- 🔗 双向链接
- 📝 脚注功能
- 🎨 文本高亮标记
- 📊 Mermaid 图表

### 阅读体验
- 🌙 深色模式
- 🔍 全文搜索
- 📱 移动端优化
- ⚡ 图片懒加载
- 🎯 大纲导航

## 🎯 内容导航

### 01 知识库
- 儿童保险配置指南
- 婴幼儿健康护理
- 育儿方法与技巧
- 家庭保险方案

### 02 资料库
- 育儿书籍推荐
- 优质视频资源
- 音乐歌单分享

### 03 新手爸妈播客
- EP1-EP19：完整记录从备孕到育儿的真实经历
- 涵盖孕期检查、分娩经历、母乳喂养、月子护理等话题

## 📡 收听播客

在小宇宙 App 搜索"新手爸妈播客"或访问：
https://www.xiaoyuzhoufm.com/podcast/669de5fe1ece2fb340e6c76f

## 🔧 开发说明

### 自定义配置
主要配置文件位于 `.vitepress/config.mts`，包含：
- 导航菜单配置
- 侧边栏配置
- 搜索配置
- 插件配置

### 内容创作
- 使用 Markdown 格式编写
- 支持 Front Matter 元数据
- 可使用双向链接语法 `[[文章标题]]`
- 支持 Mermaid 图表和任务列表

## 🤝 贡献指南

1. Fork 本项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m '添加某个特性'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

Copyright © 2025-present Eason Young

本项目仅供个人学习和交流使用。

## 🙏 致谢

- [VitePress](https://vitepress.dev/) - 静态站点生成器
- [Nolebase](https://nolebase.ayaka.io/) - 文档增强插件
- [Tailwind CSS](https://tailwindcss.com/) - CSS 框架