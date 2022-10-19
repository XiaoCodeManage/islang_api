const Router = require('koa-router')
const router = new Router({
  prefix: '/v1/classic'
})
const {
  PositiveIntegerValidator
} = require('../../validators/validator')
const {
  Auth
} = require('../../../middlewares/auth')


router.get('/latest', new Auth(8).m, async (ctx, next) => {
  // const v = await new PositiveIntegerValidator().validate(ctx)
  // const id = v.get('path.id', parsed = false)

  // 拿到用户id, 查询用户数据
  // 限制 token 角色
  ctx.body = ctx.auth.uid
})

module.exports = router
