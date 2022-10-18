const Koa = require('koa')
const app = new Koa()
const parser = require('koa-bodyparser') // 解析 body
const InitManager = require('./core/init')
const catchError = require('./middlewares/exception')
app.use(catchError)
app.use(parser())
InitManager.initCore(app) // 传入 app 实例 初始化
app.listen(3000, () => {
  console.log('127.0.0.1:3000')
})
