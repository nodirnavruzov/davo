const sequelize = require('../db/connection');
const { DataTypes } = require('sequelize');

const pillsModel = sequelize.define('Pills', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
    unique: true
  },
  type: {
    type: DataTypes.STRING(255)
  },
  name: {
    type: DataTypes.STRING(255)
  },
});

module.exports = sequelize.model('Pills', pillsModel) 
