const db = require('../../core/db')
const {
  Sequelize,
  Model
} = require("sequelize");

const classicFields = {
  image: Sequelize.STRING,
  content: Sequelize.STRING,
  pubdate: Sequelize.DATEONLY,
  fav_nums: Sequelize.INTEGER,
  type: Sequelize.TINYINT
}

class Movie extends Model {

}
Movie.init(classicFields, {
  sequelize: db,
  tableName: 'movie'
})

class Sentence extends Model {

}
Sentence.init(classicFields, {
  sequelize: db,
  tableName: 'sentence'
})

class Music extends Model {

}
Music.init(Object.assign({
  url: Sequelize.STRING,

}, classicFields), {
  sequelize: db,
  tableName: 'music'
})
