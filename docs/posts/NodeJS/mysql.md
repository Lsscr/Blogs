---
order: 5
icon: page
date: 2022-06-01
category:
  - 后端
tag:
  - NodeJS
  - 数据库
---

# 项目中的MySql

## 配置mysql模块
`相关重要信息可以放在 .env 环境文件中,如SSH连接,密码等`
```js
//导入mysql模块
const mysql = require('mysql')
//建立与MySQL数据的连接池
const db = mysql.createPool({
    host : '127.0.0.1',//数据库的IP
    user:'root',//登录数据库的账号
    password:'密码',//登录数据库的密码
    database:'db_test'//要操作的数据库
})
```



## 相关操作



### 查询数据 select 语句返回的是数组

```js
db.query("select * from users",(err,results) => {
    //查询失败,打印失败的原因
    if(err) return console.log(err.meassage)
    //查询成功,返回数组
    console.log(results)
})
```



### 插入数据

```js
const Str = {username:'root',id:'XXXX26'}

db.query('insert into db set ?',Str,(err,results) => {
    //查询失败,打印失败的原因
    if(err) return console.log(err.message)
    //查询成功
    if(results.affectedRows === 1)
        console.log('添加成功')
})
```



### 更新数据

```js
const Str = {id:2,username:"xxx",status:'x'}

db.query('update db set ? where id =  ?',[Str,Str.id],(err,res) => {
    if(err) return console.log(err.message)
    if(res.attectedRows === 1) console.log('更新成功')
})
```



## 前后端身份认证

### Web开发模式

#### Web开发(前后端分离)

​	**后端只负责提供API接口,前端使用Ajax调用接口**的开发模式



#### 选择Web开发模式

- 主要功能为展示没有复杂的交互，可以选择服务器渲染
- 类似于后台管理，交互强，选择前后端分离开发模式



### 身份认证

- **服务端渲染，推荐Session认证(非跨域请求,需要cookied,信息保存到服务器端)**
- **前后端分离，推荐JWT认证(跨域请求,生成Token,数据保存到客户端)**



#### Express中使用Session认证(非跨域请求,需要cookied)

```js
//导入session中间件
var session = require('express-session')
//配置Session中间件
app.use(session({
    secret : "Keyboard cat",//任意字符串
    resave: false,//固定写法
    saveUninitialized : true//固定写法
}))
```



##### 从session中存数据

```js
app.post('/api/test',(res,req) => {
    //获取请求信息
    var body = req.body
    //存储到session中
    req.session.user = body //用户信息
    req.session.islogin = true //用户登录状态
    res.send({status:200,msg:'登录成功'})
})
```



##### 从session中存数据

```js
app.get('api/post',(res,req) => {
    if(!req.session.islogin){
        return res.send({status:0,msg:'未登录账号'})
    }
    res.send({status:200,msg:'登录成功'})
})
```



##### 清空session(当用户进行退出时)

```js
//退出登录接口
app.get('/api/logout',(res,req) => {
    //清空当前客户端对应的 session 信息
    req.session.destroy()
    res.send({status:0,meg:'退出成功'})
})
```



#### Express中使用JWT认证(跨域请求,生成Token(不要加密密码到Token中))

##### 安装相关依赖包

```shell
//需要两个安装包
npm i jsonwebtoken express-jwt
//jsonwebtoken 生成JWT字符串
//express-jwt 将JWT字符串还原为JSON对象
```



##### 登录成功后的JWT字符串

```js
const secretKey = "自定义加密字符串"
//登录接口
app.post('api/login',(res,req) => {
    //...省略失败的情况
    res.send({
        status:200,
        message:'登录成功',
        //三个参数分别是:用户信息对象,加密密钥,配置对象(配置对象中的expireIn为有效期)
        token:jwt.sign({username : res.body.usename},secretKey,{expiresIn:'30s'})
    })
})
```



##### JWT还原为JSON对象(配置好中间后,用户数据自动配置到req.user)

```js
//注册为中间件.expressJWT({secret:secretKey})解析Token中间
// .unless({path : [/^\/api\//] })用来指定那些接口不需要访问权限(一般为登录和注册接口)
app.use(expressJWT({secret : secretKey}).unless({path: [/^\/api\//] }))
```



##### 配置全局捕获JWT失败产生的错误

```js
//如果Token字符串过期或不合法,就是产生错误
app.use((err,req,res,next) => {
    //token解析失败错误
    if(err.name === 'UnauthorizedError'){
        return res.send({status:401,meg:'无效的Token'})
    }
    //其他原因的错误
    res.send({status:500,msg:'未知错误'})
})
```

