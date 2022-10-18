const bcrypt = require('bcryptjs')
const Router = require('koa-router')
const {
  User
} = require('../../modules/user')
const router = new Router({
  prefix: '/v1/user'
})
const {
  RegisterValidator
} = require('../../validators/validator')
// 注册
router.post('/register', async (ctx) => {
  const v = await new RegisterValidator().validate(ctx)
  const user = {
    email: v.get('body.email'),
    password: v.get('body.password2'), // 加密过后的密码
    nickname: v.get('body.nickname'),
  }
  await User.create(user)
  // 返回成功
  throw new global.errs.Success()
})

module.exports = router
