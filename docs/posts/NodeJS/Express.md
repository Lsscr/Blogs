---
order: 4
icon: page
date: 2022-06-01
category:
  - 后端
tag:
  - NodeJS
---

# Express模块

> 类似于node内置的http模块,都是专门创建Web服务器的

常见两种服务器

- Web网站服务器
- API接口服务器

Express可以创建Web网站或是API接口


## Express基本使用

1. 导入Express包

   ```js
   const express = require('express')
   ```

2. 创建Web服务器

   ```js
   const app = express()
   ```



### 监听Get和Post请求

> **get请求一般用来请求获取数据**
>
> **post请求一般作为发送数据到后台，传递数据，创建数据**

- 监听Get方法,并响应(**响应使用res.send方法,获取客户端查询参数使用req.query对象,获取客户端动态参数req.params对象**)

  ```js
  app.get('请求路径/:id/:text',function(res,req) => {
  //req.params获取:后的动态参数
          var num = req.params.id
          var name = req.params.text
  //响应为JSON对象
  res.send({name:'Lsr',age:18})
  })
  ```

- 监听Post方法,并响应

  ```js
  app.post('请求路径',function(res,req){
      //req.query获取请求相关查询参数
      var name = req.query.name
      var age = req.query.age
      //响应文本
      res.send("响应成功")
  })
  ```



### 监听端口并启动服务器

对端口进行监听并启动Web服务器

```js
app.listen(端口号,(回调函数) => {
    console.log("message")
})
```



### 注册全局中间件

```js
app.use(中间件)
```



### 托管静态资源

express.static方法,可以创建一个静态资源服务器.可将public下的图片,css文件js文件对外开放

```js
app.use(express.static('public'))
//访问不需要前缀
```



#### 挂载路径前缀

```js
app.use('/public',express.static('./public'))
//访问需要进行前缀
```



### nodemon小工具(全局安装)

> nodemon自动监听项目文件的变化,如果文件变化,小工具会自动重启项目

安装小工具

```shell
npm i nodemon -g
```

使用小工具开始监听

```shell
nodemon 文件名.js
```



### Express中的路由

Express中,路由是**客户端请求**与**服务器处理函数**的**映射关系**

Express有**请求类型**,**请求URL地址**,**处理函数**构成

```js
app.METHOD(PATH,HANDLER)
//METHOD为请求类型
//PATH为URL地址
//HANDLER为处理函数
```

##### 路由匹配过程

> 每一个请求到达服务器后,需要经过路由的匹配,才去调用相应的处理函数

1. 按照定义先手顺序匹配
2. 请求类型与请求地址要两个匹配才可以调用处理函数



#### Express路由模块化封装

> 方便对路由管理,需要模块化封装,推荐路由抽离为单独的模块

步骤:

1. 创建**路由模块**对应的.js文件
2. 调用**express.Router()**函数创建路由对象
3. 路由对象上挂载具体的路由
4. 使用**module.exports**向外共享路由
5. 使用**app.user()**函数注册路由模块

```js
// 路由模块 MyRouter.js
const express = require('express')
const router = express.Router()
//定义具体的路由
router.get('/goods/:id/infos',function(res,req){
    var id = req.params.id
    res.send(id)
})
...
//向外共享路由
module.exports = router
```



##### 路由模块添加前缀

> 类似于静态托管资源,需要对资源模块进行添加前缀,方便统一访问





## Express中间件

流程中的中间处理环节

请求到达Express的服务器后,会调用多个中间件,对请求进行预处理,再去进行匹配路由才去响应.



#### 中间件与路由处理函数的区别

Express的中间**本质上**是**一个function函数**

![image-20220524003809788](/nodejs/img1.png)

**中间件函数的形参必须包含next函数**,**而路由处理函数只包含req和res**

##### **next函数**是实现**多个中间件连续调用的关键**,它结果转交给下一个**中间件**或**路由**

##### 多个中间件都是同一个res,req.对中间件进行数据的挂载,后个中间件可以拿到前面中间件的数据.



### 全局生效的中间件

任何请求**都会触发的中间件**

```js
//定义一个常量中间件,赋值个new变量
const nw = function(req,res,next){
    console.log('这是一个中间件')
    next()
}

//进行注册全局生效的中间件
app.use(nw)
```



### 局部生效的中间件

**不使用app.use()定义的中间**

```js
//定义中间件
const nw = function(req,res,next){
    console.log('这是局部中间件')
    next()
}

//nw只在局部生效的用法
app.get('/',[nw,'多个中间件'],function(res,req){
    res.send('响应成功')
})
```



### 5大类常见的中间件的用法

1. **应用级别的**

   通过app.use()或app.get()或app.post().**绑定到app实例上的中间件**

2. **路由级别的**

   使用router.use(),**绑定到router实例上的中间件**

3. **错误级别的**

   错误级别的中间件在function函数中是有4个参数.分别是(err,req,res,next)

   **自定义抛出错误,在全局中间件进行注册**

4. **Express内置的**

    - express.static内置的中间件(HTML文件,图片,CSS样式等)

    - express.json(解析JSON数据)

    - express.urlencoded(解析URL-encodded格式)

      ```js
      const express = require('express')
      app.use(express.urlencoded({extended:false}))
      ```



5. **第三方的**

    - npm i 下载的中间件
    - 使用require导入中间件
    - 使用app.use()注册的中间件

#### 解析表单数据中间件

- npm i body-parser

  ```js
  const parser = require('body-parser')
  app.use(parser.urlencoded({extended : false }))
  ```



### 自定义中间件



## Express编写接口



### 创建基本服务器

```js
//导入express模块
const express = requier('express')
//创建express实例对象
const app = express()

//开启监听,并启动Web服务器
app.listen(80,function(){
    console.log('正在监听ing')
})
```



### 创建API路由模块

```js
//导入express中的路由模块,自定义API模块
const express = require('express')
const apiRouter = express.Router()

//导出路由模块
module.exports = apiRouter

//在app.js中进行注册
const api = require('./api.js')
app.use('/api',api)
```



### 编写相关接口



#### 编写GET接口

```js
apiRouter.get('/get',(req, res) =>{
    //获取客户端通过查询字符串,发送到服务器数据
    const query = req.query
    //调用res.send方法,数据响应客户端
    res.send({
        status:200, //响应状态
        msg: '请求成功', //状态描述
        data: query //要响应的数据
    })
})
```



#### 编写POST接口

```js
apiROuter.post('/post',(req,res) => {
    const body = req.body
    res.send({
        status : 200,
        msg : '请求成功',
        data : body
    })
})
```



#### CORS跨域资源共享

**一般不支持跨域资源请求**

> 终端会报错:
>
> No ‘Access-Control-Allow-Oriigin’ header



#### 解决办法

​	CORS方案

​	**cors是Express的第三方中间件**

1. 下载安装中间件后，const cors = require('cors')//导入中间
2. 路由前,调用中间件函数 app.use(cors()) 配置中间件

