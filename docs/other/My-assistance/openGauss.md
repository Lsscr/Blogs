---
icon: 'article'
title: 'openGauss&CentOS常用命令'
date: 2022-05-31
category:
  - 我的辅助
tag:
  - 数据库
  - Linux
---

::: details 我自用的相关信息

lsr 用户名密码为openGauss@123

默认的 omm 超级用户不允许远程访问，需要新建用户。登陆 postgres 数据库，创建
“sfj”用户，密码为openGauss@123
:::

## CentOS相关命令
```shell
su - omm

gs_om -t status --detail命令查询openGauss各实例情况

gs_om -t start #启动opengauss数据库

gsql -d postgres -p 26000 –r

gsql -d employees -p 26000 -U lsr -W openGauss@123 -r //登录 employees 数据库
```

## opengauss基础命令
```shell
show search_path; //查看模式默认的搜索路径
SET search_path = employees; //设置模式默认的搜索路径

SELECT datname FROM pg_database; //查看所有数据库

\l //使用\l元命令查看数据库系统的数据库列表。

\d //展示数据库中的表

SELECT * FROM pg_user;//查看所有用户

SELECT * FROM PG_ROLES;//查看所有角色

drop user lsr cascade;//删除用户
```

### opengauss存储过程
```shell
//建立存储过程
CREATE OR REPLACE PROCEDURE update_manager_num
(
IN dept_id character(4)
)
IS
BEGIN
UPDATE department
SET manager_num =
(
select count(*) as manager_num
from department_manager
where department_id = dept_id
and to_date > sysdate
group by department_id
)
WHERE id= dept_id;
END;
//调用存储过程
CALL update_manager_num('d001');
CALL update_manager_num('d002');
CALL update_manager_num('d003');
CALL update_manager_num('d004');
CALL update_manager_num('d005');
CALL update_manager_num('d006');
CALL update_manager_num('d007');
CALL update_manager_num('d008');
CALL update_manager_num('d009');
```

### opengauss触发器
```shell
//设计触发器
CREATE OR REPLACE FUNCTION
tri_insert_func()
RETURNS TRIGGER AS $$ DECLARE
BEGIN
UPDATE department SET employees_num=employees_num+1
//NEW.department_id为插入数据的属性
WHERE department.id=NEW.department_id;
RETURN NEW;
END;
$$ LANGUAGE PLPGSQL;

//创建触发器
CREATE TRIGGER after_insert_department_employee
AFTER INSERT ON department_employee
FOR EACH ROW
EXECUTE PROCEDURE tri_insert_func() ;

insert into department_employee values(10001,'d006','2000-12-
12','9999-01-01');

//删除触发器
DROP TRIGGER [ IF EXISTS ] trigger_name ON table_name；
drop trigger after_update_department_employee ON department_employee;
```
[相关资料](https://juejin.cn/post/7032310199989829662)

### opengauss管理权限
```shell
#创建薪资管理人员角色
CREATE ROLE role_salary WITH PASSWORD "openGauss@123";
#创建管理人员用户2人
CREATE USER salary1 WITH PASSWORD "openGauss@123";
CREATE USER salary2 WITH PASSWORD "openGauss@123";
#赋予角色权限
gsql -d employees -p 26000 -U lsr -W openGauss@123 -r
SET search_path = employees;
GRANT USAGE ON SCHEMA employees TO role_salary;
GRANT SELECT,INSERT,UPDATE ON TABLE salary to role_salary;
GRANT USAGE, SELECT ON SEQUENCE id_employee_seq TO role_salary;
GRANT SELECT ON TABLE employee to role_salary;
\q
gsql -d postgres -p 26000 -r
GRANT role_salary TO salary1;
GRANT role_salary TO salary2;
#测试
\q
gsql -d employees -p 26000 -U salary1 -W openGauss@123 -r
SET search_path = employees;
select * from employee limit 10;
//原来amount为60117
update salary set amount=60000 where from_date='1986-06-26' and employee_id=10001;
select * from salary limit 10;
#下面语句不会成功
select * from department limit 10;
```
