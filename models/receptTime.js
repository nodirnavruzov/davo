const sequelize = require('../db/connection');
const { DataTypes } = require('sequelize');
const recept = require('./recept')

const receptTimeModel = sequelize.define('recept_time', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  time: {
    type: DataTypes.STRING,
    allowNull: false
  },
  recept_id: {
    type: DataTypes.INTEGER,
    references: {
      model: recept,
      key: 'id',
      allowNull: false,
    }
  }
})

module.exports = sequelize.model('recept_time', receptTimeModel)