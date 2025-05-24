---
title: cursor 使用教程
Link: "[[学习笔记]]"
tags:
  - 领域/学习笔记/软件
date: 2025-01-10
key-words:
  - cursor
  - 软件
---
# cursor 使用教程
# 基础用法
## 快捷键
cmd+L 调用 chat，cmd+I 调用 composer
## 模型选择
gpt-4o更通用，适合在 chat。claude 代码能力很强，适合在 composer。
## @files
引用文件## @folders
引用文件夹
@docs
引用文档，相当于知识库。
- 在设置页面docs 设置中，添加URL，注意链接后缀为/，表示含子页面，否则只是其当前页面。
- 直接在输入窗口@+URL，直接添加链接，也可以作为临时引用。
## @web
从网络进行搜索。
## @git
从 git 中检索提交过的内容，例如对比多个提交内容的差异。
## @codebase
cursor 在每次打开时，会执行 codebase indexing，即对本次打开的项目内容扫描，embedding 到云端。*（有时需要自己点击设置页面中的resync index）*
对于不想被索引的文件放到`.cursorignore`文件，将不会被 cursor 纳入索引（ 参考gitignore）。
通常包含日志文件、环境变量文件、构建过程文件、缓存文件、与代码无关的第三方配置文件等。可以让 cursor 自动检索目录生成。
## notepad
记事本。chat 与 composer 聊天记录不互通，可以通过创建 notepad 作为备忘进行对话历史记录，便于其他时间快速调用。
## rules
全局规则，在设置界面定义。例如全局使用中文。
项目规则，在项目文件夹新建`.cursorrules`文件，内容可以包含：项目简介、项目架构（文件夹构成）、命名规范、组件规范、样式规范、git 提交规范等等

# 技巧和思路
## 先明确需求
通过 chat，描述大概的目标，逐步拆解形成一个细致的需求，此时可以将该需求或 feature记录到 notepad。再将该notepad喂到 composer 中进行代码生成。
在 composer 执行多次遇到问题后，可以记录到 notepad 中，反馈至 chat 中继续沟通。
## 项目初始化工作
1. 生成`.cursorignore`文件
打开项目后，应该让 cursor 检索整个项目，并生成`.cursorignore`文件，编辑添加需要忽略的文件。然后在设置页面点击resync index，重建项目代码索引。
2. 录入 docs
项目需要参考的文档，如需求文档、接口文档及其他技术文档，提前录入 docs 中。
3. 生成`.cursorrules`文件
定义项目规则，如果不会写，可以通过调用 docs 文档，请 ai 生成。
## composer 使用技巧
 1. 检测代码效果
可以先点击 saveall，运行看看效果，再决定 accept 还是 reject
2. composer 回滚代码
如发生多次记录都不满意，想回滚到某次记录时，可以在 composer 聊天框的该次记录框上方的 checkpoint，点击 restore，会恢复到当时的代码版本。
3. composer 预防乱改代码
注意用词，避免 ai 错误的执行。
- 增加：*请先复述一遍我的需求再进行答复，让我能够确认你真的理解了我的需求指令。* 然后检查其复述与期望是否一致，再令其生成代码
- 需求指令单一化、尽可能明确范围：例如在@lib 中写接口，在@components 中写组件，在@types 中写类型文件等等
- 逐步逐点的描述需求
## bug调试
如果某次提交后产生了bug，可以在 chat 中通过@git 选择之前提交的版本，让 ai 检索差异，缩小问答的范围，提高回复的准确性。@web 联网检索答案。如果 bug 解决方案较为复杂，可以创建一个 notepad 进行记录，然后喂给 composer。
notepad 便于保存，同时更方便编辑。注意 notepad 只是个备忘录，需要及时归档为 docs。便于下次运行类似项目时，作为 docs 导入。
## commit
可以为修改后暂存的文档一键生成 commit message，然后点击提交。
## 使用临时邮箱/无限邮箱进行注册，白嫖
涉及到指纹检测，可以通过 github.com/isboyjc/cursor-reset 运行脚本
``` sh fold
# macOS
curl -fsSL https://raw.githubusercontent.com/isboyjc/cursor-reset/main/scripts/reset.sh | sh
# windows
irm https://raw.githubusercontent.com/isboyjc/cursor-reset/main/scripts/reset.ps1 | iex
```