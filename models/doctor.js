const sequelize = require('../db/connection');
const { DataTypes } = require('sequelize');
const doctorType = require('../models/doctorType')

const doctorModel = sequelize.define('Doctor', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
    unique: true
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  surname:{
    type: DataTypes.STRING(50),
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  hospital: {
    type: DataTypes.STRING(50),
  },
  password: {
    type: DataTypes.STRING
  },
  doctor_type: {
    type: DataTypes.INTEGER,
    references: {
      model: doctorType,
      key: 'id',
      allowNull: false
    },
  },
},
{
  getterMethods: {
    deletePassword() {
      const values = Object.assign({}, this.get())
      delete values.password
      return values
    }
  }
}
);

module.exports = sequelize.model('Doctor', doctorModel) 


