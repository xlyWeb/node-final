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


module.exports = router