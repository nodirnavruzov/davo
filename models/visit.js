const sequelize = require('../db/connection');
const { DataTypes } = require('sequelize');
const doctor = require('./doctor')
const patient = require('./patient')

const visitModel = sequelize.define('visit', {
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
      allowNull: false,
    }
  },
  doctor_id: {
    type: DataTypes.INTEGER,
    references: {
      model: doctor,
      key: 'id',
      allowNull: false,
    },
  },
  visit_date: { 
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  complaints: {
    type: DataTypes.STRING
  },
});

module.exports = sequelize.model('visit', visitModel) 

