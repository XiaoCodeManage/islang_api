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
    secret: '9f52dc07cd47620c85c4a4f62daf0677',
  }
}
