const Router = require('koa-router')
const router = new Router()
router.post('/classic/latest', (ctx, next) => {
  const query = ctx.req.query
  if (true) {
    // 全局报错
    const error = new global.errs.ParameterException()
    throw error
  }
  ctx.body = '/classic/latest'
})

module.exports = router
