const express = require('express')
const router = express.Router()
const consumer = require('../controllers/user/user')

// router.get('/consumerList',(req,res,next)=>{
//     consumer.consumerList(req,res,next)
// })
// 用户列表
router.get('/consumerList',consumer.consumerList)
// 新增用户
router.post('/consumerAdd',consumer.consumerAdd)
// 删除用户
router.delete('/consumerDelete',consumer.consumerDelete)
// 根据id 查找用户，用于修改
router.get('/consumerInfo',consumer.consumerListById)
// 更新用户
router.put('/consumerUpdate',consumer.consumerUpdate)

module.exports = router