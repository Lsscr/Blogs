---
icon: edit
title: git常用的命令
date: 2022-05-31
category:
  - 我的辅助
tag:
  - git
sticky: true
star: true
---

## git一开始初始化
```shell
git config --global user.name "XXX" #配置全局用户名字
git config --global user.email XXX@qq.com #配置全局用户邮箱

git init  #初始化仓库
git status  #对状态的跟踪
```

## git在项目上的操作
```shell
git add  #添加文件内容到暂存区（同时文件被跟踪）
git add .  #添加所有文件

git -commit -m 'first commit' #从暂存区提交 -m：注释内容
git commit -a -m 'full commit'从工作区提交

git branch <branchName> #创建一个分支
git branch -d <branchName> #删除一个分支
git branch -v #显示所有分支信息

git remote add  origin ~/git-server #添加一个远程仓库的别名
git remote -v #查看远程仓库信息
git remote remove <name> #删除name仓库
```
## git相关例子
```shell
#在命令行上创建新的存储库
echo "# Blogs" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin git@github.com:Lsscr/Blogs.git
git push -u origin main

#或从命令行推送现有存储库
git remote add origin git@github.com:Lsscr/Blogs.git
git branch -M main
git push -u origin main
```
