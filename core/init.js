const Router = require("koa-router");
const requireDirectory = require("require-directory");
// 初始化管理器
class InitManager {
  static initCore(app) {
    // 入口方法
    InitManager.app = app
    InitManager.InitLoadRouters()
    InitManager.LoadHttpException()
    InitManager.loadConfig()
  }

  // 配置文件
  static loadConfig(path = '') {
    const configPath = path || process.cwd() + '/config/config.js'
    const config = require(configPath)
    global.config = config // 定义到全局
  }

  // 初始化动态路由方法
  static InitLoadRouters() {
    // 获取 api下的所有接口
    const apiDirectory = `${process.cwd()}/app/api`
    requireDirectory(module, apiDirectory, {
      visit: whenLoadModule
    })

    function whenLoadModule(obj) {
      // 如果obj实例对象的原型链是否是router
      if (obj instanceof Router) {
        InitManager.app.use(obj.routes())
      }
    }
  }

  // 全局定义初始化异常类
  static LoadHttpException() {
    const errors = require('./http-exception')
    global.errs = errors
  }
}

module.exports = InitManager
