/*
    * 2020-90-14
    * xinlaiyang
    * 向前台返回数据的简单封装
*/ 
// export default function jsonRewrite(res,ret){
//     if(typeof ret === 'undefined') {
//         res.json({
//             code:'000',
//             msg:'操作失败'
//         })
//     }else{
//         res.json(ret)
//     }
// }
module.exports = {
    jsonRewrite(res,ret){
        if(typeof ret === 'undefined') {
            res.json({
                code:'000',
                msg:'操作失败',
                status:'fail'
            })
        }else{
            res.json(ret)
        }
    }
}

