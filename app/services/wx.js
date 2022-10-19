const axios = require('axios')
const {
  generateToken
} = require('../../core/utils')
const User = require('../modules/user')
class WXManager {
  static async codeToToken(code) {
    let {
      appid,
      secret
    } = global.config.wx
    // openid 小程序唯一标识
    const res = await axios.get(`https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&js_code=${code}&grant_type=authorization_code`)
    if (res.status != 200) {
      throw new global.errs.AuthFailed('openid获取失败')
    }
    if (res.data.errcode != 0) { // 0为 ok
      throw new global.errs.AuthFailed('openid获取失败: ' + res.data.errcode)
    }
    // 判断openid是否存在数据库
    let user = await User.getUserByOpenid(res.data.openid)
    // 如果没有查到
    if (!user) {
      user = await User.registerByOpenid(res.data.openid)
    }
    // 通过给前端返回 token
    return generateToken(user.id, Auth.USER)
  }
}

module.exports = {
  WXManager
}
