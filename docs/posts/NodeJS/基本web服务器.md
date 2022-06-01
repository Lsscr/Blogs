---
order: 3
icon: page
date: 2022-06-01
category:
  - 后端
tag:
  - NodeJS
---
# 内置http模块的用法与公用包

`尽量NodeJS中内置了http模块,但是强大express包是对http模块的进一步封装,所以用的时候建议使用express`

## http模块

> 客户端:消费资源的电脑
>
> 服务器:**对外提供网路资源**



服务器与普通电脑区别于web服务器软件,例如:IIS,Apache等



在Node.js中,不需要服务器软件.只需要nodejs中的一些模块即可



### 创建最基本的web服务器

1. 创建web服务器实例

   调用**createServe方法**

   ```js
   const serve = http.createServe()
   ```

2. 为服务器绑定request事件

   调用`.on方法`,**访问客户端的数据和属性,回应客户端内容**

   ```js
   {
   serve.on('request',function(res,req) => {
       console.log('有访问服务器 ')
   //req请求对象,包含数据和属性
   //req.url为客户端URL地址
   //req.method为客户端请求类型
   //调用res.end响应客户端内容
       res.end('text')
        })
   }
   ```

   #### 根据不同的url响应不同的html内容

   ```js
   serve.on('request',function(res,req){
       const url = req.url
       let context = '404 Not Found'
       if(url==='/' || url==='/index.html'){
           context = '首页'
       }else if(url == 'about.html'){
           context = '关于'
       }
       //设置Content-Type响应头,防止乱码
       res.setHeader('Content-Type','text/html:cahrset=utf-8')
       res.end(context)
   })
   ```



3. 启动服务器

   调用`.listen方法`

   ```js
   //.listen(端口号,cell回调)方法,即可启动服务器
   serve.listen(80,() => {
       console.log('服务器已经启动了')
   })
   ```



## 模块化

大文件拆成独立且互相依赖的多个小模块



### module对象与module.exports

1. 每个 **.js** 文件自定义模块,都有**module对象**,存储了当前模块信息
2. module.exports是对外提供模块的对象.别人可以使用require去导入,模块对象 **(注意require得到的是module.exports对象而不是exports,容易使用误区,所以只使用module.exports或exports其中一个)**
3. module.exports可以简写为exports
4. module.exports最终只是指的是最新的对象





## npm与包

https://www.npmjs.com/ 全球最大的包共享平台



npm为包管理工具,Node.js自带npm



### 包管理配置

- 项目不上传node_modules_library文件模块(因为太大了,客户可以自己去根据package 'npm i' 命令去自行下载

  ```
  //阻止git自行上传node_m.._lib..文件,需要创建.gitignore文件
  
  .DS_Store
  node_modules
  /dist
  ```



- 开发阶段用到的包,应该记录到devDependencies

  ```shell
  npm i express
  //默认为导入到开发阶段的包,自动记录到devDependencies
  ```



- **开发和项目用到的包,记录到dependencies**

  ```shell
  npm i express -S
  //-S参数为导入到dependenices参数中
  ```



### 全局包

> npm i 包名 -g

**注意:**

1. 只有工具性性质的包,才有全局的必要



### i5ting_toc包(工具包)

i5ting_toc可以把md文档转化为html的包

```shell
npm i i5ting_toc -g
i5ting_toc -f .md文件路径 -o 
```

