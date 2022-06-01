---
icon: 'article'
title: 'Ubuntu&MySQL常用命令'
date: 2022-05-31
category:
  - 我的辅助
tag:
  - Linux
  - 数据库
---
## Ubuntu基础命令
```shell
sudo su //进入root模式

exit //退出root模式

sudo apt update //更新系统到最新

sudo apt install xxx //安装xxx软件

mkdir xxx //创建xxx文件夹
rmdir xxx //删除xxx文件夹

touch xxx.xxx //创建xxx.xxx文件

ps ajx|grep mysql //查看进程中是否存在mysql服务

service mysql start //开启mysql服务

service mysql stop //停止mysql服务

netstat -aptn //查看所有开放端口

apt-get update //更新apt-get安装

apt-get install sysv-rc-conf

sysv-rc-conf --list //查询服务列表
```
## mysql数据库
```shell
mysql -uroot -p //在Linux上进行连接连接数据库

show databases; //显示所有数据库
show tables; //显示所有表

CREATE USER user_account IDENTIFIED BY password; //创建名为user_account的用户

> CREATE USER dbadmin@localhost  IDENTIFIED BY 'pwd123'; //这个用户只允许从`localhost`主机并使用密码为`pwd123`连接到MySQL数据库服务器
>
> CREATE USER dbadmin@192.168.1.100  IDENTIFIED BY 'pwd123'; //如果用户`dbadmin`还可以从IP为`192.168.1.100`的主机连接到MySQL数据库服务器
>
> CREATE USER superadmin@'%' IDENTIFIED BY 'mypassword'; //允许用户帐户从任何主机连接

CREATE ROLE role_account IDENTIFIED BY password; //创建名为role_account的角色


grant all privileges on `evsmc2`.* to ‘evsmc’@’%’ identified by ‘ev@z9w5’ with grant option; //添加[用户权限](https://so.csdn.net/so/search?q=用户权限&spm=1001.2101.3001.7020)，其中 esmc2(数据库的名字)，evsmc（用户名）,ev@z9w5(密码)

alter user 'test'@'%' identified with mysql_native_password BY '2914184139'; //修改加密规则

FLUSH PRIVILEGES; //刷新权限

SELECT User, Host, Password FROM mysql.user; //查询用户表


SHOW GRANTS FOR user_xxx; //查看远程登陆权限的user_xxx用户

select SUBSTRING_INDEX(host,':',1) as ip , count(*) from information_schema.processlist group by ip; //查看连接数据库的ip地址

update user set host=’%’ where user=’root’; //允许使用root账户连接的ip为任意
flush privileges; //刷新权限
```
