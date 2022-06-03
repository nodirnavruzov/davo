const sequelize = require('../db/connection');
const { DataTypes } = require('sequelize');
const doctor = require('./doctor')
const patient = require('./patient')
const pills = require('./pill')

const receptModel = sequelize.define('recept', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
    unique: true
  },
  pill_id: {
    type: DataTypes.INTEGER,
    references: {
      model: pills,
      key: 'id',
      allowNull: false
    }
  },
  patient_id: {
    type: DataTypes.INTEGER,
    references: {
      model: patient,
      key: 'id',
      allowNull: false
    } 
  }, 
  doctor_id: {
    type: DataTypes.INTEGER,
    references: {
      model: doctor,
      key: 'id',
      allowNull: false
    }
  },
  start_date: {
    type:  DataTypes.STRING
  },
  end_date: {
    type:  DataTypes.STRING
  },
  quantity: {
    type: DataTypes.STRING(255)
  },
  description: {
    type: DataTypes.STRING(255)
  },
});


module.exports = sequelize.model('recept', receptModel) 
