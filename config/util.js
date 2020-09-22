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
    },


    /*
        用于分页操作
        根绝穿过的下标和大小 来确定返回参数大小
    */ 
    editRes(arr,i,size){
        let newarr = arr.filter((item,index)=>{
            return  ((i-1)*size)< index < (i*size)
        })   
        return newarr
    }
}



