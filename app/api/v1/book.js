const Router = require('koa-router')
const router = new Router()

router.get('/book/latest', (ctx, next) => {
  throw new Error('哈哈哈')
  // ctx.body = '/book/latest'
})

module.exports = router
