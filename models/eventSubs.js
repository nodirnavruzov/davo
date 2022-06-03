const sequelize = require('../db/connection');
const { DataTypes } = require('sequelize');
const patient = require('./patient')

const eventSubsModel = sequelize.define('event_subs', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
    unique: true
  },
  telegram_id: {
    type: DataTypes.INTEGER,
  },
  patient_id: {
    type: DataTypes.INTEGER,
    references: {
      model: patient,
      key: 'id',
      allowNull: false
    } 
  },
});

module.exports = sequelize.model('event_subs', eventSubsModel) 
