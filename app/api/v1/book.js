const Router = require('koa-router')
const router = new Router()

router.get('/book/latest', (ctx, next) => {
  ctx.body = '/book/latest'
})

module.exports = router
