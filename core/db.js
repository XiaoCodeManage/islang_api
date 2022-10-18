const Sequelize = require('sequelize')
const {
  dbName,
  host,
  port,
  user,
  password
} = require('../config/config').database
// 数据库名 数据库的账号 密码 js对象
const db = new Sequelize(dbName, user, password, {
  dialect: 'mysql',
  host,
  port,
  logging: true,
  timezone: '+08:00', // 时区
  define: {
    timestamps: true,
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    underscored: true,
    freezeTableName: true,
    scopes: {
      bh: {
        attributes: {
          exclude: ['updated_at', 'deleted_at', 'created_at']
        }
      }
    }
  }

})
db.sync({
  force: false // 中途新增表  生产环境千万不要为true
}) // 自动创建


module.exports = {
  db
}
