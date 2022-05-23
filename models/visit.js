const sequelize = require('../db/connection');
const { DataTypes } = require('sequelize');
const doctor = require('./doctor')
const patient = require('./patient')

const visitModel = sequelize.define('Visit', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
    unique: true
  },
  patient_id: {
    type: DataTypes.INTEGER,
    references: {
      model: patient,
      key: 'id',
    }
  },
  doctor_id: {
    type: DataTypes.INTEGER,
    references: {
      model: doctor,
      key: 'id',
    },
  },
  visit_date: { 
    type: DataTypes.STRING(255)
  },
  complaints: {
    type: DataTypes.STRING
  },
});

module.exports = sequelize.model('Visit', visitModel) 

