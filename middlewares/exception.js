const {
  HttpException
} = require('../core/http-exception')
// 全局异常处理
const catchError = async (ctx, next) => {
  try {
    console.log(111)
    await next()
  } catch (error) {
    // 开发环境
    const isHttpException = error instanceof HttpException
    const isDev = global.config.environment === 'dev'
    // 如果是开发环境 不是HttpException这个类处理的 就直接报错
    if (isDev && !isHttpException) {
      throw error
    }
    // 生产环境
    // 已知错误
    if (isHttpException) {
      ctx.body = {
        msg: error.msg,
        errorCode: error.errorCode,
        request: `${ctx.method} ${ctx.path}`
      }
      ctx.status = error.code
    } else {
      // 未知异常
      ctx.body = {
        msg: 'we made a mistake',
        errorCode: 999,
        request: `${ctx.method} ${ctx.path}`
      }
      ctx.status = 500
    }
  }
}


module.exports = catchError
