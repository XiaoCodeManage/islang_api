const basicAuth = require('basic-auth')
const jwt = require('jsonwebtoken')
class Auth {
  constructor(level) {
    this.level = level || 1
    Auth.USER = 8 // 用户
    Auth.ADMIN = 16 // 管理员
    Auth.SUPER_ADMIN = 32 // 超级管理员
  }

  get m() {
    return async (ctx, next) => {
      // token检查 通用的基本身份验证授权标头字段解析器。
      const userToken = basicAuth(ctx.req);
      let errMsg = 'token不合法'
      // token 不合法
      if (!userToken || !userToken.name) {
        throw new global.errs.Forbbiden(errMsg)
      }
      try {
        // 效验token令牌  成功返回用户的id和自定义
        var {
          uid,
          scope
        } = jwt.verify(userToken.name, global.config.security.secretKey)
      } catch (error) {

        // token 过期
        if (error.name == 'TokenExpiredError') {
          errMsg = 'token过期'
        }
        // token 不合法
        throw new global.errs.Forbbiden(errMsg)
      }

      if (scope < this.level) {
        errMsg = '权限不足'
        throw new global.errs.Forbbiden(errMsg)
      }
      // 通过挂载到ctx
      ctx.auth = {
        uid,
        scope
      }
      await next()
    }
  }

  // 验证token是否合法
  static verifyToken(token) {
    try {
      jwt.verify(token, global.config.security.secretKey)
      return true
    } catch (err) {
      return false
    }
  }
}


module.exports = {
  Auth
}
