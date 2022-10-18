const Router = require('koa-router')
const {
  TokenValidator
} = require('../../validators/validator')
const {
  LoginType
} = require('../../lib/enum')
const {
  User
} = require('../../modules/user')
const router = new Router({
  prefix: '/v1/token'
})

router.post('/', async (ctx) => {
  const v = await new TokenValidator().validate(ctx)

  switch (v.get('body.type')) {
    case LoginType.USER_EMAIL:
      emailLogin(v.get('body.account'), v.get('body.secret')) // 调用判断账号密码是否正确
      break;
    case LoginType.USER_MINI_PROGRAM:
      break;
    default:
      throw new global.errs.ParameterException('没有相应处理函数')
  }
})

async function emailLogin(account, secret) {
  // 判断账号密码是否错误
  const user = User.verifyEmailPassword(account, secret)
}

module.exports = router
