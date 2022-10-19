// 配置文件
module.exports = {
  // prod
  environment: 'dev',
  database: {
    dbName: 'islang',
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '123'
  },
  security: {
    secretKey: 'abcdefg', // 秘钥
    expiresIn: 60 * 60 * 24 * 30
  },
  wx: {
    appid: 'wxbcc06f0ee1d3456f',
    secret: '88c5b33032d7c98ae9166651c110c7a9',
  }
}
