const bcrypt = require('bcryptjs')

const {
  db
} = require('../../core/db')


const {
  Sequelize,
  Model
} = require('sequelize')

class User extends Model {
  // 判断账号密码是否错误
  static async verifyEmailPassword(email, plainPassword) {
    const user = await User.findOne({
      where: {
        email
      }
    })
    if (!user) {
      console.log(global.errs)
      throw new global.errs.AuthFailed('账号不存在')
    }
    // 判断密码是否正确
    const correct = bcrypt.compareSync(plainPassword, user.password)
    if (!correct) {
      throw new global.errs.AuthFailed('账号不存在')
    }
    // 通过以上判断  返回数据
    return user
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
