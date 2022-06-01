---
order: 2
icon: page
date: 2022-06-01
category:
  - 后端
tag:
  - NodeJS
---

# NodeJS内置的API

## fs文件系统模块

> fs模块用来操作文件模块

例如：

- **fs.readFile()** **读取**文件内容
- **fs.writeFile()** **写入**文件内容



**使用模块，需要进行导入**

例如:

```js
const fs = require('fs')
```





### 读取文件内容

> fs.readFIle(path[, options], callback)

- path为路径
- options编码格式 (一般默认utf8)
- callback回调函数

实例：

```js
const fs = require('fs')
fs.readFile('./files/data.txt','utf8',function(err,res){
    console.log(err)
    //如果读取成功err为null,否者为错误对象
    console.log(res)
    //res成功为数据,否者为undefined
})
```

另一种写法:

```js
const fs = require('fs')
fs.readFile('./files/data.txt','utf8',function(err,res){
    if(err){
        return console.log('读取文件失败'+err.message)
    }else{
        console.log('读取文件成功'+res)
    }
})
```



### 写入文件内容

> fs.writeFile(file, data[, options], callback)

- file文件路径
- data为写入内容
- options文件格式 (默认为utf8)
- callback回调函数

实例:

```js
const fs = require('fs')
fs.writeFile('./files/data.txt','Hello world','utf8',function(err){
    console.log(err)
    //err成功为null,否者为错误对象
    //所以可以有另一种写法
})
```

另一种写法

```js
const fs = require('fs')
fs.writeFIle('./files/data.txt','Hello World',function(err){
    if(err){
        return console.log('写入失败' + err.message)
    }
    console.log('写入成功')
})
```



### fs模块相关问题

#### 路径动态拼接问题

> 在使用fs模块,路径是以./或是../开头的相对路径,容易出现动拼接问题.

##### 原因:执行node命令在的目录

##### 方案:直接提供完整路径 __dirname

使用 __dirname 表示当前文件所处的目录





## path路径模块

### 路径拼接

path.join()

```js
const pathStr = path.join(__dirname,'./files/1.txt')

//输出为文件目录下的/files/1.txt文件
```



### 获取路径中的文件名与文件扩展名

path.basename()

path.extname()

```js
const pathStr = '/a/b/c/index.html'

var name = path.basename(pathStr)
//name输出为index.html

var ext = path.extname(pathStr)
//输出为html
```

