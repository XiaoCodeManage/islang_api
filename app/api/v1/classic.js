const Router = require('koa-router')
const router = new Router()
const {
  PositiveIntegerValidator
} = require('../../validators/validator')
router.post('/v1/:id/classic/latest', async (ctx, next) => {
  const v = await new PositiveIntegerValidator().validate(ctx)
  const id = v.get('path.id', parsed = false)
  ctx.body = 'success'
})

module.exports = router
