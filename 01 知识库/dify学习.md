---
title: dify学习
Link: "[[学习笔记]]"
tags:
  - 领域/学习笔记/软件
date: 2025-03-10
key-words:
---

# dify学习
# **部署**
## 1.首先阅读并参照官方文档执行
 [dify部署官方文档](https://docs.dify.ai/zh-hans/getting-started/install-self-hosted/docker-compose)
## 2.Docker Compose 部署
下载并安装docker，完成注册后，打开并运行docker，登录及注册可能需要梯子。

## 3.dify部署
启动 Docker 容器，运行`docker compose up -d`指令。
**问题：** 第一次运行时，提示：`Error response from daemon: Get "https://registry-1.docker.io/v2/": EOF`, 拉取镜像失败，大概率是网络问题。
**解决方法：** 设置其他可用镜像路径。
	- 找到C:\Users\eason\.docker\daemon.json，打开并编辑
	- 增加如下镜像路径代码：(如仍无法解决可能是镜像路径已失效，需重新检索。)
```json
{
  "registry-mirrors": [
    "https://2a6bf1988cb6428c877f723ec7530dbc.mirror.swr.myhuaweicloud.com",
    "https://docker.m.daocloud.io",
    "https://hub-mirror.c.163.com",
    "https://mirror.baidubce.com",
    "https://your_preferred_mirror",
    "https://dockerhub.icu",
    "https://docker.registry.cyou",
    "https://docker-cf.registry.cyou",
    "https://dockercf.jsdelivr.fyi",
    "https://docker.jsdelivr.fyi",
    "https://dockertest.jsdelivr.fyi",
    "https://mirror.aliyuncs.com",
    "https://dockerproxy.com",
    "https://mirror.baidubce.com",
    "https://docker.m.daocloud.io",
    "https://docker.nju.edu.cn",
    "https://docker.mirrors.sjtug.sjtu.edu.cn",
    "https://docker.mirrors.ustc.edu.cn",
    "https://mirror.iscas.ac.cn",
    "https://docker.rainbond.cc"
  ]
}
```

## 4.同步环境变量配置 (重要！)

- 如果 `.env.example` 文件有更新，请务必同步修改你本地的 `.env` 文件。
- 检查 `.env` 文件中的所有配置项，确保它们与你的实际运行环境相匹配。你可能需要将 `.env.example` 中的新变量添加到 `.env` 文件中，并更新已更改的任何值。

# **登录**

```
# 本地环境 设置管理员账户，每次重启docker后建议登录
http://localhost/install
# 本地环境，登录主界面
http://localhost
# 服务器环境，登录主界面
http://your_server_ip
```
# **设置**
## 模型设置
- ollama，对于docker部署的dify，建议基础URL设置为局域网ip：例如http://192.168.3.90:11434
或者http://host.docker.internal:11434
- xinference，xinference在本地访问ip为http://localhost:9998/ui/，同上因为dify由docker部署，因此在dify上设置模型供应商时，要把localhost替换为http://host.docker.internal:9998

# 工作流
