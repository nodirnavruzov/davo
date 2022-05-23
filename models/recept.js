const sequelize = require('../db/connection');
const { DataTypes } = require('sequelize');
const Doctor = require('./doctor')
const Patient = require('./patient')
const Pills = require('./pill')

const receptModel = sequelize.define('Recept', {
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
      // ссылка на другую модель
      model: Pills,
      // название колонки модели-ссылки с первичным ключом
      key: 'id',
    }
  },
  patient_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Patient,
      key: 'id',
    } 
  }, 
  doctor_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Doctor,
      key: 'id',
    }
  },
  how_many_days: {
    type:  DataTypes.INTEGER
  },
  time: {
    type: DataTypes.STRING(255)
  },
  quantity: {
    type: DataTypes.STRING(255)
  },
  description: {
    type: DataTypes.STRING(255)
  },
});


module.exports = sequelize.model('Recept', receptModel) 
