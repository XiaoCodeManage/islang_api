const {
  HttpException
} = require('../core/http-exception')
// 全局异常处理
const catchError = async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    // 已知错误
    if (error instanceof HttpException) {
      ctx.body = {
        msg: error.msg,
        errorCode: error.errorCode,
        request: `${ctx.method} ${ctx.path}`
      }
      ctx.status = error.code
    }
  }
}


module.exports = catchError
