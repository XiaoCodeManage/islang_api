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
const {
  generateToken
} = require('../../../core/utils')
const router = new Router({
  prefix: '/v1/token'
})
const {
  Auth
} = require('../../../middlewares/auth')
const {
  WXManager
} = require('../../services/wx')

// 登录获取token
router.post('/', async (ctx) => {
  const v = await new TokenValidator().validate(ctx)
  let token;
  switch (v.get('body.type')) {
    case LoginType.USER_EMAIL:
      // await emailLogin(v.get('body.account'),
      //   v.get('body.secret'))
      const user = await User.verifyEmailPassword(v.get('body.account'), v.get('body.secret'))
      if (user === 0) {
        throw new global.errs.AuthFailed('账号或密码不正确')
      } else {
        // 生成token  用户id, 权限数字
        token = generateToken(user.id, Auth.USER)
      }
      break
    case LoginType.USER_MINI_PROGRAM:
      // 传递 微信服务器返回的code
      token = await WXManager.codeToToken(v.get('body.account'))
      break
    case LoginType.ADMIN_EMAIL:
      break
    default:
      throw new global.errs.ParameterException('没有相应的处理函数')
  }
  ctx.body = {
    token
  }
})

// async function emailLogin(account, secret) {
//   // 判断账号密码是否错误
//   const user = User.verifyEmailPassword(account, secret)
// }

module.exports = router
