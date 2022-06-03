const sequelize = require('../db/connection');
const { DataTypes } = require('sequelize');

const patientModel = sequelize.define('patient', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
    unique: true
  },
  subscription_id: {
    type: DataTypes.STRING(9),
    allowNull: false
  },
  address: {
    type: DataTypes.STRING(255),
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  surname: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  birth_date: {
    type: DataTypes.STRING(25),
  },
  gender: {
    type: DataTypes.STRING(10)
  },
  phone: {
    type: DataTypes.STRING(13),
    allowNull: false
  }
  
});

module.exports = sequelize.model('patient', patientModel) 

