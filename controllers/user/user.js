/* 
 * 2020-09-14
 * xinlaiyang
 * consumer 
 * 对象中包含基本属性，由于获取基本信息
 */
const {
    pool,
    router,
    resJson
} = require("../../config/sql");
const userSQL = require("../../sql/consumer/user");
const _JSON = require('../../config/util');
const sql = require("../../config/sql");
const {
    query
} = require("express");

let consumer = {
    consumerList(req, res, next) {
        /*
         * 查找全部
         * 条件查询
         * 分页
         */
        let param = req.query
        let arr = []
        let a = Object.values(param).filter(item=>{
            return item !== ''
        })
        if (a.length === 2) {
            let sql = 'select * from user limit ?'
            let num = parseInt(param.pageIndex) * parseInt(param.pageSize)
            arr.push(num)
            pool.getConnection((err, conn) => {
                conn.query(userSQL.queryAll, arr, (err, result) => {
                    if (result) {
                        result = {
                            code: '200',
                            msg: '操作成功',
                            status: 'success',
                            data: {
                                consumer: _JSON.editRes(result,param.pageIndex,param.pageSize),
                                page:{
                                    pageIndex:parseInt(param.pageIndex),
                                    pageSize:parseInt(param.pageSize),
                                    total: result.length
                                }
                            }
                        }
                    }
                    _JSON.jsonRewrite(res, result)
                    conn.release()
                })
            })
        } else if(a.length > 2) {
            pool.getConnection((err, conn) => {
                let sql = 'select * from user where 1=1'

                let arr = []
                if (param.name != '') {
                    name = '%' + param.name + '%';
                    sql += ' and username like ? ';
                    arr.push(name)
                }
                if (param.age != '') {
                    age = '%' + param.age + '%';
                    sql += ' and age like ? ';
                    arr.push(age)
                }
                if (param.date != '') {
                    date = '%' + param.date + '%';
                    sql += ' and date like ? ';
                    arr.push(date)
                }
                if (param.address != '') {
                    address = '%' + param.address + '%';
                    sql += ' and address like ? ';
                    arr.push(address)
                }
                if (param.job != '') {
                    job = '%' + param.job + '%';
                    sql += ' and job like ? ';
                    arr.push(job)
                }
                if (param.phone != '') {
                    phone = '%' + param.phone + '%';
                    sql += ' and phone like ? ';
                    arr.push(phone)
                }
                sql += 'limit ?,?'
                arr.push((param.pageIndex - 1) * param.pageSize, parseInt(param.pageSize))
                conn.query(sql, arr, (err, result) => {
                    if (result) {
                        result = {
                            code: '200',
                            msg: '操作成功',
                            status: 'success',
                            data: {
                                consumer:_JSON.editRes(result,param.pageIndex,param.pageSize),
                                page:{
                                    pageIndex:parseInt(param.pageIndex),
                                    pageSize:parseInt(param.pageSize),
                                    total: result.length
                                }
                            }
                        }
                    }
                    _JSON.jsonRewrite(res, result)
                    conn.release()
                })
            })
        }
    },
    consumerAdd(req,res,next){
        /*
            *  新增
            *  post
        */ 
       let param = req.body
       arr = [param.username, param.age, param.address, param.address, param.phone, param.job, param.time.split('T')[0]]
       let status =  arr.some(ele => {
           return ele !== ''
       });
       console.log(arr)

       if(status) {
            pool.getConnection((err,conn)=>{
                conn.query(userSQL.insert,arr,(err,result)=>{
                    console.log(err,result)
                    if(result) {
                        result = {
                            code:'200',
                            msg:'操作成功',
                            status:"success"
                        }
                    }
                    _JSON.jsonRewrite(res, result)
                    conn.release()
                })
            })
       }
       
    },
    consumerDelete(req,res,next){
        let param = req.query
        pool.getConnection((err,conn)=>{
            conn.query(userSQL.deleteUser,param.id,(err,result)=>{
                if(result) {
                    result = {
                        code:'200',
                        msg:'操作成功',
                        status:'success'
                    }
                }
                _JSON.jsonRewrite(res, result)
                    conn.release()
            })
        })
    },
    consumerListById(req,res,next){
        let params = req.query
        pool.getConnection((err,conn)=>{
            conn.query(userSQL.queryById,params.id,(err,result)=>{
                if(result){
                    result = {
                        code:'200',
                        msg:'操作成功',
                        status:'success',
                        data:{
                            consumerInfo:result[0]
                        }
                    }
                }
                _JSON.jsonRewrite(res, result)
                conn.release()
            })
        })
    },
    consumerUpdate(req,res,next) {
        let param = req.body
        pool.getConnection((err,conn)=>{
            conn.query(userSQL.updateUser,[param.username, param.age, param.address,param.password,param.phone,param.job,param.time,param.id],(err,result)=>{
                if(result) {
                    result = {
                        code:'200',
                        msg:'操作成功',
                        status:'success'
                    }
                }
                _JSON.jsonRewrite(res, result)
                conn.release()
            })
        })
    }

}

module.exports = consumer