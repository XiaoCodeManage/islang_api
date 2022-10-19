const bcrypt = require('bcryptjs')

const {
  db
} = require('../../core/db')


const {
  Sequelize,
  Model
} = require('sequelize')

class User extends Model {
  // 判断emial登录是否正确
  static async verifyEmailPassword(email, plainPassword) {
    const user = await User.findOne({
      where: {
        email
      }
    })
    if (!user) {
      // throw new Error('账号不存在')
      return 0
    }
    const correct = bcrypt.compareSync(
      plainPassword, user.password)
    if (!correct) {
      // throw new global.errs.AuthFailed('密码不正确')
      return 0
    }
    return user
  }

  // 判断微信登录是否正确
  static async getUserByOpenid(openid) {
    // 查询openid 是否存在 没有加入
    const user = await User.findOne({
      where: {
        openid
      }
    })
    return user
  }
  // 如果查询数据库没有openid 说明是新用户 注册一个
  static async registerByOpenid(openid) {
    return await User.create({
      openid
    })
  }
}

User.init({
  // 主键 关系型数据库
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true, // 自动id自增长
  },
  nickname: Sequelize.STRING,
  email: Sequelize.STRING,
  password: {
    type: Sequelize.STRING,
    set(val) {
      const salt = bcrypt.genSaltSync(10)
      const psw = bcrypt.hashSync(val, salt)
      // 在数据库中以明文形式存储密码是很糟糕的.
      // 使用适当的哈希函数来加密哈希值更好.
      this.setDataValue('password', psw)
    }
  },
  openid: {
    type: Sequelize.STRING(64),
    unique: true
  }
}, {
  sequelize: db,
  tableName: 'user'
})

module.exports = {
  User
}
