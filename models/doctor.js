const sequelize = require('../db/connection');
const { DataTypes } = require('sequelize');
const doctor_type = require('../models/doctorType')

const doctorModel = sequelize.define('doctor', {
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
    type: DataTypes.STRING(64)
  },
  doctor_type: {
    type: DataTypes.INTEGER,
    references: {
      model: doctor_type,
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

module.exports = sequelize.model('doctor', doctorModel) 


