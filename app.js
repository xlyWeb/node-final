const { app, pool } = require("./config/sql");
const CONSUMER = require("./router/user");

app.all("*", (req, res, next) => {
  // 这里处理全局拦截，一定要写在最上面
  next();
});

// app.get('/',(req,res)=>{
//     console.log(__dirname,'diename')
//     res.sendFile(__dirname+'/'+'index.html')
// })
app.all("/", (req, res) => {
  pool.getConnection((err, conn) => {
    res.json({ type: "test" });
    pool.releaseConnection(conn); // 释放连接池，等待别的连接使用
  });
});

app.all("*", (req, res, next) => {
  // 设置跨域访问
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header("X-Powered-By",' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

app.use("/user", CONSUMER);
// app.use("/manage",MANAGE);
// app.use("/chart",ECHART);
// app.listen(8001,'192.168.42.206', () => {
//   console.log("服务启动", "localhost:8001");
app.listen(8001,'10.18.0.60', () => {
  console.log("服务启动", "10.18.0.60:8001");
});
