const mysql = require('mysql')
const express = require('express')
const app = express()
const router = express.Router()

// 解析参数
const bodePrase = require('body-parser')
const bodyParser = require('body-parser')
// json  请求
app.use(bodyParser.json())


const option = {
    host: 'localhost',
    user: 'root',
    password: '880306',
    port: '3306',
    database: 'xlydata',
    multipleStatements: false,//是否允许一个query中包含多条sql语句
    connectTimeout: 5000, //连接超时
}

let pool;
repool();
function res({code=200,msg='',data={}}){
    this.code = code
    this.msg = msg
    this.data = data
}
function resJson(_res,result){
    return _res.json(new res(result))
}
// 断线重连机制
function repool(){
    // 创建连接池
    pool = mysql.createPool({
        ...option,
        waitForConnections: true, //当无连接池可用时，等待（true）还是抛错（false）
        connectionLimit:100, // 最大连接数
        queueLimit: 0 //最大连接等待数（0 为没有限制）
    })
    pool.on('error',err=>{
        err.code === 'PROTOCOL_CONNECTION_LOST' && setTimeout(repool, 2000);
    })
    app.all('*',(_,__,next)=>{
        pool.getConnection(err=>{
            err && setTimeout(repool, 2000) || next()
        })
    })
}



module.exports = { app, pool, router, resJson }