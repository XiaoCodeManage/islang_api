const db = require('../../core/db')
const {
  Sequelize,
  Model
} = require("sequelize");


class Flow extends Model {

}
Flow.init({
  index: Sequelize.INTEGER,
  artId: Sequelize.INTEGER,
  type: Sequelize.INTEGER
}, {
  sequelize: db,
  tableName: 'flow'
})
