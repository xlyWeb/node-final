const userSql = {
    queryAll: 'select * from user',   // 查询所有用户
    queryById: 'select * from  user where id=?',  // 通过用户名索引查询用户
    queryByNamePassword: 'select * from  user where username=? and password=?',  // 通过用户名和密码索引查询用户
    insert: 'insert into user (username,age,address,password,phone,job,time)values(?,?,?,?,?,?,?) ',  // 插入新用户
    updateUser: 'update user set username=?, age=?,address=?,password=?,phone=?,job=?,time=? where id=?',// 更新用户信息
    deleteUser: 'delete from user where id=?' // 删除用户
}

module.exports = userSql 